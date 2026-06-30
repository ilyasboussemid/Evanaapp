import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { orderService } from '../services/api.js'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart, setLastOrder } = useCart()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', address: '' })

  if (cartItems.length === 0) return <div className="container"><div className="empty-state"><p>Votre panier est vide.</p><Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Retour</Link></div></div>

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Le prénom est obligatoire'
    if (!form.lastName.trim()) e.lastName = 'Le nom est obligatoire'
    if (!form.phone.trim()) e.phone = 'Le téléphone est obligatoire'
    else if (!/^[+]?[0-9\s\-]{8,15}$/.test(form.phone.trim())) e.phone = 'Format invalide'
    if (!form.address.trim()) e.address = "L'adresse est obligatoire"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await orderService.create({
        firstName: form.firstName.trim(), lastName: form.lastName.trim(),
        phone: form.phone.trim(), address: form.address.trim(),
        items: cartItems.map(i => ({ productId: i.id, quantity: i.quantity }))
      })
      setLastOrder(res.data)
      clearCart()
      navigate('/confirmation')
    } catch { alert('Erreur lors de la commande.') }
    finally { setLoading(false) }
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Link to="/cart" className="nav-link" style={{ marginBottom: '1rem', display: 'inline-flex' }}>← Retour au panier</Link>
      <div className="page-header" style={{ paddingTop: '0.5rem' }}>
        <h1>Finaliser la commande</h1>
        <p>Remplissez vos informations de livraison</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
        <form className="card" onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Informations de livraison</h3>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Prénom *</label>
              <input className="input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Votre prénom" style={errors.firstName ? { borderColor: 'var(--status-error)' } : {}} />
              {errors.firstName && <span className="text-xs" style={{ color: 'var(--status-error)' }}>{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Nom *</label>
              <input className="input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Votre nom" style={errors.lastName ? { borderColor: 'var(--status-error)' } : {}} />
              {errors.lastName && <span className="text-xs" style={{ color: 'var(--status-error)' }}>{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Téléphone *</label>
            <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="+33 6 12 34 56 78" style={errors.phone ? { borderColor: 'var(--status-error)' } : {}} />
            {errors.phone && <span className="text-xs" style={{ color: 'var(--status-error)' }}>{errors.phone}</span>}
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Adresse de livraison *</label>
            <textarea className="input" name="address" value={form.address} onChange={handleChange} placeholder="Numéro, rue, ville, code postal" rows="3" style={{ resize: 'vertical', minHeight: '80px', ...(errors.address ? { borderColor: 'var(--status-error)' } : {}) }} />
            {errors.address && <span className="text-xs" style={{ color: 'var(--status-error)' }}>{errors.address}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Traitement...' : 'Confirmer la commande'}
          </button>
        </form>

        <div className="card" style={{ position: 'sticky', top: 90 }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Récapitulatif</h3>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm" style={{ padding: '0.3rem 0' }}>
                <span className="text-muted">{item.name} ×{item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>
            <span>Total</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
