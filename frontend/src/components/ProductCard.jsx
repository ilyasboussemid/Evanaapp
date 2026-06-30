import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-short-desc">{product.shortDescription}</p>
        <div className="product-footer">
          <span className="product-price">{product.price.toFixed(2)} &euro;</span>
          <button className="btn btn-add-cart" onClick={handleAddToCart}>
            + Panier
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
