import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { productService } from '../services/api.js'

function Soldes() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getAll('', '')
      .then(res => {
        const allProducts = Array.isArray(res.data) ? res.data : []
        // Products on sale: simulate 30% discount on selected products (IDs 1, 3, 4, 7, 10, 12)
        const saleIds = [1, 3, 4, 7, 10, 12]
        const saleProducts = allProducts
          .filter(p => saleIds.includes(p.id))
          .map(p => ({ ...p, originalPrice: p.price, salePrice: Math.round(p.price * 0.7), discount: 30 }))
        setProducts(saleProducts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <section style={{ padding: '4rem 0 2rem', background: 'linear-gradient(135deg, var(--accent) 0%, #f97316 100%)', marginBottom: '2rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '0.75rem' }}>SOLDES</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>Jusqu'à -30% sur une sélection de produits</p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {loading ? (
          <div className="loader"><div style={{ textAlign: 'center' }}><div className="loader-spinner" /><p className="text-muted text-sm" style={{ marginTop: '1rem' }}>Chargement...</p></div></div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>Aucun produit en solde actuellement.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {products.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: '#dc2626', color: 'white' }}>-{product.discount}%</span>
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '0.35rem', color: 'var(--text)', fontSize: '1rem' }}>{product.name}</h4>
                    <p className="text-muted text-sm" style={{ marginBottom: '0.5rem', lineHeight: 1.5 }}>{product.shortDescription}</p>
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1" style={{ marginBottom: '0.75rem' }}>
                        {product.colors.map(color => (
                          <span key={color.id} title={color.name} style={{ width: 16, height: 16, borderRadius: '50%', background: color.hexCode, border: '1.5px solid var(--border)', display: 'inline-block' }} />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: 'auto' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{product.salePrice.toFixed(2)} MAD</span>
                        <span className="text-sm text-muted" style={{ marginLeft: '0.5rem', textDecoration: 'line-through' }}>{product.originalPrice.toFixed(2)}</span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart({ ...product, price: product.salePrice }) }}
                      >
                        + Panier
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Soldes
