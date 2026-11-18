import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/PageBanner'
import { ProductCard } from '../components/ProductCard'
import { expertise, newsArticles, slides } from '../data/content'
import { featuredSlugs, newSlugs } from '../data/highlights'
import { usePageTitle } from '../components/Layout'
import { catalog, getProduct } from '../lib/catalog'

const jumps = [
  { label: 'Our Solution Expertise', href: '#ourExpertise' },
  { label: 'Featured Products', href: '#featuredProducts' },
  { label: 'New Products', href: '#newProducts' },
  { label: 'News', href: '#news' },
]

function pick(slugs: string[]) {
  return slugs.map((slug) => getProduct(slug)).filter((item) => item != null)
}

export function HomePage() {
  usePageTitle('Selec Controls | World Class Industrial Products | Leading Indian Manufacturer')
  const [slide, setSlide] = useState(0)
  const featured = pick(featuredSlugs)
  const newest = pick(newSlugs)
  const [featureIndex, setFeatureIndex] = useState(0)
  const [newIndex, setNewIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div>
      <section className="relative border-t-4 border-brand bg-[#123] text-white">
        <div className="relative h-[240px] overflow-hidden sm:h-[360px] lg:h-[500px]">
          {slides.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute right-4 bottom-20 hidden gap-2 sm:flex">
            <button type="button" aria-label="Previous slide" className="bg-black/40 p-2" onClick={() => setSlide((current) => (current - 1 + slides.length) % slides.length)}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Next slide" className="bg-black/40 p-2" onClick={() => setSlide((current) => (current + 1) % slides.length)}>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="absolute right-0 bottom-[54px] left-0 h-[5px] bg-white/20">
            <div className="h-full bg-brand transition-all" style={{ width: `${((slide + 1) / slides.length) * 100}%` }} />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-[54px] bg-black/67">
            {jumps.map((jump) => (
              <a
                key={jump.href}
                href={jump.href}
                className="flex flex-1 items-center justify-center border-r border-white/25 px-2 text-center text-[11px] font-semibold tracking-wide text-white uppercase last:border-r-0 sm:text-[15px]"
              >
                {jump.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="ourExpertise" className="scroll-mt-24 py-12">
        <div className="container-site">
          <SectionHeading lead="Our" emphasis="Solution Expertise" />
          <div className="grid gap-6 md:grid-cols-3">
            {expertise.map((item) => (
              <Link key={item.title} to={item.to} className="group text-center">
                <h3 className="mb-2 text-[12px] font-bold text-ink uppercase">{item.title}</h3>
                <img src={item.image} alt={item.alt} className="w-full object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductStrip
        id="featuredProducts"
        lead="Featured"
        emphasis="Products"
        products={featured}
        index={featureIndex}
        onIndex={setFeatureIndex}
      />
      <ProductStrip id="newProducts" lead="New" emphasis="Products" products={newest} index={newIndex} onIndex={setNewIndex} showNew />

      <section id="news" className="scroll-mt-24 py-12">
        <div className="container-site">
          <SectionHeading lead="" emphasis="News" />
          <div className="grid gap-6 md:grid-cols-3">
            {newsArticles.map((article) => (
              <Link key={article.slug} to={`/news/${article.slug}`} className="border border-[#eee] bg-white">
                <img src={article.image} alt="" className="aspect-[1050/750] w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-[15px] leading-snug font-semibold text-ink">{article.title}</h3>
                  <p className="mt-2 text-[12.5px] text-[#777]">{article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {catalog.products.length < 20 && (
        <p className="container-site pb-8 text-center text-[12px] text-[#888]">Product index is refreshing from the public catalog.</p>
      )}
    </div>
  )
}

function ProductStrip({
  id,
  lead,
  emphasis,
  products,
  index,
  onIndex,
  showNew,
}: {
  id: string
  lead: string
  emphasis: string
  products: ReturnType<typeof pick>
  index: number
  onIndex: (value: number) => void
  showNew?: boolean
}) {
  const visible = 4
  const max = Math.max(0, products.length - visible)
  const start = Math.min(index, max)
  const windowed = products.slice(start, start + visible)
  return (
    <section id={id} className="scroll-mt-24 py-6">
      <div className="container-site">
        <div className="mb-2 flex items-end justify-between">
          <div className="flex-1">
            <SectionHeading lead={lead} emphasis={emphasis} />
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {(windowed.length ? windowed : products).map((product) => (
              <ProductCard key={product.slug} product={{ ...product, isNew: showNew || product.isNew }} />
            ))}
          </div>
          {products.length > visible && (
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" aria-label="Previous products" className="border border-[#ddd] px-3 py-2" onClick={() => onIndex(Math.max(0, start - 1))}>
                <ChevronLeft size={16} />
              </button>
              <button type="button" aria-label="Next products" className="border border-[#ddd] px-3 py-2" onClick={() => onIndex(Math.min(max, start + 1))}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
