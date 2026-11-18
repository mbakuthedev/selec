import { FileText } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { categoryName, getCategory, getProduct, getSeries, seriesName } from '../lib/catalog'

export function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const groups = product ? [...new Set(product.downloads.map((doc) => doc.group))] : []
  const [tab, setTab] = useState(groups[0] || '')
  usePageTitle(product ? `${product.model || product.name} | Selec` : 'Product | Selec')

  if (!product) {
    return (
      <div>
        <PageBanner title="Product" crumbs={[{ label: 'Home', to: '/' }, { label: 'Product' }]} />
        <div className="container-site py-16">
          <p>This product is not in the catalog.</p>
        </div>
      </div>
    )
  }

  const active = tab || groups[0] || ''
  const docs = product.downloads.filter((doc) => doc.group === active)
  const category = getCategory(product.categorySlug)
  const series = getSeries(product.seriesSlug)

  return (
    <div>
      <PageBanner
        title={product.name}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: category?.group || 'Products' },
          { label: categoryName(product.categorySlug), to: category ? `/pro-series/${category.slug}` : undefined },
          { label: seriesName(product.seriesSlug), to: series ? `/products/${series.series.slug}` : undefined },
          { label: product.name },
        ]}
      />
      <div className="container-site py-10">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="border border-[#ececec] bg-white p-6">
            <img src={product.image} alt={product.name} className="mx-auto max-h-[460px] w-full object-contain" />
          </div>
          <div>
            <h2 className="text-[22px] font-semibold text-ink">{product.name}</h2>
            {product.model && <p className="mt-2 text-[14px] font-bold text-[#333]">Product: {product.model}</p>}
            {product.blurb && <p className="mt-3 text-[14px] leading-6 text-[#444]">{product.blurb}</p>}
            {product.summary.length > 0 && (
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-[#333]">
                {product.summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
            <Link
              to={`/contact?product=${encodeURIComponent(product.model || product.name)}`}
              className="mt-6 inline-block bg-brand px-5 py-2.5 text-[13px] font-bold text-white"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {product.specs.length > 0 && (
          <section className="mt-12" id="specifications">
            <h2 className="mb-4 text-[26px] font-normal text-ink uppercase">
              Brief <strong className="font-bold">Specifications</strong>
            </h2>
            <div className="overflow-x-auto">
              <table className="spec-table">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <th className="w-[32%] font-normal">{spec.label}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {product.variants.length > 0 && (
          <section className="mt-12" id="variants">
            <h2 className="mb-4 text-[26px] font-normal text-ink uppercase">
              Product <strong className="font-bold">Variants</strong>
            </h2>
            <div className="overflow-x-auto">
              <table className="spec-table">
                {product.variantHeaders.length > 0 && (
                  <thead>
                    <tr>
                      {product.variantHeaders.map((header) => (
                        <th key={header} className="bg-[#f3f3f3] font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {product.variants.map((row, index) => (
                    <tr key={`${row[0]}-${index}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-12" id="downloads">
          <h2 className="mb-4 text-[26px] font-normal text-ink uppercase">
            <strong className="font-bold">Downloads</strong>
          </h2>
          {groups.length === 0 && <p className="text-[14px] text-[#666]">No public documents are listed for this product.</p>}
          {groups.length > 0 && (
            <>
              <div className="flex flex-wrap border-b border-[#ddd]" role="tablist">
                {groups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    role="tab"
                    aria-selected={group === active}
                    className={`px-4 py-2 text-[13px] font-semibold ${group === active ? 'border-b-2 border-brand text-brand' : 'text-[#444]'}`}
                    onClick={() => setTab(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>
              <ul className="divide-y divide-[#eee] border border-t-0 border-[#eee]">
                {docs.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 text-[14px] text-brand hover:underline">
                      <FileText size={16} />
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
