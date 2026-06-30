import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { productService } from '../services/api.js'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getById(id)
      .then(res => {
        setProduct(res.data)
        if (res.data.sizes && res.data.sizes.length > 0) setSelectedSize(res.data.sizes[0])
        if (res.data.colors && res.data.colors.length > 0) setSelectedColor(res.data.colors[0])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        selectedSize: selectedSize ? selectedSize.size : null,
        selectedColor: selectedColor ? selectedColor.name : null
      }
      addToCart(cartItem, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  const currentStock = selectedSize ? selectedSize.stock : product?.stock || 0

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

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="text-sm" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                Couleur : <span className="text-muted">{selectedColor ? selectedColor.name : ''}</span>
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: color.hexCode,
                      border: selectedColor && selectedColor.id === color.id ? '3px solid var(--accent)' : '2px solid var(--border)',
                      cursor: 'pointer',
                      boxShadow: selectedColor && selectedColor.id === color.id ? '0 0 0 3px var(--accent-soft)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0].size !== 'Unique' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="text-sm" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                Pointure : <span className="text-muted">{selectedSize ? selectedSize.size : ''}</span>
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => { setSelectedSize(size); setQuantity(1) }}
                    disabled={size.stock === 0}
                    style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-sm)',
                      border: selectedSize && selectedSize.id === size.id ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                      background: size.stock === 0 ? '#f3f3f3' : selectedSize && selectedSize.id === size.id ? 'var(--accent-light)' : 'var(--surface-strong)',
                      color: size.stock === 0 ? '#bbb' : 'var(--text)',
                      fontWeight: 600, fontSize: '0.85rem',
                      cursor: size.stock === 0 ? 'not-allowed' : 'pointer',
                      textDecoration: size.stock === 0 ? 'line-through' : 'none',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-xs text-muted" style={{ marginTop: '0.4rem' }}>
                  {selectedSize.stock > 0 ? `${selectedSize.stock} en stock pour cette pointure` : 'Rupture de stock'}
                </p>
              )}
            </div>
          )}

          {/* Stock status */}
          <div style={{ marginBottom: '1.5rem' }}>
            {currentStock > 0 ? (
              <span className="pill pill-success">En stock ({currentStock})</span>
            ) : (
              <span className="pill pill-error">Rupture de stock</span>
            )}
          </div>

          {/* Add to cart */}
          {currentStock > 0 && (
            <div className="flex items-center gap-2">
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 42, height: 42, background: 'var(--surface-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>-</button>
                <span style={{ width: 50, textAlign: 'center', fontWeight: 600, fontFamily: 'var(--font-display)' }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(currentStock, quantity + 1))} style={{ width: 42, height: 42, background: 'var(--surface-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>+</button>
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
