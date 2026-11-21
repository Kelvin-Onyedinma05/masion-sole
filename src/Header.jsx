import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchOverlay from './SearchOverlay.jsx'

const notices = ['Free shipping over $150', 'Free 30-day returns', 'Carbon-neutral delivery']
const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/our-approach', label: 'Our approach' },
  { to: '/service', label: 'Service' },
]

// Desktop shows all three notices in a row. On phones they swap one at a time so the bar stays a single line.
function Announcement() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => setCurrent((n) => (n + 1) % notices.length), 3600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="announcement" role="region" aria-label="Store notices">
      <ul className="notice-list">
        {notices.map((text, i) => (
          <li key={text} className={i === current ? 'is-current' : ''}>{text}</li>
        ))}
      </ul>
    </div>
  )
}

const BagIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
  </svg>
)

export default function Header({ itemCount, onOpenCart }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : ''
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); setSearchOpen(false) }
      const typing = /input|textarea|select/i.test(event.target.tagName) || event.target.isContentEditable
      const shortcut = event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')
      if (!typing && shortcut) { event.preventDefault(); setSearchOpen(true) }
    }
    const desktop = window.matchMedia('(min-width: 761px)')
    const onResize = (event) => { if (event.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, searchOpen])

  const openBag = () => { setOpen(false); onOpenCart() }

  return (
    <>
      <Announcement />

      <header className="header">
        <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
          <span className="bars"><i /><i /></span>
        </button>

        <Link to="/" className="logo">Maison Sole</Link>

        <nav className="nav" aria-label="Main">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-link search-btn" type="button" aria-label="Search" aria-haspopup="dialog" onClick={() => setSearchOpen(true)}><SearchIcon /><span>Search</span></button>
          <button className="bag-btn" type="button" onClick={onOpenCart} aria-label={`Open bag, ${itemCount} items`}>
            <BagIcon />
            <span className="bag-label">Bag</span>
            <span className="bag-count" key={itemCount}>{itemCount}</span>
          </button>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className={`menu ${open ? 'open' : ''}`} id="mobile-menu" aria-hidden={!open}>
        <div className="menu-backdrop" onClick={() => setOpen(false)} />
        <aside className="menu-panel" aria-label="Menu">
          <div className="menu-top">
            <span className="logo">Maison Sole</span>
            <button className="menu-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
          </div>
          <nav className="menu-links" aria-label="Mobile">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)} onClick={() => setOpen(false)}>
                {item.label}<span>→</span>
              </NavLink>
            ))}
          </nav>
          <div className="menu-foot">
            <button className="btn btn-dark btn-block" type="button" onClick={openBag}>View bag ({itemCount})</button>
            <ul className="menu-notes">{notices.map((text) => <li key={text}>{text}</li>)}</ul>
          </div>
        </aside>
      </div>
    </>
  )
}
