import { useState } from 'react'
import { Link } from 'react-router-dom'
import { heroProducts, products } from './products.js'
import ProductCard from './ProductCard.jsx'
import Shoe from './Shoe.jsx'
import Tilt from './Tilt.jsx'
import { money } from './utils.js'

export default function Home({ onAdd }) {
  const [index, setIndex] = useState(0)
  const p = heroProducts[index]
  const next = heroProducts[(index + 1) % heroProducts.length]

  return (
    <main>
      <section className="landing" style={{ '--bg': p.bg, '--glow': p.glow }}>
        <div className="landing-copy hero-text">
          <p className="landing-kicker">{p.category} · {p.name}</p>
          <h1>
            {p.headline.split(' ').map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h1>
          <p className="lede">{p.description}</p>
          <div className="landing-buy">
            <Link className="btn btn-light" to={`/product/${p.id}`}>Shop now</Link>
            <button className="btn btn-ghost" onClick={() => onAdd(p)}>Add to bag · {money(p.price)}</button>
          </div>
        </div>

        <Tilt className="landing-stage" max={8}>
          <Shoe key={p.id} className="hero-shoe" palette={p.palette} image={p.image} label={p.name} priority />
        </Tilt>

        <button type="button" className="landing-next" onClick={() => setIndex((index + 1) % heroProducts.length)} aria-label={`Next pair: ${next.name}`}>
          <Shoe palette={next.palette} image={next.image} />
        </button>

        <div className="landing-foot">
          <div className="picker" role="group" aria-label="Choose a pair">
            {heroProducts.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.name}
                aria-pressed={i === index}
                className={`swatch ${i === index ? 'active' : ''}`}
                style={{ background: item.swatch ?? item.palette?.upper }}
                onClick={() => setIndex(i)}
              />
            ))}
            <Link className="text-link" to="/collection">Shop the collection</Link>
          </div>
          <ul className="landing-points">
            <li><strong>Free shipping</strong><span>Over $150</span></li>
            <li><strong>30-day returns</strong><span>No questions</span></li>
            <li><strong>Made to last</strong><span>Premium materials</span></li>
          </ul>
        </div>
      </section>

      <section className="marquee">
        <span>Premium materials</span>
        <span>·</span>
        <span>Free returns within 30 days</span>
        <span>·</span>
        <span>Carbon-neutral delivery</span>
        <span>·</span>
        <span>Designed in-house</span>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">The Collection</p>
            <h2>Every pair, one point of view.</h2>
          </div>
          <p className="section-sub">
            A tight edit of everyday shoes — no filler, nothing louder than it needs to be.
          </p>
        </div>

        <div className="product-grid">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
        <div className="section-more">
          <Link className="btn btn-line" to="/collection">View the full collection ({products.length})</Link>
        </div>
      </section>

      <section className="editorial">
        <div className="editorial-media">
          <img
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
            alt="Pair of shoes on a neutral backdrop"
            loading="lazy"
          />
        </div>
        <div className="editorial-text">
          <p className="eyebrow">Our Approach</p>
          <h2>Fewer pairs. Better made.</h2>
          <p>
            We work with a small number of factories, use materials we can trace, and keep the range
            deliberately short. The result is footwear that fits into a real wardrobe and holds up to a real week.
          </p>
          <Link className="btn btn-line" to="/our-approach">Read our approach</Link>
        </div>
      </section>

      <section className="promise-grid">
        <Link className="promise" to="/service#size-guide">
          <h3>Fit first <span aria-hidden="true">→</span></h3>
          <p>True-to-size lasts, tested across hundreds of fittings before a pair goes on sale.</p>
        </Link>
        <Link className="promise" to="/our-approach#materials">
          <h3>Honest materials <span aria-hidden="true">→</span></h3>
          <p>Traceable leather, recycled knits, and outsoles built for repair rather than replacement.</p>
        </Link>
        <Link className="promise" to="/service">
          <h3>Simple service <span aria-hidden="true">→</span></h3>
          <p>Fast delivery, easy exchanges, and a support team that actually answers.</p>
        </Link>
      </section>

      <section className="newsletter">
        <div>
          <h2>New drops, quietly announced.</h2>
          <p>One email a month. Early access, restocks, and nothing else.</p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email address" aria-label="Email address" required />
          <button className="btn btn-dark" type="submit">Subscribe</button>
        </form>
      </section>
    </main>
  )
}
