import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Header() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">E</div>
          <span className="logo-text">Evana</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/cart" className="cart-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18"
              height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Panier</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
