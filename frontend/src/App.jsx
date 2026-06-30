import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Soldes from './pages/Soldes.jsx'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/soldes" element={<Soldes />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Evana</h4>
              <p className="text-muted text-sm" style={{ lineHeight: 1.6 }}>
                Votre marché en ligne pour des produits de qualité au meilleur prix.
                Livraison rapide et service client réactif.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Navigation</h4>
              <div className="flex flex-col gap-1">
                <a href="/" className="text-sm">Accueil</a>
                <a href="/cart" className="text-sm">Mon panier</a>
                <a href="/admin" className="text-sm">Administration</a>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Catégories</h4>
              <div className="flex flex-col gap-1 text-sm text-muted">
                <span>Chaussures Femmes</span>
                <span>Sacs Femmes</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
            <p className="text-xs text-muted">© 2024 Evana — Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
