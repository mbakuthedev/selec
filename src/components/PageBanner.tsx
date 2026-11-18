import { Link } from 'react-router-dom'

export type Crumb = { label: string; to?: string }

export function PageBanner({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <section className="relative bg-footer py-5">
      <div className="container-site">
        <nav className="mb-1 text-[12.5px] text-brand">
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`}>
              {index > 0 && <span className="mx-1.5 text-brand">/</span>}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-[25px] leading-tight font-extralight text-white">{title}</h1>
      </div>
      <span className="absolute bottom-0 left-[max(15px,calc((100%-1170px)/2+15px))] h-[4px] w-[180px] bg-brand" />
    </section>
  )
}

export function SectionHeading({ lead, emphasis }: { lead: string; emphasis: string }) {
  return (
    <h2 className="mb-8 text-center text-[26px] font-normal tracking-normal text-ink uppercase sm:text-[30px]">
      {lead} <strong className="font-bold">{emphasis}</strong>
    </h2>
  )
}
