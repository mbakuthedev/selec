import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { aboutFacilities, certifications, corporateMilestones, newsArticles, productMilestones, regionsNetwork } from '../data/content'
import { catalog } from '../lib/catalog'

export function AboutPage() {
  usePageTitle('Selec Controls - Overview')
  return (
    <div>
      <PageBanner title="Overview" crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }, { label: 'Overview' }]} />
      <div className="container-site py-10">
        <p className="max-w-4xl text-[15px] leading-7 text-[#333]">
          Selec Controls designs and manufactures industrial electronics in India, with in-house work across manufacturing, design, tooling, and plastics. The public range covers energy management, power quality, industrial automation, process control, solar, and electrical protection and control, supported by a sales network in more than 75 countries and subsidiaries in the USA, Germany, and Australia.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-7 text-[#333]">We listen; We understand & Go beyond boundaries to meet the specific needs!</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {aboutFacilities.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} className="mb-3 aspect-[16/9] w-full object-cover" />
              <h2 className="text-[18px] font-bold text-ink">{item.title}</h2>
              <p className="mt-1 text-[14px] leading-6 text-[#444]">{item.text}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-12 mb-4 text-[20px] font-bold text-ink uppercase">Sales Network</h2>
        <p className="max-w-4xl text-[15px] leading-7 text-[#333]">
          Selec states a market reach in over 75 countries, with distributor coverage and sales offices in India plus Selec Controls USA Inc., Selec GmbH in Berlin, and Selec Controls Australia Pty Ltd.
        </p>
        <h2 className="mt-12 mb-4 text-[20px] font-bold text-ink uppercase">Certifications</h2>
        <div className="flex flex-wrap items-center gap-6">
          {certifications.map((item) => (
            <img key={item.name} src={item.image} alt={item.name} className="h-16 w-auto object-contain" />
          ))}
        </div>
        <h2 className="mt-12 mb-3 text-[20px] font-bold text-ink uppercase">Make in India</h2>
        <p className="max-w-4xl text-[15px] leading-7 text-[#333]">
          Selec describes its portfolios as made in India and states that it qualifies as a Class-1 local supplier under the Public Procurement (Preference to Make in India) Order, 2017, with local content stated to be above the 50% threshold.
        </p>
        <h2 className="mt-12 mb-3 text-[20px] font-bold text-ink uppercase">Subsidiaries</h2>
        <ul className="space-y-2 text-[14px] leading-6">
          <li>Selec Controls USA Inc., 2475 Chandler Ave., Suite 17, Las Vegas NV 89120</li>
          <li>Selec GmbH: Mollwitzstrasse 2, D-14059, Berlin, Germany</li>
          <li>Selec Controls Australia Pty Ltd., SE 2 L3 261 George St, Sydney NSW 2000, Australia</li>
          <li>Orta Mahalle Zübeyde Hanım Sokak No: 13/A Kartal / İstanbul / Türkiye</li>
        </ul>
      </div>
    </div>
  )
}

export function MilestonesPage() {
  usePageTitle('Selec Controls - Milestones')
  return (
    <div>
      <PageBanner title="Milestones" crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Milestones' }]} />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-2">
        <Timeline title="Corporate" items={corporateMilestones} />
        <Timeline title="Product Launch" items={productMilestones} />
      </div>
    </div>
  )
}

function Timeline({ title, items }: { title: string; items: readonly (readonly [string, string])[] }) {
  return (
    <section>
      <h2 className="mb-4 text-[20px] font-bold text-ink uppercase">{title}</h2>
      <ol className="border-l-2 border-brand">
        {items.map(([year, text]) => (
          <li key={year + text} className="relative mb-4 pl-5">
            <span className="absolute top-1.5 -left-[5px] h-2 w-2 rounded-full bg-brand" />
            <p className="text-[13px] font-bold text-brand">{year}</p>
            <p className="text-[14px] leading-6 text-[#333]">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function GlobalNetworkPage() {
  usePageTitle('Selec Controls - Global Network')
  return (
    <div>
      <PageBanner
        title="Global Network"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Global Network' }]}
      />
      <div className="container-site py-10">
        <p className="mb-8 text-[16px] text-ink">
          In over 75 countries and growing. Our Offices — Selec India | Selec USA | Selec GmbH | Selec Australia
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {regionsNetwork.map((region) => (
            <article key={region.name} className="border border-[#eee] p-4">
              <img src={region.image} alt="" className="mb-3 h-16 w-auto object-contain" />
              <h2 className="text-[18px] font-bold text-ink uppercase">{region.name}</h2>
              <p className="mt-2 text-[14px] leading-6 text-[#444]">{region.places}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NewsPage() {
  usePageTitle('News | Selec')
  return (
    <div>
      <PageBanner title="News" crumbs={[{ label: 'Home', to: '/' }, { label: 'News' }]} />
      <div className="container-site grid gap-6 py-10 md:grid-cols-3">
        {newsArticles.map((article) => (
          <Link key={article.slug} to={`/news/${article.slug}`} className="border border-[#eee]">
            <img src={article.image} alt="" className="aspect-[7/5] w-full object-cover" />
            <div className="p-4">
              <h2 className="text-[16px] font-semibold">{article.title}</h2>
              <p className="mt-2 text-[12.5px] text-[#777]">{article.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function NewsArticlePage() {
  const { slug } = useParams()
  const article = newsArticles.find((item) => item.slug === slug)
  usePageTitle(article ? `${article.title} | Selec` : 'News | Selec')
  if (!article) {
    return (
      <div>
        <PageBanner title="News" crumbs={[{ label: 'Home', to: '/' }, { label: 'News', to: '/news' }]} />
        <p className="container-site py-12">Article not found.</p>
      </div>
    )
  }
  return (
    <div>
      <PageBanner title="News" crumbs={[{ label: 'Home', to: '/' }, { label: 'News', to: '/news' }, { label: article.title }]} />
      <article className="container-site max-w-3xl py-10">
        <p className="text-[13px] text-[#777]">{article.date}</p>
        <h2 className="mt-2 text-[28px] leading-snug font-semibold text-ink">{article.title}</h2>
        <img src={article.image} alt="" className="my-6 w-full object-cover" />
        <p className="text-[15px] leading-7 text-[#333]">{article.summary}</p>
        {article.source && (
          <p className="mt-6 text-[14px]">
            Source article:{' '}
            <a className="text-brand hover:underline" href={article.source} target="_blank" rel="noreferrer">
              {article.source}
            </a>
          </p>
        )}
      </article>
    </div>
  )
}

export function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  usePageTitle(`Search: ${query || 'Products'} | Selec`)
  const needle = query.trim().toLowerCase()
  const results = !needle
    ? []
    : catalog.products.filter((product) =>
        `${product.name} ${product.model} ${product.blurb || ''} ${product.categorySlug}`.toLowerCase().includes(needle),
      )
  return (
    <div>
      <PageBanner title="Search" crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <div className="container-site py-8">
        <SearchBox initial={query} />
        <p className="mt-4 mb-6 text-[13px] text-[#666]">{needle ? `${results.length} results for “${query}”` : 'Enter a product name or model.'}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <Link key={product.slug} to={`/product-details/${product.slug}`} className="flex gap-3 border border-[#eee] p-3 hover:border-brand">
              <img src={product.image} alt="" className="h-20 w-20 object-contain" />
              <span>
                <span className="block text-[14px] font-semibold">{product.name}</span>
                <span className="text-[12px] text-brand">{product.model}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchBox({ initial }: { initial: string }) {
  return (
    <form action="/search" className="flex max-w-xl">
      <input name="q" defaultValue={initial} aria-label="Search" className="h-10 flex-1 border border-[#ddd] px-3" placeholder="Search Our Products..." />
      <button className="bg-brand px-4 text-[13px] font-bold text-white">Search</button>
    </form>
  )
}

export function LoginPage({ mode }: { mode: 'login' | 'register' }) {
  usePageTitle(mode === 'login' ? 'Login | Selec' : 'Register | Selec')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  return (
    <div>
      <PageBanner title={mode === 'login' ? 'Login' : 'Register'} crumbs={[{ label: 'Home', to: '/' }, { label: mode === 'login' ? 'Login' : 'Register' }]} />
      <form
        className="container-site max-w-lg py-10"
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const email = String(data.get('email') || '')
          const password = String(data.get('password') || '')
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email address.')
            return
          }
          if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
          }
          if (mode === 'register' && !String(data.get('name') || '').trim()) {
            setError('Name is required.')
            return
          }
          sessionStorage.setItem('selec-session', JSON.stringify({ email, mode }))
          setError('')
          setDone(true)
        }}
      >
        <p className="mb-4 text-[13px] leading-6 text-[#555]">
          This recreation keeps the account form on your device. It does not sign in to Selec.
        </p>
        {mode === 'register' && <input name="name" placeholder="Name *" aria-label="Name" className="mb-3 h-10 w-full border border-[#ddd] px-3" />}
        <input name="email" type="email" placeholder="Email *" aria-label="Email" className="mb-3 h-10 w-full border border-[#ddd] px-3" />
        <input name="password" type="password" placeholder="Password *" aria-label="Password" className="mb-3 h-10 w-full border border-[#ddd] px-3" />
        {error && <p className="mb-3 text-[13px] text-[#c0392b]">{error}</p>}
        <button className="bg-brand px-5 py-2.5 text-[13px] font-bold text-white">{mode === 'login' ? 'Login' : 'Register'}</button>
        {done && <p className="mt-4 text-[13px] text-[#1b7a32]">Saved locally for this browser session.</p>}
        <p className="mt-4 text-[13px]">
          {mode === 'login' ? (
            <Link to="/register" className="text-brand">
              Create an account
            </Link>
          ) : (
            <Link to="/login" className="text-brand">
              Already registered? Login
            </Link>
          )}
        </p>
      </form>
    </div>
  )
}

