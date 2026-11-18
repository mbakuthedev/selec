import raw from '../data/catalog.json' with { type: 'json' }
import { highlights } from '../data/highlights'
import type { Catalog, Category, Product, Series } from '../data/types'

function asCatalog(value: unknown): Catalog {
  const data = value as Partial<Catalog>
  return {
    scrapedAt: data.scrapedAt || '',
    source: data.source || 'https://www.selec.com',
    categories: data.categories || [],
    products: data.products || [],
    brochures: data.brochures || [],
    software: data.software || [],
  }
}

const scraped = asCatalog(raw)

const products: Product[] = [...scraped.products]
for (const item of highlights) {
  const index = products.findIndex((product) => product.slug === item.slug)
  if (index === -1) {
    products.push(item)
    continue
  }
  const current = products[index]
  products[index] = {
    ...item,
    ...current,
    image: current.image || item.image,
    model: current.model || item.model,
    blurb: current.blurb || item.blurb,
    name: current.name || item.name,
    tag: current.tag || item.tag,
    featured: item.featured || current.featured,
    isNew: item.isNew || current.isNew,
    summary: current.summary.length ? current.summary : item.summary,
  }
}

export const catalog: Catalog = { ...scraped, products }

export function getCategory(slug: string | undefined): Category | undefined {
  if (!slug) return undefined
  return catalog.categories.find((category) => category.slug.toLowerCase() === slug.toLowerCase())
}

export function getSeries(slug: string | undefined): { series: Series; category: Category } | undefined {
  if (!slug) return undefined
  for (const category of catalog.categories) {
    const series = category.series.find((item) => item.slug.toLowerCase() === slug.toLowerCase())
    if (series) return { series, category }
  }
  return undefined
}

export function getProduct(slug: string | undefined): Product | undefined {
  if (!slug) return undefined
  return catalog.products.find((product) => product.slug.toLowerCase() === slug.toLowerCase())
}

export function productsInSeries(seriesSlug: string): Product[] {
  return catalog.products.filter((product) => product.seriesSlug === seriesSlug)
}

export function productsInCategory(categorySlug: string): Product[] {
  return catalog.products.filter((product) => product.categorySlug === categorySlug)
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name || slug.replace(/[-_]/g, ' ')
}

export function seriesName(slug: string): string {
  return getSeries(slug)?.series.name || slug.replace(/[-_]/g, ' ')
}

export function searchProducts(query: string): Product[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  return catalog.products.filter((product) => {
    const haystack = [
      product.name,
      product.model,
      product.tag,
      product.blurb,
      product.seriesSlug,
      product.categorySlug,
      categoryName(product.categorySlug),
      ...product.summary,
      ...product.specs.map((spec) => `${spec.label} ${spec.value}`),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
}

export function documentsFor(group: string) {
  return catalog.products.filter(
    (product) =>
      product.downloads.some((doc) => doc.group.toLowerCase().includes(group.toLowerCase())) ||
      (group === 'all' && product.downloads.length > 0),
  )
}
