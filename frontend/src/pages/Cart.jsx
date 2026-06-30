import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1>Mon Panier</h1>
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: '#ccc'}}>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Votre panier est vide</p>
          <Link to="/" className="btn btn-primary">Découvrir nos produits</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Mon Panier</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{item.price.toFixed(2)} &euro;</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-subtotal">
                {(item.price * item.quantity).toFixed(2)} &euro;
              </div>
              <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Résumé</h2>
          <div className="cart-summary-row">
            <span>Sous-total</span>
            <span>{getCartTotal().toFixed(2)} &euro;</span>
          </div>
          <div className="cart-summary-row">
            <span>Livraison</span>
            <span className="free-shipping">Gratuite</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>{getCartTotal().toFixed(2)} &euro;</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Valider le panier
          </Link>
          <Link to="/" className="btn btn-secondary btn-block">
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
