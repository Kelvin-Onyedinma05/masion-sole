import { Link } from 'react-router-dom'
import PageHero from './PageHero.jsx'

const sizes = [
  ['39', '6', '7', '24.5'], ['40', '6.5', '7.5', '25'], ['41', '7.5', '8.5', '26'], ['42', '8', '9', '26.5'],
  ['43', '9', '10', '27.5'], ['44', '9.5', '10.5', '28'], ['45', '10.5', '11.5', '29'],
]

const faqs = [
  { q: 'Do your shoes fit true to size?', a: 'Yes. Our lasts are tested across hundreds of fittings. If you are between sizes, we suggest sizing up.' },
  { q: 'Can I change my order after I place it?', a: 'Send us a message within a few hours of ordering and we will do our best to change it before it ships.' },
  { q: 'Do you ship internationally?', a: 'We are adding more countries over time. Delivery options and costs are shown at checkout.' },
  { q: 'How should I care for my shoes?', a: 'Brush off dirt after wearing, spot clean with a damp cloth, and let them dry naturally away from heat.' },
]

export default function ServicePage() {
  return (
    <main>
      <PageHero
        eyebrow="Service"
        title="Simple service."
        lede="Fast delivery, easy exchanges, and a team that actually answers."
      />

      <section className="section">
        <div className="cards3">
          <a className="info-card link-card" href="#shipping"><h3>Shipping</h3><p>Free over $150, dispatched in 1–2 business days.</p></a>
          <a className="info-card link-card" href="#returns"><h3>Returns</h3><p>Free 30-day returns and exchanges.</p></a>
          <a className="info-card link-card" href="#size-guide"><h3>Size guide</h3><p>Find your fit from EU 39 to 45.</p></a>
        </div>
      </section>

      <section id="shipping" className="section">
        <div className="section-head"><div><p className="eyebrow">Shipping</p><h2>Delivery, without the guesswork.</h2></div></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Method</th><th>Arrives in</th><th>Cost</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>3–5 business days</td><td>$8, free over $150</td></tr>
              <tr><td>Express</td><td>1–2 business days</td><td>$18</td></tr>
            </tbody>
          </table>
        </div>
        <p className="note">Every order ships carbon-neutral and leaves our team within 1–2 business days.</p>
      </section>

      <section id="returns" className="section">
        <div className="section-head"><div><p className="eyebrow">Returns</p><h2>Not right? Send them back.</h2></div></div>
        <ol className="steps three">
          <li><h3>Ask</h3><p>Contact us within 30 days of delivery to start a return or exchange.</p></li>
          <li><h3>Send</h3><p>Pack the pair unworn, in its box, and use the free return label we email you.</p></li>
          <li><h3>Done</h3><p>We refund or swap your pair as soon as it reaches us.</p></li>
        </ol>
      </section>

      <section id="size-guide" className="section">
        <div className="section-head"><div><p className="eyebrow">Size guide</p><h2>Find your size.</h2></div></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>EU</th><th>UK</th><th>US</th><th>Foot length (cm)</th></tr></thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">Measure your foot from heel to longest toe. Between two sizes? Choose the larger one.</p>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="eyebrow">Questions</p><h2>Good to know.</h2></div></div>
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="cta-band">
          <div>
            <h2>Still need a hand?</h2>
            <p>Email hello@maisonsole.example, Monday to Friday, 9am to 6pm. We reply within one business day.</p>
          </div>
          <Link className="btn btn-light" to="/collection">Keep shopping</Link>
        </div>
      </section>
    </main>
  )
}
