import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider }  from './context/CartContext'
import { AdminProvider } from './context/AdminContext'

import AnnouncementBanner from './components/layout/AnnouncementBanner'
import Navbar   from './components/layout/Navbar'
import Footer   from './components/layout/Footer'
import LegalBanner from './components/ui/LegalBanner'

import Home             from './pages/Home'
import Products         from './pages/Products'
import ProductDetail    from './pages/ProductDetail'
import About            from './pages/About'
import Contact          from './pages/Contact'
import FAQ              from './pages/FAQ'
import LabResults       from './pages/LabResults'
import Cart             from './pages/Cart'
import Checkout         from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Admin            from './pages/Admin'
import Disclaimer       from './pages/Disclaimer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <LegalBanner />
          <Routes>
            {/* Admin — no standard layout */}
            <Route path="/admin" element={<Admin />} />

            {/* All other pages */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/"                    element={<Home />} />
                  <Route path="/products"            element={<Products />} />
                  <Route path="/products/:id"        element={<ProductDetail />} />
                  <Route path="/about"               element={<About />} />
                  <Route path="/contact"             element={<Contact />} />
                  <Route path="/faq"                 element={<FAQ />} />
                  <Route path="/lab-results"         element={<LabResults />} />
                  <Route path="/cart"                element={<Cart />} />
                  <Route path="/checkout"            element={<Checkout />} />
                  <Route path="/order-confirmation"  element={<OrderConfirmation />} />
                  <Route path="/disclaimer"          element={<Disclaimer />} />
                  <Route path="/privacy"             element={<Disclaimer />} />
                  <Route path="/terms"               element={<Disclaimer />} />
                  <Route path="/shipping"            element={<Disclaimer />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AdminProvider>
  )
}
