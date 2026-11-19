import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contactEmail, footerAddress, footerPhones } from '../data/content'
import { socialLinks } from '../data/navigation'

const about = [
  { label: 'About Us', to: '/about' },
  { label: 'Global Network', to: '/about/global-network' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Cookies Policy', to: '/cookies-policy' },
  { label: 'Terms and Conditions', to: '/terms' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Warranty Terms', to: '/warranty' },
]

const quick = [
  { label: 'Contact Us', to: '/contact' },
  { label: 'Download Center', to: '/datasheet' },
  { label: 'Catalog & Brochures', to: '/catalog' },
  { label: 'Site Map', to: '/sitemap' },
  { label: 'CSR', to: '/csr' },
  { label: 'E-Waste Management', to: '/e-waste' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  return (
    <footer className="mt-auto bg-footer text-faint">
      <div className="container-site grid gap-8 py-9 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="mb-3 text-[15px] font-semibold text-white">
            <Link to="/contact">Get in Touch</Link>
          </h2>
          <p className="mb-2 flex items-start gap-2 text-[12.5px]">
            <Phone size={14} className="mt-0.5 shrink-0 text-brand" />
            <span>
              Customer service center
              <br />
              {footerPhones.map((phone) => (
                <span key={phone} className="block">
                  {phone}
                </span>
              ))}
            </span>
          </p>
          <p className="mb-2 flex items-start gap-2 text-[12.5px]">
            <MapPin size={14} className="mt-0.5 shrink-0 text-brand" />
            <span>{footerAddress}</span>
          </p>
          <p className="flex items-start gap-2 text-[12.5px]">
            <Mail size={14} className="mt-0.5 shrink-0 text-brand" />
            <a className="hover:text-white" href={`mailto:${contactEmail}`}>
              Email: {contactEmail}
            </a>
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-[15px] font-semibold text-white">About Selec</h2>
          <ul className="space-y-1.5 text-[12.5px]">
            {about.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-[15px] font-semibold text-white">Quick Links</h2>
          <ul className="space-y-1.5 text-[12.5px]">
            {quick.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-[15px] font-semibold text-white">Newsletter</h2>
          <p className="mb-3 text-[12.5px] leading-5">
            Keep up on our always evolving product features and technology. Enter your e-mail and subscribe to our newsletter.
          </p>
          <form
            className="flex"
            onSubmit={(event) => {
              event.preventDefault()
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError('Enter a valid email address.')
                setMessage('')
                return
              }
              setError('')
              setMessage('You are subscribed. This preview stores the request only in your browser.')
              const existing = JSON.parse(localStorage.getItem('selec-newsletter') || '[]') as string[]
              localStorage.setItem('selec-newsletter', JSON.stringify([...existing, email]))
              setEmail('')
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address*"
              aria-label="Email Address"
              className="h-9 flex-1 border border-[#5a5a5a] bg-white px-2 text-[13px] text-black outline-none"
            />
            <button type="submit" className="h-9 bg-brand px-3 text-[13px] font-bold text-white">
              Go!
            </button>
          </form>
          {error && <p className="mt-2 text-[12px] text-[#ffb4b4]">{error}</p>}
          {message && <p className="mt-2 text-[12px] text-white">{message}</p>}
        </div>
      </div>
      <div className="bg-copy">
        <div className="container-site flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px]">© Copyright 2026. All Rights Reserved</p>
          <ul className="flex flex-wrap gap-4 text-[12px]">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
