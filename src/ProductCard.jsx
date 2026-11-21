import { Link } from 'react-router-dom'
import Shoe from './Shoe.jsx'
import Tilt from './Tilt.jsx'
import { money } from './utils.js'

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <Tilt as={Link} to={`/product/${product.id}`} max={6} className="product-media" style={{ '--tint': product.tint }}>
        <Shoe palette={product.palette} image={product.image} label={product.name} />
        <span className="product-badge">{product.category}</span>
      </Tilt>
      <div className="product-body">
        <div className="product-row">
          <h3>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="product-price">{money(product.price)}</span>
        </div>
        <p className="product-note">{product.color} · {product.tagline}</p>
        <div className="product-actions">
          <button className="btn btn-dark btn-sm" onClick={() => onAdd(product)}>
            Add to bag
          </button>
          <Link className="btn btn-line btn-sm" to={`/product/${product.id}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}
