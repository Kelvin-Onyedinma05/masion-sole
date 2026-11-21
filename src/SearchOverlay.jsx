import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Shoe from './Shoe.jsx'
import { products } from './products.js'
import { money } from './utils.js'

const matches = (product, q) =>
  [product.name, product.category, product.color, product.tagline].join(' ').toLowerCase().includes(q)

// Full-width search panel with live results. Enter opens every match on the Collection page.
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return undefined
    setQuery('')
    const timer = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(timer)
  }, [open])

  const q = query.trim().toLowerCase()
  const results = useMemo(() => (q ? products.filter((item) => matches(item, q)) : []), [q])
  const categories = useMemo(() => [...new Set(products.map((item) => item.category))], [])

  const submit = (event) => {
    event.preventDefault()
    if (!q) return
    onClose()
    navigate(`/collection?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className={`search ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search">
        <form className="search-form" onSubmit={submit}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shoes, colours, styles"
            aria-label="Search"
            autoComplete="off"
          />
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">✕</button>
        </form>

        <div className="search-body">
          {!q && (
            <div className="search-suggest">
              <p>Browse by category</p>
              <div className="chips">
                {categories.map((name) => (
                  <Link key={name} className="chip" to={`/collection?category=${encodeURIComponent(name)}`} onClick={onClose}>{name}</Link>
                ))}
              </div>
            </div>
          )}

          {q && results.length > 0 && (
            <>
              <ul className="search-results">
                {results.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <Link to={`/product/${item.id}`} onClick={onClose}>
                      <span className="search-thumb" style={{ '--tint': item.tint }}>
                        <Shoe palette={item.palette} image={item.image} />
                      </span>
                      <span className="search-name"><strong>{item.name}</strong><small>{item.category} · {item.color}</small></span>
                      <em>{money(item.price)}</em>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="submit" form="" className="search-all" onClick={submit}>
                See all {results.length} {results.length === 1 ? 'result' : 'results'} →
              </button>
            </>
          )}

          {q && results.length === 0 && <p className="search-empty">No pairs match “{query.trim()}”. Try a colour or a style.</p>}
        </div>
      </div>
    </div>
  )
}
