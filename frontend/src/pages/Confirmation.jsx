import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Confirmation() {
  const { lastOrder } = useCart()

  if (!lastOrder) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Aucune commande à afficher.</p>
          <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="confirmation-page">
        <div className="confirmation-header">
          <div className="confirmation-icon">&#10003;</div>
          <h1>Commande confirmée !</h1>
          <p>Merci pour votre commande. Voici votre récapitulatif :</p>
        </div>

        <div className="confirmation-details">
          <div className="confirmation-section">
            <h2>Commande #{lastOrder.id}</h2>
            <p className="order-status">Statut : <span className="status-badge">{lastOrder.status}</span></p>
            <p>Date : {new Date(lastOrder.orderDate).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}</p>
          </div>

          <div className="confirmation-section">
            <h3>Informations de livraison</h3>
            <p><strong>{lastOrder.firstName} {lastOrder.lastName}</strong></p>
            <p>{lastOrder.phone}</p>
            <p>{lastOrder.address}</p>
          </div>

          <div className="confirmation-section">
            <h3>Articles commandés</h3>
            <table className="confirmation-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Qté</th>
                  <th>Prix unit.</th>
                  <th>Sous-total</th>
                </tr>
              </thead>
              <tbody>
                {lastOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice.toFixed(2)} &euro;</td>
                    <td>{item.subtotal.toFixed(2)} &euro;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="confirmation-total">
            <span>Total de la commande</span>
            <span className="total-amount">{lastOrder.totalAmount.toFixed(2)} &euro;</span>
          </div>
        </div>

        <Link to="/" className="btn btn-primary btn-lg">
          Continuer mes achats
        </Link>
      </div>
    </div>
  )
}

export default Confirmation
