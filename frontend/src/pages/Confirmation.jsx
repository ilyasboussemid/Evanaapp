import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Confirmation() {
  const { lastOrder } = useCart()

  if (!lastOrder) return <div className="container"><div className="empty-state"><p>Aucune commande à afficher.</p><Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Retour</Link></div></div>

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '700px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, var(--status-success), #34d399)', color: 'white', fontSize: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}>✓</div>
        <h1 style={{ color: 'var(--status-success)' }}>Commande confirmée !</h1>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>Merci pour votre commande. Voici votre récapitulatif :</p>
      </div>

      <div className="card" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Commande #{lastOrder.id}</h3>
          <span className="pill pill-success">CONFIRMÉE</span>
          <p className="text-sm text-muted" style={{ marginTop: '0.5rem' }}>
            {new Date(lastOrder.orderDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Livraison</h4>
          <p style={{ fontWeight: 600 }}>{lastOrder.firstName} {lastOrder.lastName}</p>
          <p className="text-sm text-muted">{lastOrder.phone}</p>
          <p className="text-sm text-muted">{lastOrder.address}</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Articles</h4>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Produit</th><th>Qté</th><th>Prix unit.</th><th>Sous-total</th></tr></thead>
              <tbody>
                {lastOrder.items.map((item, i) => (
                  <tr key={i}><td>{item.productName}</td><td>{item.quantity}</td><td>{item.unitPrice.toFixed(2)} MAD</td><td style={{ fontWeight: 600 }}>{item.subtotal.toFixed(2)} MAD</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card-flat flex justify-between items-center" style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total de la commande</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{lastOrder.totalAmount.toFixed(2)} MAD</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary btn-lg">Continuer mes achats</Link>
      </div>
    </div>
  )
}

export default Confirmation
