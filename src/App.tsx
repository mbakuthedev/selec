import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CategoryPage } from './pages/CategoryPage'
import { ContactPage } from './pages/ContactPage'
import { CatalogPage, DownloadsPage } from './pages/DownloadsPage'
import { HomePage } from './pages/HomePage'
import { AboutPage, MilestonesPage, SearchPage } from './pages/InfoPages'
import { ProductPage } from './pages/ProductPage'
import { SeriesPage } from './pages/SeriesPage'
import { CookiesPage, CsrPage, EwastePage, FaqPage, NotFoundPage, PrivacyPage, SitemapPage, TermsPage, WarrantyPage } from './pages/StaticPages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="pro-series/:slug" element={<CategoryPage />} />
        <Route path="products/:slug" element={<SeriesPage />} />
        <Route path="product-details/:slug" element={<ProductPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="about/milestones" element={<MilestonesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="datasheet" element={<DownloadsPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="brochure" element={<Navigate to="/catalog" replace />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="cookies-policy" element={<CookiesPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="warranty" element={<WarrantyPage />} />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="csr" element={<CsrPage />} />
        <Route path="e-waste" element={<EwastePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
