import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Header() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [prevCount, setPrevCount] = useState(cartCount)

  useEffect(() => {
    if (cartCount > prevCount) {
      setShowNotif(true)
      setTimeout(() => setShowNotif(false), 2500)
    }
    setPrevCount(cartCount)
  }, [cartCount])

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/soldes', label: 'Soldes' },
    { path: '/?category=Sacs+Femmes', label: 'Sacs' },
    { path: '/?category=Chaussures+Femmes', label: 'Chaussures' },
  ]

  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src="/evana-logo.svg" alt="Evana" style={{ height: '32px' }} />
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.path === '/'
              ? location.pathname === '/' && !location.search
              : link.path === '/soldes'
                ? location.pathname === '/soldes'
                : location.pathname === '/' && location.search === `?category=${link.path.split('=')[1]}`
            if (isActive) return null
            return (
              <Link key={link.path} to={link.path} className="nav-link">{link.label}</Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2" style={{ position: 'relative' }}>
          <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'var(--accent-soft)', color: 'var(--accent-strong)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Panier
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', color: 'white', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 2px 8px rgba(232,93,4,0.4)' }}>{cartCount}</span>
            )}
          </Link>

          {showNotif && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.75rem', padding: '0.75rem 1.25rem', background: 'var(--surface-strong)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', zIndex: 200, whiteSpace: 'nowrap', animation: 'fadeIn 0.3s ease' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-strong)', fontWeight: 600 }}>
                ✓ Article ajouté ! ({cartCount} dans le panier)
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
