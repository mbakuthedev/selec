import { Link } from 'react-router-dom'
import type { Product } from '../data/types'

export function ProductCard({ product }: { product: Product }) {
  const label = product.tag || product.name
  return (
    <article className="flex h-full flex-col border border-[#ececec] bg-white">
      <Link
        to={`/product-details/${product.slug}`}
        className="block px-2.5 pt-2.5 text-center text-[12px] font-normal tracking-wide text-brand uppercase"
      >
        {label}
      </Link>
      <Link to={`/product-details/${product.slug}`} className="block bg-[#fafafa] px-3 py-2">
        <img
          src={product.image}
          alt={label}
          className="mx-auto aspect-[4/3] w-full object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-2 pb-4">
        {product.blurb && (
          <p className="mb-2.5 text-[13px] leading-snug font-semibold text-black">{product.blurb}</p>
        )}
        {product.isNew && (
          <span className="mb-2 inline-block w-fit bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
        )}
        {product.model && (
          <Link
            to={`/product-details/${product.slug}`}
            className="mt-auto inline-block w-fit bg-brand px-2.5 py-1 text-[12px] font-bold tracking-[0.5px] text-white"
          >
            {product.model}
          </Link>
        )}
      </div>
    </article>
  )
}

export function SeriesCard({
  name,
  image,
  description,
  to,
}: {
  name: string
  image: string
  description?: string
  to: string
}) {
  return (
    <article className="flex h-full flex-col border border-[#ececec] bg-white">
      <Link to={to} className="block px-3 pt-4 text-center text-[15px] text-brand">
        {name}
      </Link>
      <Link to={to} className="block px-4 py-3">
        <img src={image} alt={name} className="mx-auto aspect-[4/3] w-full object-contain" />
      </Link>
      {description && <p className="px-4 pb-5 text-center text-[13px] leading-5 text-[#444]">{description}</p>}
    </article>
  )
}
