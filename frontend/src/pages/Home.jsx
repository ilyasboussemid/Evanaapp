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
        <h1>Bienvenue sur <span className="brand-text">Evana</span></h1>
        <p>Découvrez nos produits de qualité au meilleur prix</p>
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
