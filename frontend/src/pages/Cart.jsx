import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Votre panier est vide</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Découvrir nos produits</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header" style={{ paddingTop: 0 }}>
        <h1>Mon Panier</h1>
        <p>{cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
        <div className="flex flex-col gap-2">
          {cartItems.map(item => (
            <div key={item.id} className="card-flat flex items-center gap-2" style={{ padding: '1rem' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                <span className="text-muted text-sm">{item.price.toFixed(2)} €</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 32, height: 32, background: 'var(--surface-muted)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                <span style={{ width: 36, textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 32, height: 32, background: 'var(--surface-muted)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', minWidth: 80, textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)} €</span>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', padding: '0.5rem', borderRadius: '999px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="card" style={{ position: 'sticky', top: 90 }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Résumé</h3>
          <div className="flex justify-between" style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <span>Sous-total</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>
          <div className="flex justify-between" style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
            <span>Livraison</span>
            <span className="pill pill-success" style={{ fontSize: '0.75rem' }}>Gratuite</span>
          </div>
          <div className="flex justify-between" style={{ padding: '1rem 0 0', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>
            <span>Total</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1.25rem' }}>
            Valider le panier
          </Link>
          <Link to="/" className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
