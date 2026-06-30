import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { productService } from '../services/api.js'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getById(id)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Produit introuvable.</p>
          <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">&larr; Retour aux produits</Link>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="product-category-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-price">{product.price.toFixed(2)} &euro;</div>
          <div className="product-detail-stock">
            {product.stock > 0 ? (
              <span className="in-stock">En stock ({product.stock} disponibles)</span>
            ) : (
              <span className="out-of-stock">Rupture de stock</span>
            )}
          </div>
          {product.stock > 0 && (
            <div className="product-detail-actions">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                {added ? '✓ Ajouté !' : 'Ajouter au panier'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
