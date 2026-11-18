export type Spec = { label: string; value: string }

export type DownloadDoc = { group: string; label: string; href: string }

export type Product = {
  slug: string
  name: string
  model: string
  image: string
  tag?: string
  blurb?: string
  seriesSlug: string
  categorySlug: string
  summary: string[]
  specs: Spec[]
  variantHeaders: string[]
  variants: string[][]
  downloads: DownloadDoc[]
  featured?: boolean
  isNew?: boolean
}

export type Series = {
  slug: string
  name: string
  image: string
  description: string
}

export type Category = {
  slug: string
  name: string
  group: string
  description: string
  series: Series[]
}

export type ResourceLink = { title: string; href: string }

export type Catalog = {
  scrapedAt: string
  source: string
  categories: Category[]
  products: Product[]
  brochures: ResourceLink[]
  software: ResourceLink[]
}
