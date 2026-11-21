import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Dark title band shared by the Collection, Our approach and Service pages.
export default function PageHero({ eyebrow, title, lede }) {
  useEffect(() => {
    document.title = `${title} · Maison Sole`
  }, [title])

  return (
    <section className="page-hero">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="current">{title}</span>
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </section>
  )
}
