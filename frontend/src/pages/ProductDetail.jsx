import React, { useState, useEffect } from 'react'
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
      .then(res => { setProduct(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) return <div className="loader"><div style={{ textAlign: 'center' }}><div className="loader-spinner" /><p className="text-muted text-sm" style={{ marginTop: '1rem' }}>Chargement...</p></div></div>

  if (!product) return <div className="container"><div className="empty-state"><p>Produit introuvable.</p><Link to="/" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Retour</Link></div></div>

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <Link to="/" className="nav-link" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>← Retour aux produits</Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }} />
        </div>
        <div>
          <span className="badge" style={{ marginBottom: '0.75rem' }}>{product.category}</span>
          <h1 style={{ marginBottom: '0.5rem' }}>{product.name}</h1>
          <p className="text-muted" style={{ lineHeight: 1.8, margin: '1rem 0' }}>{product.description}</p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.04em', margin: '1.5rem 0' }}>
            {product.price.toFixed(2)} MAD
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            {product.stock > 0 ? (
              <span className="pill pill-success">En stock ({product.stock})</span>
            ) : (
              <span className="pill pill-error">Rupture de stock</span>
            )}
          </div>
          {product.stock > 0 && (
            <div className="flex items-center gap-2">
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 42, height: 42, background: 'var(--surface-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>-</button>
                <span style={{ width: 50, textAlign: 'center', fontWeight: 600, fontFamily: 'var(--font-display)' }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: 42, height: 42, background: 'var(--surface-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>+</button>
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
