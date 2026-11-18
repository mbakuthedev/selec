import { readFile, writeFile } from 'node:fs/promises'
import { load } from 'cheerio'

const file = new URL('../src/data/catalog.json', import.meta.url)
const catalog = JSON.parse(await readFile(file, 'utf8'))
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html',
}

function clean(value) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function rowsFrom(html) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) =>
    clean(match[1].replace(/<[^>]+>/g, ' | ')).split('|').map((part) => part.trim()).filter(Boolean),
  )
}

function parseDetail(html) {
  const $ = load(html)
  const name = clean($('h1').first().text())
  const skuText = clean($('.product-sku').text())
  const model = clean((skuText.match(/Product:\s*(.+)/i) || [])[1] || '')
  const summary = $('.prd-block_description li').map((_, el) => clean($(el).text())).get().filter(Boolean)
  const images = []
  $('.pro_detail img, .js-prd-gallery img').each((_, el) => {
    const src = $(el).attr('src') || ''
    if (src.startsWith('http') && !src.includes('logo') && !images.includes(src)) images.push(src)
  })
  const specBlock = (html.split('specificationMain')[1] || '').split('Product Variants')[0].split('id="datasheet"')[0]
  const specRows = rowsFrom(specBlock).filter((row) => row.length >= 1 && !/product code/i.test(row[0]))
  const specs = specRows
    .filter((row) => row.length >= 2)
    .map((row) => ({ label: row[0], value: row.slice(1).join(' ') }))
  const variantBlock = (html.split('Product Variants')[1] || html.split('product-variants')[1] || '').split('Downloads')[0]
  const variantRows = rowsFrom(variantBlock)
  let variantHeaders = []
  let variants = []
  if (variantRows.length) {
    const headerIndex = variantRows.findIndex((row) => row.join(' ').toLowerCase().includes('product code'))
    if (headerIndex >= 0) {
      variantHeaders = variantRows[headerIndex]
      variants = variantRows.slice(headerIndex + 1)
    }
  }
  const tabNames = {}
  $('.nav-tabs a').each((_, el) => {
    const href = $(el).attr('href') || ''
    if (href.startsWith('#')) tabNames[href.slice(1)] = clean($(el).text())
  })
  const downloads = []
  $('.tab-pane').each((_, pane) => {
    const id = $(pane).attr('id') || ''
    const group = tabNames[id] || id
    $(pane).find('a').each((__, link) => {
      const href = $(link).attr('href') || ''
      const label = clean($(link).text())
      if (label && href.includes('viewdocument')) downloads.push({ group, label, href })
    })
  })
  return { name, model, summary, images, specs, variantHeaders, variants, downloads }
}

async function pool(items, limit, fn) {
  let cursor = 0
  const errors = []
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      try {
        await fn(items[index], index)
      } catch (error) {
        errors.push(`${items[index].slug}: ${error.message || error}`)
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()))
  return errors
}

let updated = 0
const errors = await pool(catalog.products, 4, async (product) => {
  const res = await fetch(`https://www.selec.com/product-details/${product.slug}`, { headers })
  if (!res.ok) throw new Error(String(res.status))
  const html = await res.text()
  if (!html.includes('product-sku') && !html.includes('specificationMain')) throw new Error('unexpected page')
  const detail = parseDetail(html)
  product.name = detail.name || product.name
  product.model = detail.model || product.model
  product.image = detail.images[0] || product.image
  product.summary = detail.summary
  product.specs = detail.specs
  product.variantHeaders = detail.variantHeaders
  product.variants = detail.variants
  product.downloads = detail.downloads
  updated += 1
  if (updated % 25 === 0) console.log(`updated ${updated}`)
})

await writeFile(file, JSON.stringify(catalog))
const withSpecs = catalog.products.filter((product) => product.specs.length).length
const withDocs = catalog.products.filter((product) => product.downloads.length).length
console.log({ updated, withSpecs, withDocs, errors: errors.slice(0, 8), errorCount: errors.length })
