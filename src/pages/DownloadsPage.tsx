import { FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { productGroups } from '../data/navigation'
import { catalog } from '../lib/catalog'

const docGroups = ['Data Sheet', 'Instruction Manual', 'Certification', 'CAD file']

export function DownloadsPage() {
  usePageTitle('Download Center | Selec')
  const categories = productGroups.flatMap((group) => group.items)
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const visibleCategories = expanded ? categories : categories.slice(0, 8)

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return catalog.products.filter((product) => {
      if (product.downloads.length === 0 && !needle) return false
      const categoryOk = selected.length === 0 || selected.includes(product.categorySlug)
      const text = `${product.name} ${product.model} ${product.categorySlug}`.toLowerCase()
      return categoryOk && (!needle || text.includes(needle))
    })
  }, [query, selected])

  function toggle(slug: string) {
    const id = slug.replace('/pro-series/', '')
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <div>
      <PageBanner title="Download Center" crumbs={[{ label: 'Home', to: '/' }, { label: 'Download Center' }]} />
      <div className="container-site grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <div className="border border-[#eee] p-4">
            <ul className="space-y-2 text-[13px]">
              {visibleCategories.map((item) => {
                const id = item.to.replace('/pro-series/', '')
                return (
                  <li key={item.to}>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(item.to)} />
                      <span>{item.label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <button type="button" className="mt-3 text-[13px] font-semibold text-brand" onClick={() => setExpanded((value) => !value)}>
              {expanded ? 'Show Less' : 'Show More'}
            </button>
            <button type="button" className="mt-2 block text-[13px] text-[#666]" onClick={() => setSelected(categories.map((item) => item.to.replace('/pro-series/', '')))}>
              Select All
            </button>
          </div>
        </aside>
        <div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search product series or product code (e.g. MFM or MFM384)"
            aria-label="Search documents"
            className="mb-4 h-10 w-full border border-[#ddd] px-3 text-[13px]"
          />
          <div className="overflow-x-auto">
            <table className="spec-table min-w-[720px]">
              <thead>
                <tr>
                  <th className="bg-[#f6f6f6]">Product Name</th>
                  {docGroups.map((group) => (
                    <th key={group} className="bg-[#f6f6f6]">
                      {group}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 80).map((product) => (
                  <tr key={product.slug}>
                    <td>
                      <Link to={`/product-details/${product.slug}`} className="font-semibold hover:text-brand">
                        {product.model || product.name}
                      </Link>
                      <div className="text-[12px] text-[#777]">{product.name}</div>
                    </td>
                    {docGroups.map((group) => {
                      const docs = product.downloads.filter((doc) => doc.group.toLowerCase().includes(group.toLowerCase().split(' ')[0]))
                      return (
                        <td key={group}>
                          {docs.map((doc) => (
                            <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer" className="mb-1 flex items-center gap-1 text-brand hover:underline">
                              <FileText size={14} />
                              <span className="line-clamp-2">{doc.label}</span>
                            </a>
                          ))}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && <p className="py-8 text-[14px]">No documents match this filter.</p>}
          {rows.length > 80 && <p className="mt-3 text-[12px] text-[#777]">Showing the first 80 matches. Refine the search to narrow the list.</p>}
        </div>
      </div>
    </div>
  )
}

export function CatalogPage() {
  usePageTitle('Catalog & Brochures | Selec')
  return (
    <div>
      <PageBanner title="Catalog & Brochures" crumbs={[{ label: 'Home', to: '/' }, { label: 'Catalog & Brochures' }]} />
      <div className="container-site py-10">
        <p className="mb-6 max-w-3xl text-[14px] leading-6 text-[#444]">
          Brochures and catalog files published on the public Selec catalog page. Files open from the original document links.
        </p>
        {catalog.brochures.length === 0 ? (
          <p className="text-[14px]">
            No brochure files were returned. Use the <Link className="text-brand" to="/datasheet">Download Center</Link> for datasheets.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {catalog.brochures.map((item) => (
              <li key={item.href + item.title} className="border border-[#eee] p-4">
                <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}