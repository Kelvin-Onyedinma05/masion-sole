import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'
import { products } from './products.js'

const materials = [
  { title: 'Traceable leather', text: 'Full-grain hides from tanneries we can name, finished to age well rather than wear out.' },
  { title: 'Recycled knits', text: 'Uppers knitted from recycled yarn, light and breathable, with no glue where a stitch will do.' },
  { title: 'Repairable soles', text: 'Outsoles built so they can be resoled, which keeps a good pair on your feet for years.' },
]

const steps = [
  { title: 'Design', text: 'One shape at a time, drawn to sit with what you already own.' },
  { title: 'Fit testing', text: 'True-to-size lasts, tested across hundreds of fittings before a pair goes on sale.' },
  { title: 'Small runs', text: 'We work with a few factories and keep each run short, so nothing sits in a warehouse.' },
  { title: 'Built to repair', text: 'Replaceable parts and an easy returns process, because a good shoe should outlast a season.' },
]

export default function ApproachPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our approach"
        title="Fewer pairs. Better made."
        lede="We keep the range short, the materials honest and the fit right, so every pair earns its place."
      />

      <section className="section split">
        <img
          src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
          alt="Pair of shoes on a neutral backdrop"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">The idea</p>
          <h2>Footwear that fits into a real wardrobe.</h2>
          <p className="lede">
            Most shoe brands chase newness. We would rather make a small number of pairs well. We work with a few
            factories, use materials we can trace, and keep the range deliberately short. The result holds up to a
            real week, not just a photo shoot.
          </p>
        </div>
      </section>

      <section className="section stats">
        <div className="stat"><strong>{products.length}</strong><span>pairs in the range, no filler</span></div>
        <div className="stat"><strong>30</strong><span>day returns on every order</span></div>
        <div className="stat"><strong>1–2</strong><span>business days to ship</span></div>
      </section>

      <section id="materials" className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Materials</p>
            <h2>Honest from the inside out.</h2>
          </div>
        </div>
        <div className="cards3">
          {materials.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">How we work</p>
            <h2>From sketch to your door.</h2>
          </div>
        </div>
        <ol className="steps">
          {steps.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="cta-band">
          <h2>See what we have made.</h2>
          <Link className="btn btn-light" to="/collection">Shop the collection</Link>
        </div>
      </section>
    </main>
  )
}
