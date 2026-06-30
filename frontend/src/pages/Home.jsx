import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { productService } from '../services/api.js'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService.getCategories()
      .then(res => setCategories(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    productService.getAll(search, selectedCategory)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [search, selectedCategory])

  return (
    <div className="container">
      <section className="hero">
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="status-badge">
            Evana · Votre marché en ligne
          </span>
        </div>
        <h1>
          Découvrez des{' '}
          <span className="brand-text">produits</span>
          <br />
          de <span className="brand-text">qualité</span>
        </h1>
        <p>
          Evana vous propose une sélection de produits
          soigneusement choisis au meilleur prix, livrés
          directement chez vous.
        </p>
      </section>

      <SearchBar
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des produits...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>Aucun produit trouvé pour votre recherche.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
