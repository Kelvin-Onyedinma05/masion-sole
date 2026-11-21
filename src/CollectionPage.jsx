import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import ProductCard from './ProductCard.jsx'
import { products } from './products.js'

const sorts = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A to Z',
}

export default function CollectionPage({ onAdd }) {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'All'
  const q = (params.get('q') || '').trim()
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'featured'
  const categories = useMemo(() => ['All', ...new Set(products.map((item) => item.category))], [])

  const list = useMemo(() => {
    const needle = q.toLowerCase()
    const items = products.filter(
      (item) =>
        (category === 'All' || item.category === category) &&
        (!needle || [item.name, item.category, item.color, item.tagline].join(' ').toLowerCase().includes(needle)),
    )
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
    if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [category, sort, q])

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return (
    <main>
      <PageHero
        eyebrow="Shop"
        title="The Collection"
        lede="A tight edit of everyday shoes. No filler, nothing louder than it needs to be."
      />

      <section className="section">
        {q && (
          <p className="search-note">
            Results for “{q}” · <Link to="/collection">Clear search</Link>
          </p>
        )}
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by category">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                className={`chip ${category === name ? 'active' : ''}`}
                aria-pressed={category === name}
                onClick={() => update('category', name, 'All')}
              >
                {name}
              </button>
            ))}
          </div>
          <label className="sort">
            <span>{list.length} {list.length === 1 ? 'pair' : 'pairs'}</span>
            <select value={sort} onChange={(event) => update('sort', event.target.value, 'featured')} aria-label="Sort products">
              {Object.entries(sorts).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
        </div>

        {list.length ? (
          <div className="product-grid">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Nothing in that category yet.</h2>
            <p>Try another category or see everything.</p>
            <Link className="btn btn-dark" to="/collection">Show all shoes</Link>
          </div>
        )}
      </section>
    </main>
  )
}
