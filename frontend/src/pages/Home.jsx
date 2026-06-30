import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { productService } from '../services/api.js'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getCategories()
      .then(res => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    setLoading(true)
    productService.getAll(search, selectedCategory)
      .then(res => { setProducts(Array.isArray(res.data) ? res.data : []); setLoading(false) })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [search, selectedCategory])

  return (
    <div>
      <section style={{ padding: '5rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              Evana · Votre marché en ligne
            </span>
          </div>
          <h1 style={{ fontSize: '3.25rem', lineHeight: 1.1, letterSpacing: '-0.06em', marginBottom: '1.25rem' }}>
            Découvrez des <span style={{ color: 'var(--accent)' }}>produits</span>
            <br />
            de <span style={{ color: 'var(--accent)' }}>qualité</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 2.5rem' }}>
            Evana vous propose une sélection de produits soigneusement choisis
            au meilleur prix, livrés directement chez vous.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              style={{ paddingLeft: '2.75rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
            />
          </div>
          <select
            className="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ minWidth: '200px' }}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {(search || selectedCategory) && (
          <div className="flex items-center gap-1 flex-wrap" style={{ marginBottom: '1rem' }}>
            <span className="text-xs text-muted">Filtres actifs :</span>
            {search && <span className="badge">{search} <span onClick={() => setSearch('')} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span></span>}
            {selectedCategory && <span className="badge">{selectedCategory} <span onClick={() => setSelectedCategory('')} style={{ cursor: 'pointer', marginLeft: 4 }}>×</span></span>}
          </div>
        )}

        <p className="text-sm text-muted" style={{ marginBottom: '1rem' }}>
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
        </p>

        {loading ? (
          <div className="loader">
            <div style={{ textAlign: 'center' }}>
              <div className="loader-spinner" />
              <p className="text-muted text-sm" style={{ marginTop: '1rem' }}>Chargement des produits...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Aucun produit ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {products.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className="badge badge-sm" style={{ position: 'absolute', top: 12, left: 12 }}>{product.category}</span>
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '0.35rem', color: 'var(--text)', fontSize: '1rem' }}>{product.name}</h4>
                    <p className="text-muted text-sm" style={{ marginBottom: 'auto', paddingBottom: '1rem', lineHeight: 1.5 }}>{product.shortDescription}</p>
                    <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{product.price.toFixed(2)} €</span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product) }}
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

export default Home
