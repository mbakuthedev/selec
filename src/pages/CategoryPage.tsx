import { Link, useParams } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { SeriesCard } from '../components/ProductCard'
import { productGroups } from '../data/navigation'
import { getCategory } from '../lib/catalog'

export function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)
  usePageTitle(category ? `${category.name} : Selec` : 'Products : Selec')

  if (!category) {
    return (
      <div>
        <PageBanner title="Products" crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
        <div className="container-site py-16">
          <p className="text-[15px]">This category is not in the loaded catalog.</p>
          <Link to="/" className="mt-4 inline-block text-brand">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const group = productGroups.find((item) => item.items.some((link) => link.to.endsWith(category.slug)))

  return (
    <div>
      <PageBanner
        title={category.name}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: category.group, to: group?.items[0]?.to },
          { label: category.name },
        ]}
      />
      <div className="container-site py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.series.map((series) => (
            <SeriesCard
              key={series.slug}
              name={series.name}
              image={series.image}
              description={series.description}
              to={`/products/${series.slug}`}
            />
          ))}
        </div>
        {category.series.length === 0 && <p>No series are listed for this category.</p>}
      </div>
    </div>
  )
}
