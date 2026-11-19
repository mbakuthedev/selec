import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { footerPhones } from '../data/content'
import { LOGO, MENU_IMAGE, aboutLinks, downloadLinks, productGroups, topCategories } from '../data/navigation'
import { SearchModal } from './SearchModal'

function itemClass(active: boolean) {
  return `nav-pill ${active ? 'active' : 'hover:text-brand'}`
}

export function Header() {
  const location = useLocation()
  const [productsOpen, setProductsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [groupIndex, setGroupIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const closeTimer = useRef<number | null>(null)

  function openMenu(menu: 'products' | 'about' | 'download') {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setProductsOpen(menu === 'products')
    setAboutOpen(menu === 'about')
    setDownloadOpen(menu === 'download')
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setProductsOpen(false)
      setAboutOpen(false)
      setDownloadOpen(false)
    }, 220)
  }

  useEffect(() => {
    setProductsOpen(false)
    setAboutOpen(false)
    setDownloadOpen(false)
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const path = location.pathname
  const productsActive = path.startsWith('/pro-series') || path.startsWith('/products') || path.startsWith('/product-details')
  const aboutActive = path.startsWith('/about')
  const downloadActive = ['/datasheet', '/catalog'].some((item) => path.startsWith(item))
  const contactActive = path.startsWith('/contact')
  const homeActive = path === '/'

  const closeDesktop = () => {
    setProductsOpen(false)
    setAboutOpen(false)
    setDownloadOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white ${compact ? 'shadow-[0_1px_0_#eee]' : ''}`}>
      <div className="container-site">
        <div className={`flex items-center justify-between gap-4 ${compact ? 'h-[72px]' : 'h-[96px]'}`}>
          <Link to="/" className="shrink-0" onClick={closeDesktop}>
            <img src={LOGO} alt="selec" className={compact ? 'h-10 w-auto' : 'h-[54px] w-auto'} />
          </Link>

          <div className="hidden min-w-0 flex-1 flex-col items-end lg:flex">
            {!compact && (
              <div className="mb-1 flex items-center gap-4 text-[13px] text-black">
                <button type="button" className="inline-flex items-center" aria-label="Search" onClick={() => setSearchOpen(true)}>
                  <Search size={15} />
                </button>
              </div>
            )}

            <nav className="flex items-center" aria-label="Primary">
              <NavLink to="/" className={itemClass(homeActive)} end>
                Home
              </NavLink>
              <div className="relative" onMouseEnter={() => openMenu('products')} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  className={itemClass(productsActive || productsOpen)}
                  aria-expanded={productsOpen}
                  onClick={() => (productsOpen ? scheduleClose() : openMenu('products'))}
                >
                  Products <ChevronDown size={12} />
                </button>
              </div>
              <div className="relative" onMouseEnter={() => openMenu('about')} onMouseLeave={scheduleClose}>
                <button type="button" className={itemClass(aboutActive || aboutOpen)} aria-expanded={aboutOpen}>
                  About <ChevronDown size={12} />
                </button>
                {aboutOpen && (
                  <ul className="absolute top-full left-0 z-50 min-w-[190px] border border-[#eee] bg-white py-1 shadow-md">
                    {aboutLinks.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="block px-4 py-2 text-[13px] hover:bg-[#fafafa] hover:text-brand">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative" onMouseEnter={() => openMenu('download')} onMouseLeave={scheduleClose}>
                <button type="button" className={itemClass(downloadActive || downloadOpen)} aria-expanded={downloadOpen}>
                  Download <ChevronDown size={12} />
                </button>
                {downloadOpen && (
                  <ul className="absolute top-full left-0 z-50 min-w-[210px] border border-[#eee] bg-white py-1 shadow-md">
                    {downloadLinks.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="block px-4 py-2 text-[13px] hover:bg-[#fafafa] hover:text-brand">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <NavLink to="/contact" className={itemClass(contactActive)}>
                Contact Us
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center bg-brand text-white"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center bg-brand text-white"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {productsOpen && (
        <div
          className="absolute right-0 left-0 hidden border-t border-[#eee] bg-white shadow-lg lg:block"
          onMouseEnter={() => openMenu('products')}
          onMouseLeave={scheduleClose}
        >
          <div className="container-site grid grid-cols-[230px_280px_1fr] gap-6 py-6">
            <div>
              <h2 className="text-[25px] font-semibold text-ink uppercase">Products</h2>
              <p className="mt-2 text-[13px] text-[#666]">Explore our wide range of products</p>
              <img src={MENU_IMAGE} alt="" className="mt-4 w-full object-cover" />
              <Link to="/contact" className="mt-4 inline-block bg-brand px-4 py-2 text-[13px] font-bold text-white">
                Enquire Now
              </Link>
            </div>
            <ul className="border-r border-[#eee] pr-4">
              {productGroups.map((group, index) => (
                <li key={group.label}>
                  <button
                    type="button"
                    className={`w-full px-2 py-2 text-left text-[13.5px] ${index === groupIndex ? 'font-semibold text-brand' : 'text-[#222] hover:text-brand'}`}
                    onMouseEnter={() => setGroupIndex(index)}
                    onFocus={() => setGroupIndex(index)}
                  >
                    {group.label}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <p className="mb-2 text-[12px] font-bold tracking-wide text-[#888] uppercase">{productGroups[groupIndex].label}</p>
              <ul className="grid grid-cols-1 gap-1">
                {productGroups[groupIndex].items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="block py-1.5 text-[13.5px] text-[#222] hover:text-brand" onClick={() => setProductsOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12.5px] text-[#666]">
                Customer service {footerPhones.join(' / ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white lg:hidden ${compact ? 'top-[72px]' : 'top-[96px]'}`}>
          <nav className="px-2 py-2">
            <Link to="/" className="block border-b border-[#f2f2f2] px-3 py-3 text-[14px] font-bold uppercase" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <p className="px-3 pt-4 pb-1 text-[12px] font-bold tracking-wide text-[#888] uppercase">Top Categories</p>
            {topCategories.map((item) => (
              <Link key={item.to} to={item.to} className="block px-3 py-2 text-[14px]" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <p className="px-3 pt-4 pb-1 text-[12px] font-bold tracking-wide text-[#888] uppercase">Products</p>
            {productGroups.map((group) => (
              <div key={group.label} className="border-b border-[#f4f4f4]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-[14px] font-semibold"
                  onClick={() => setMobileGroup((current) => (current === group.label ? null : group.label))}
                >
                  {group.label}
                  <ChevronDown size={16} className={mobileGroup === group.label ? 'rotate-180' : ''} />
                </button>
                {mobileGroup === group.label && (
                  <div className="pb-2">
                    {group.items.map((item) => (
                      <Link key={item.to} to={item.to} className="block px-6 py-2 text-[13.5px] text-[#333]" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <p className="px-3 pt-4 pb-1 text-[12px] font-bold tracking-wide text-[#888] uppercase">About</p>
            {aboutLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-3 py-2 text-[14px]" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-4 pb-1 text-[12px] font-bold tracking-wide text-[#888] uppercase">Download</p>
            {downloadLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-3 py-2 text-[14px]" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="block px-3 py-3 text-[14px] font-bold uppercase" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  )
}
