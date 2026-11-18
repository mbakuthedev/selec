import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { ProductCard } from '../components/ProductCard'
import { getSeries, productsInSeries } from '../lib/catalog'
import type { Product } from '../data/types'

export function SeriesPage() {
  const { slug } = useParams()
  const found = getSeries(slug)
  const [sort, setSort] = useState('title_asc')
  const [query, setQuery] = useState('')
  usePageTitle(found ? `${found.series.name}: Selec` : 'Products: Selec')

  const products = useMemo(() => {
    const list = productsInSeries(slug || '')
    const filtered = list.filter((product) => {
      const needle = query.trim().toLowerCase()
      if (!needle) return true
      return `${product.name} ${product.model} ${product.blurb || ''}`.toLowerCase().includes(needle)
    })
    const sorted = [...filtered]
    sorted.sort((a, b) => compare(a, b, sort))
    return sorted
  }, [slug, sort, query])

  if (!found) {
    return (
      <div>
        <PageBanner title="Products" crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
        <div className="container-site py-16">
          <p>This product series was not found.</p>
          <Link to="/" className="mt-3 inline-block text-brand">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const { series, category } = found

  return (
    <div>
      <PageBanner
        title={series.name}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: category.group },
          { label: category.name, to: `/pro-series/${category.slug}` },
          { label: series.name },
        ]}
      />
      <div className="container-site py-8">
        <div className="mb-6 flex flex-col gap-3 border border-[#eee] bg-[#fafafa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-[13px]">
            <span className="hidden text-[#666] lg:inline">Sort by:</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-9 border border-[#ddd] bg-white px-2">
              <option value="title_asc">Title Name A-Z</option>
              <option value="title_desc">Title Name Z-A</option>
              <option value="model_asc">Model A-Z</option>
              <option value="model_desc">Model Z-A</option>
            </select>
          </label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by name or model"
            aria-label="Filter products"
            className="h-9 w-full border border-[#ddd] bg-white px-3 sm:w-64"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <h2 className="mb-3 text-[13px] font-bold tracking-wide text-ink uppercase">{category.name}</h2>
            <ul className="space-y-1 text-[13px]">
              {category.series.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/products/${item.slug}`}
                    className={item.slug === series.slug ? 'font-semibold text-brand' : 'text-[#333] hover:text-brand'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div>
            {series.description && <p className="mb-5 text-[14px] leading-6 text-[#444]">{series.description}</p>}
            <p className="mb-4 text-[12.5px] text-[#777]">{products.length} products</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            {products.length === 0 && <p className="py-10 text-[14px]">No products match this filter.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function compare(a: Product, b: Product, sort: string) {
  const left = (sort.startsWith('model') ? a.model : a.name).toLowerCase()
  const right = (sort.startsWith('model') ? b.model : b.name).toLowerCase()
  const order = left.localeCompare(right)
  return sort.endsWith('desc') ? -order : order
}
