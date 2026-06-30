import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { orderService } from '../services/api.js'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart, setLastOrder } = useCart()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  })

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Votre panier est vide.</p>
          <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Le prénom est obligatoire'
    if (!form.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire'
    if (!form.phone.trim()) {
      newErrors.phone = 'Le téléphone est obligatoire'
    } else if (!/^[+]?[0-9\s\-]{8,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Format de téléphone invalide'
    }
    if (!form.address.trim()) newErrors.address = "L'adresse est obligatoire"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const orderData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }
      const res = await orderService.create(orderData)
      setLastOrder(res.data)
      clearCart()
      navigate('/confirmation')
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la commande. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Link to="/cart" className="back-link">&larr; Retour au panier</Link>
      <h1>Finaliser la commande</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Informations de livraison</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Votre prénom"
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Votre nom"
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Téléphone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+33 6 12 34 56 78"
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Adresse de livraison *</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              placeholder="Numéro, rue, ville, code postal"
              rows="3"
            ></textarea>
            {errors.address && <span className="error-msg">{errors.address}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? 'Traitement...' : 'Confirmer la commande'}
          </button>
        </form>
        <div className="checkout-summary">
          <h2>Récapitulatif</h2>
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <span className="checkout-item-name">
                  {item.name} x{item.quantity}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)} &euro;</span>
              </div>
            ))}
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>{getCartTotal().toFixed(2)} &euro;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
