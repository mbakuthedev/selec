/**
 * Pulls publicly rendered catalog pages from selec.com into src/data/catalog.json.
 * Uses normal HTTP GETs only. Failures are recorded and skipped.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { load } from 'cheerio'

const ORIGIN = 'https://www.selec.com'
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
}

const GROUPS = [
  {
    group: 'Electrical Measurements',
    items: [
      ['multifunction-meters', 'Multifunction Meters'],
      ['energy-meters', 'Energy Meters'],
      ['digital-panel-meters', 'Digital Panel Meters'],
      ['current-transformers', 'Current Transformers'],
    ],
  },
  {
    group: 'Electrical Protection and Control',
    items: [
      ['line-monitoring', 'Line Monitoring'],
      ['current-protection', 'Current Protection'],
      ['earth-leakage', 'Earth Leakage'],
      ['earth-fault', 'Earth Fault'],
      ['motor-protection', 'Motor Protection'],
      ['pump-protection', 'Pump Protection'],
      ['liquid_level_controller', 'Liquid Level Controller'],
      ['time-relays', 'Time Relays'],
      ['time-switches', 'Time Switches'],
    ],
  },
  {
    group: 'Power Quality',
    items: [
      ['advance-static-var-generator', 'Advance Static Var Generator'],
      ['automatic-power-factor-controller', 'Automatic Power Factor Controller'],
      ['active_harmonic_filter', 'Active Harmonic Filter'],
    ],
  },
  {
    group: 'Industrial Automation',
    items: [
      ['PLC-Modular-MiBRX', 'PLC-Modular MiBRX'],
      ['PLC-Modular-FLEXYS', 'PLC-Modular FLEXYS'],
      ['plc-fixed-io', 'PLC-Fixed IO'],
      ['hmi', 'HMI'],
      ['drives', 'Drives'],
      ['relay-modules', 'Relay Modules'],
      ['industrial-communication-accessories', 'Industrial Communication Accessories'],
    ],
  },
  {
    group: 'Indicators and Controllers',
    items: [
      ['digital-timers', 'Digital Timers'],
      ['counters', 'Counters'],
      ['temperature-controllers', 'Temperature Controllers'],
      ['process_pid_controller', 'Process PID Controller'],
      ['process_indicators', 'Process Indicators'],
      ['solid_state_relay', 'Solid State Relay'],
      ['humidity_and_temperature_controllers', 'Humidity and Temperature Controllers'],
    ],
  },
  {
    group: 'Power Supply and Control',
    items: [['power-supplies', 'Power Supplies']],
  },
  {
    group: 'Solar',
    items: [['on_grid_inverter', 'On Grid Inverter']],
  },
]

const PRIORITY = new Set([
  '6m-sized-modular-plc-1',
  'special-type-current-transformer',
  'selec-s-vfd-with-4-user-selectble-input',
  '30kvar-3phase-4wire-rack-or-wall-mount-with-or-without-hmi-display-43-inch-advanced-static-var-generator',
  'energy-meter-direct-operated-em2m',
  '50w-series',
  'precision-process-indicator-48-x-96-mm',
  '150kvar-3phase-4wirerack-or-wall-mount-advanced-static-var-generator',
  'smart-multifunction-meter',
])

function abs(url) {
  if (!url) return ''
  const clean = url.trim()
  if (clean.startsWith('http')) return clean
  if (clean.startsWith('//')) return `https:${clean}`
  if (clean.startsWith('/')) return ORIGIN + clean
  return `${ORIGIN}/${clean}`
}

function slugFrom(href, marker) {
  if (!href) return ''
  const i = href.indexOf(marker)
  if (i < 0) return ''
  return decodeURIComponent(href.slice(i + marker.length).split(/[?#]/)[0].replace(/\/$/, ''))
}

function clean(value) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

async function fetchHtml(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 25000)
  try {
    const res = await fetch(url, { headers: HEADERS, signal: controller.signal, redirect: 'follow' })
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      try {
        out[index] = await fn(items[index], index)
      } catch (error) {
        out[index] = { error: String(error), item: items[index] }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

function parseCategory(html, slug, fallbackName, group) {
  const $ = load(html)
  const name = clean($('h1').first().text()) || fallbackName
  const main = $('.main').length ? $('.main') : $.root()
  let description = ''
  main.find('p').each((_, el) => {
    const text = clean($(el).text())
    if (!description && text.length > 40 && !/newsletter|copyright|customer service/i.test(text)) {
      description = text
    }
  })
  const series = []
  main.find('.prd').each((_, el) => {
    const card = $(el)
    const href = card.find('a.prd-img').attr('href') || card.find('.prd-tag a').attr('href') || ''
    const seriesSlug = slugFrom(href, '/products/')
    if (!seriesSlug) return
    const info = clean(card.find('.prd-info').text())
    const tag = clean(card.find('.prd-tag').text())
    series.push({
      slug: seriesSlug,
      name: tag || seriesSlug,
      image: abs(card.find('img').attr('src') || ''),
      description: info.replace(tag, '').trim(),
    })
  })
  return { slug, name, group, description, series }
}

function parseSeriesProducts(html, seriesSlug, categorySlug) {
  const $ = load(html)
  const products = []
  $('.prd').each((_, el) => {
    const card = $(el)
    const href =
      card.find('a.modelNumber').attr('href') ||
      card.find('a.prd-img').attr('href') ||
      card.find('.prd-tag a').attr('href') ||
      ''
    const productSlug = slugFrom(href, '/product-details/')
    if (!productSlug) return
    products.push({
      slug: productSlug,
      name: clean(card.find('.prd-tag').text()) || productSlug,
      model: clean(card.find('.modelNumber').text()),
      image: abs(card.find('img').attr('src') || ''),
      blurb: clean(card.find('.prd-title').text()),
      seriesSlug,
      categorySlug,
      summary: [],
      specs: [],
      variantHeaders: [],
      variants: [],
      downloads: [],
    })
  })
  return products
}

function parseDetail(html) {
  const $ = load(html)
  const name = clean($('.pro_detail h1, .product-details h1, h1').first().text())
  const skuText = clean($('.product-sku').text())
  const modelMatch = skuText.match(/Product:\s*(.+)/i)
  const model = modelMatch ? clean(modelMatch[1]) : ''
  const summary = []
  $('.prd-block_description li').each((_, el) => {
    const text = clean($(el).text())
    if (text) summary.push(text)
  })
  const images = []
  $('.js-prd-gallery img, .productDetailedimg img, .pro_detail img').each((_, el) => {
    const src = abs($(el).attr('src') || '')
    if (src && !src.includes('logo') && !images.includes(src)) images.push(src)
  })
  const specs = []
  $('.specificationMain tr').each((_, el) => {
    const cells = $(el)
      .find('th,td')
      .map((__, cell) => clean($(cell).text()))
      .get()
    if (cells.length >= 2 && cells[0] && cells[0].toLowerCase() !== 'product code') {
      specs.push({ label: cells[0], value: cells.slice(1).join(' ').trim() })
    }
  })
  let variantHeaders = []
  const variants = []
  $('table').each((_, table) => {
    const rows = $(table)
      .find('tr')
      .map((__, tr) =>
        $(tr)
          .find('th,td')
          .map((___, cell) => clean($(cell).text()))
          .get(),
      )
      .get()
    const flatHeader = rows[0] || []
    if (flatHeader.join(' ').toLowerCase().includes('product code') && rows.length > 1) {
      variantHeaders = flatHeader.filter(Boolean)
      rows.slice(1).forEach((row) => {
        if (row.some(Boolean)) variants.push(row)
      })
    }
  })
  const tabNames = {}
  $('.nav-tabs a').each((_, el) => {
    const href = $(el).attr('href') || ''
    if (href.startsWith('#')) tabNames[href.slice(1)] = clean($(el).text())
  })
  const downloads = []
  $('.tab-pane').each((_, pane) => {
    const id = $(pane).attr('id') || ''
    const group = tabNames[id] || id.replace(/[-_]/g, ' ')
    $(pane)
      .find('a')
      .each((__, link) => {
        const href = abs($(link).attr('href') || '')
        const label = clean($(link).text())
        if (href && label && href.includes('viewdocument')) {
          downloads.push({ group, label, href })
        }
      })
  })
  return { name, model, summary, images, specs, variantHeaders, variants, downloads }
}

async function parseLinkList(url) {
  try {
    const html = await fetchHtml(url)
    const $ = load(html)
    const links = []
    $('.main a, #content a').each((_, el) => {
      const href = abs($(el).attr('href') || '')
      const title = clean($(el).text())
      if (!title || title.length < 3 || title.length > 140) return
      if (/facebook|youtube|instagram|linkedin|twitter|login|privacy|cookie/i.test(href)) return
      if (href.includes('.pdf') || href.includes('viewdocument') || href.includes('/software') || href.includes('download')) {
        if (!links.some((item) => item.href === href && item.title === title)) {
          links.push({ title, href })
        }
      }
    })
    return links.slice(0, 40)
  } catch {
    return []
  }
}

async function main() {
  const categoryJobs = GROUPS.flatMap((group) =>
    group.items.map(([slug, name]) => ({ slug, name, group: group.group })),
  )
  console.log(`Fetching ${categoryJobs.length} categories...`)
  const categories = (
    await mapPool(categoryJobs, 4, async (job) => {
      const html = await fetchHtml(`${ORIGIN}/pro-series/${job.slug}`)
      return parseCategory(html, job.slug, job.name, job.group)
    })
  ).filter((item) => item && !item.error)

  const seriesJobs = categories.flatMap((category) =>
    category.series.map((series) => ({
      seriesSlug: series.slug,
      categorySlug: category.slug,
    })),
  )
  console.log(`Fetching ${seriesJobs.length} series...`)
  const seriesResults = await mapPool(seriesJobs, 4, async (job) => {
    const html = await fetchHtml(`${ORIGIN}/products/${job.seriesSlug}`)
    return parseSeriesProducts(html, job.seriesSlug, job.categorySlug)
  })

  const bySlug = new Map()
  for (const result of seriesResults) {
    if (!Array.isArray(result)) continue
    for (const product of result) {
      if (!bySlug.has(product.slug)) bySlug.set(product.slug, product)
    }
  }

  const detailSlugs = []
  const perSeries = new Map()
  for (const product of bySlug.values()) {
    const count = perSeries.get(product.seriesSlug) || 0
    if (PRIORITY.has(product.slug) || count < 3) {
      detailSlugs.push(product.slug)
      perSeries.set(product.seriesSlug, count + 1)
    }
  }
  console.log(`Fetching details for ${detailSlugs.length} of ${bySlug.size} products...`)
  await mapPool(detailSlugs, 5, async (slug) => {
    const html = await fetchHtml(`${ORIGIN}/product-details/${slug}`)
    const detail = parseDetail(html)
    const current = bySlug.get(slug)
    if (!current) return
    bySlug.set(slug, {
      ...current,
      name: detail.name || current.name,
      model: detail.model || current.model,
      image: detail.images[0] || current.image,
      summary: detail.summary,
      specs: detail.specs,
      variantHeaders: detail.variantHeaders,
      variants: detail.variants,
      downloads: detail.downloads,
    })
  })

  console.log('Fetching catalog and software indexes...')
  const [brochures, software] = await Promise.all([
    parseLinkList(`${ORIGIN}/catalog`),
    parseLinkList(`${ORIGIN}/software`),
  ])

  const catalog = {
    scrapedAt: new Date().toISOString(),
    source: ORIGIN,
    categories,
    products: [...bySlug.values()],
    brochures,
    software,
  }

  await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
  const target = new URL('../src/data/catalog.json', import.meta.url)
  await writeFile(target, JSON.stringify(catalog))
  console.log(
    `Wrote ${categories.length} categories, ${catalog.products.length} products, ${detailSlugs.length} detailed.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
