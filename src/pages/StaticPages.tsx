import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { aboutLinks, downloadLinks, productGroups } from '../data/navigation'

function Simple({ title, children }: { title: string; children: ReactNode }) {
  usePageTitle(`${title} | Selec`)
  return (
    <div>
      <PageBanner title={title} crumbs={[{ label: 'Home', to: '/' }, { label: title }]} />
      <div className="container-site max-w-3xl py-10 text-[15px] leading-7 text-[#333]">{children}</div>
    </div>
  )
}

export function PrivacyPage() {
  return (
    <Simple title="Privacy Policy">
      <p>
        Selec publishes a privacy policy covering how enquiry, newsletter, and account details submitted on selec.com are handled. This recreation does not transmit form data to Selec. Anything you type into the contact, newsletter, or account forms stays in this browser.
      </p>
      <p className="mt-4">
        The company’s own policy is published at{' '}
        <a className="text-brand" href="https://www.selec.com/privacy-policy" target="_blank" rel="noreferrer">
          selec.com/privacy-policy
        </a>
        .
      </p>
    </Simple>
  )
}

export function CookiesPage() {
  return (
    <Simple title="Cookies Policy">
      <p>
        The public Selec site uses cookies for consent, analytics, and site preferences. This recreation does not set tracking cookies. It uses localStorage only when you subscribe, send an enquiry, or use the local login form.
      </p>
      <p className="mt-4">
        Official notice:{' '}
        <a className="text-brand" href="https://www.selec.com/cookies-policy" target="_blank" rel="noreferrer">
          selec.com/cookies-policy
        </a>
        .
      </p>
    </Simple>
  )
}

export function TermsPage() {
  return (
    <Simple title="Terms and Conditions">
      <p>
        Product information in this recreation is taken from publicly listed Selec pages so the catalog can be browsed offline from those references. Specifications, certificates, and availability should be confirmed with Selec before purchase or design-in.
      </p>
      <p className="mt-4">
        Official terms:{' '}
        <a className="text-brand" href="https://www.selec.com/terms-and-conditions" target="_blank" rel="noreferrer">
          selec.com/terms-and-conditions
        </a>
        .
      </p>
    </Simple>
  )
}

export function FaqPage() {
  const faqs = [
    ['Where are datasheets?', 'Open Download Center or a product page. Document links point at the public Selec files when a document was listed.'],
    ['How do I ask for a price or sample?', 'Use Contact Us. The form records the enquiry in this browser and does not submit it to Selec.'],
    ['How is the catalog organized?', 'Products are grouped the same way as the public menu: category, then series, then model.'],
    ['Do regional sites exist?', 'The header region menu links to the public Selec Global, USA, Germany, and Australia sites.'],
  ]
  return (
    <Simple title="FAQs">
      <dl className="space-y-5">
        {faqs.map(([question, answer]) => (
          <div key={question}>
            <dt className="font-bold text-ink">{question}</dt>
            <dd className="mt-1">{answer}</dd>
          </div>
        ))}
      </dl>
    </Simple>
  )
}

export function WarrantyPage() {
  return (
    <Simple title="Warranty Terms">
      <p>
        Warranty coverage is defined by Selec for each product family and is not restated here as a substitute for the company’s terms. For a claim or the current warranty statement, contact the sales and support numbers on the contact page or the office that supplied the product.
      </p>
      <p className="mt-4">
        <Link className="text-brand" to="/contact">
          Contact Us
        </Link>
      </p>
    </Simple>
  )
}

export function CsrPage() {
  return (
    <Simple title="CSR">
      <p>
        Selec Controls publishes a corporate social responsibility section on its public website. This page keeps that destination in the site map. Program details should be read on the company’s own CSR page rather than reconstructed here.
      </p>
      <p className="mt-4">
        <a className="text-brand" href="https://www.selec.com/csr" target="_blank" rel="noreferrer">
          selec.com/csr
        </a>
      </p>
    </Simple>
  )
}

export function EwastePage() {
  return (
    <Simple title="E-Waste Management">
      <p>
        Selec, as an electronics manufacturer, publishes e-waste guidance for customers in India. For collection or disposal questions, use the Mahape head office contact on the Contact page. Do not treat this summary as the statutory notice.
      </p>
      <p className="mt-4">
        Contact the office listed on the Contact page for collection or disposal questions.
      </p>
    </Simple>
  )
}

export function SitemapPage() {
  usePageTitle('Site Map | Selec')
  const pages = [
    { label: 'Home', to: '/' },
    ...aboutLinks,
    ...downloadLinks,
    { label: 'Contact Us', to: '/contact' },
    { label: 'News', to: '/news' },
    { label: 'Search', to: '/search' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Warranty Terms', to: '/warranty' },
    { label: 'CSR', to: '/csr' },
    { label: 'E-Waste Management', to: '/e-waste' },
  ]
  return (
    <div>
      <PageBanner title="Site Map" crumbs={[{ label: 'Home', to: '/' }, { label: 'Site Map' }]} />
      <div className="container-site grid gap-8 py-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-bold text-ink uppercase">Pages</h2>
          <ul className="space-y-1 text-[14px]">
            {pages.map((page) => (
              <li key={page.to}>
                <Link className="hover:text-brand" to={page.to}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold text-ink uppercase">Products</h2>
          {productGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="text-[13px] font-bold">{group.label}</p>
              <ul className="mt-1 space-y-1 text-[14px]">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link className="hover:text-brand" to={item.to}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NotFoundPage() {
  usePageTitle('Page not found | Selec')
  return (
    <div>
      <PageBanner title="Page not found" crumbs={[{ label: 'Home', to: '/' }, { label: '404' }]} />
      <div className="container-site py-12">
        <Link to="/" className="text-brand">
          Return home
        </Link>
      </div>
    </div>
  )
}
