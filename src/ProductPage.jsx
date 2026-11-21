import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById, products } from './products.js'
import ProductCard from './ProductCard.jsx'
import Shoe from './Shoe.jsx'
import Tilt from './Tilt.jsx'
import { money } from './utils.js'

const sizes = ['39', '40', '41', '42', '43', '44', '45']

export default function ProductPage({ onAdd }) {
  const { id } = useParams()
  const product = useMemo(() => getProductById(id), [id])
  const [size, setSize] = useState('42')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="section">
        <div className="empty-state">
          <p className="eyebrow">Not found</p>
          <h2>We couldn’t find that pair.</h2>
          <p>It may have sold out or moved. Browse the current collection instead.</p>
          <Link className="btn btn-dark" to="/">Back to collection</Link>
        </div>
      </main>
    )
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    onAdd({ ...product, selectedSize: size })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <main className="pdp">
      <section className="pdp-main">
        <div className="pdp-stage" style={{ '--bg': product.bg, '--glow': product.glow }}>
          <nav className="crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/collection">Collection</Link>
            <span>/</span>
            <span className="current">{product.name}</span>
          </nav>
          <span className="stage-word" aria-hidden="true">{product.name}</span>
          <Tilt className="pdp-shoe" max={8}>
            <Shoe key={product.id} palette={product.palette} image={product.image} label={product.name} priority />
          </Tilt>
          <p className="stage-hint">Move your cursor over the shoe to turn it</p>
        </div>

        <div className="pdp-info">
          <p className="eyebrow">{product.category} · {product.color}</p>
          <h1>{product.name}</h1>
          <p className="pdp-tag">{product.tagline}</p>
          <p className="pdp-price">{money(product.price)}</p>
          <p className="pdp-lead">{product.description}</p>

          <div className="pdp-size">
            <div className="pdp-size-head">
              <span className="label">Size (EU)</span>
              <Link className="text-link" to="/service#size-guide">Size guide</Link>
            </div>
            <div className="size-grid">
              {sizes.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`size-btn ${size === value ? 'active' : ''}`}
                  onClick={() => setSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-actions">
            <button className="btn btn-dark btn-block btn-lg" onClick={handleAdd}>
              {added ? 'Added to bag ✓' : `Add to bag · ${money(product.price)}`}
            </button>
          </div>

          <ul className="pdp-perks">
            <li>Free shipping on orders over $150</li>
            <li>Free 30-day returns and exchanges</li>
            <li>Ships within 1–2 business days</li>
          </ul>

          <ul className="spec-grid">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pdp-related">
        <div className="section-head">
          <div>
            <p className="eyebrow">You may also like</p>
            <h2>More from the collection.</h2>
          </div>
        </div>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} onAdd={onAdd} />
          ))}
        </div>
      </section>
    </main>
  )
}
