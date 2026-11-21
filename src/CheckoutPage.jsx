import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PayLogo from './PayLogo.jsx'
import PaymentSheet from './PaymentSheet.jsx'
import Shoe from './Shoe.jsx'
import { methods } from './payMethods.js'
import { money } from './utils.js'

const emptyCard = { number: '', name: '', exp: '', cvc: '' }
const countries = ['Nigeria', 'Ghana', 'United States', 'United Kingdom', 'Canada', 'South Africa']

const payLabel = (id, total) =>
  ({
    'apple-pay': 'Pay with Apple Pay',
    'google-pay': 'Pay with Google Pay',
    'cash-app': 'Pay with Cash App',
    zelle: 'Pay with Zelle',
    paypal: 'Pay with PayPal',
    paystack: `Pay ${money(total)} with Paystack`,
  })[id] || `Pay ${money(total)}`

function Summary({ items, subtotal, shipping, total }) {
  return (
    <aside className="co-summary" aria-label="Order summary">
      <h2>Order summary</h2>
      {items.map((item) => (
        <div key={item.key} className="co-item">
          <div className="co-thumb">
            <Shoe palette={item.palette} image={item.image} label={item.name} />
            <em>{item.qty}</em>
          </div>
          <div>
            <strong>{item.name}</strong>
            <p>{item.size ? `EU ${item.size}` : 'One size'}</p>
          </div>
          <span>{money(item.price * item.qty)}</span>
        </div>
      ))}
      <div className="co-totals">
        <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
        <div className="grand"><span>Total</span><span>{money(total)}</span></div>
      </div>
    </aside>
  )
}

export default function CheckoutPage({ cart, subtotal, shipping, total, onComplete }) {
  const [contact, setContact] = useState({ name: '', email: '' })
  const [address, setAddress] = useState({ line: '', city: '', zip: '', country: 'Nigeria' })
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState(emptyCard)
  const [cashtag, setCashtag] = useState('')
  const [zelleId, setZelleId] = useState('')
  const [sheet, setSheet] = useState(false)
  const [order, setOrder] = useState(null)

  useEffect(() => { document.title = 'Checkout · Maison Sole' }, [])

  const setCardField = (key, raw) => {
    let value = raw
    if (key === 'number') value = raw.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
    if (key === 'exp') {
      const digits = raw.replace(/\D/g, '').slice(0, 4)
      value = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
    }
    if (key === 'cvc') value = raw.replace(/\D/g, '').slice(0, 4)
    setCard((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    if (cart.length) setSheet(true)
  }

  // Card details only live in this component's state and are cleared as soon as the payment finishes.
  const finish = () => {
    setOrder({
      id: `MS-${Math.floor(100000 + Math.random() * 900000)}`,
      name: contact.name,
      email: contact.email,
      method: methods.find((item) => item.id === method).label,
      items: cart,
      subtotal,
      shipping,
      total,
      address,
    })
    onComplete()
    setSheet(false)
    setCard(emptyCard)
    setCashtag('')
    setZelleId('')
    window.scrollTo(0, 0)
  }

  if (order) {
    return (
      <main className="co">
        <div className="co-done">
          <div className="check" aria-hidden="true" />
          <p className="eyebrow">Order confirmed</p>
          <h1>Thank you, {order.name.split(' ')[0]}.</h1>
          <p className="lede">
            Order <strong>{order.id}</strong> is confirmed. A receipt is on its way to <strong>{order.email}</strong>.
          </p>
          <div className="co-receipt">
            <Summary items={order.items} subtotal={order.subtotal} shipping={order.shipping} total={order.total} />
            <p className="note">
              Paid with {order.method} · Shipping to {order.address.line}, {order.address.city}, {order.address.country}
            </p>
          </div>
          <Link className="btn btn-dark" to="/collection">Continue shopping</Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="section">
        <div className="empty-state">
          <p className="eyebrow">Checkout</p>
          <h2>Your bag is empty.</h2>
          <p>Add a pair or two and come back.</p>
          <Link className="btn btn-dark" to="/collection">Shop the collection</Link>
        </div>
      </main>
    )
  }

  const panel = {
    card: (
      <div className="co-fields">
        <label className="co-field full">Card number
          <input required inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" pattern="[0-9 ]{13,23}" value={card.number} onChange={(e) => setCardField('number', e.target.value)} />
        </label>
        <label className="co-field full">Name on card
          <input required autoComplete="cc-name" value={card.name} onChange={(e) => setCardField('name', e.target.value)} />
        </label>
        <label className="co-field">Expiry
          <input required inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" pattern="[0-9]{2} / [0-9]{2}" value={card.exp} onChange={(e) => setCardField('exp', e.target.value)} />
        </label>
        <label className="co-field">Security code
          <input required inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" pattern="[0-9]{3,4}" value={card.cvc} onChange={(e) => setCardField('cvc', e.target.value)} />
        </label>
      </div>
    ),
    'apple-pay': <p>After you continue, confirm the payment with Face ID or Touch ID.</p>,
    'google-pay': <p>You’ll confirm the payment with the card saved in your Google Pay wallet.</p>,
    'cash-app': (
      <label className="co-field">Your $Cashtag
        <input required placeholder="$yourname" pattern="\$?[A-Za-z][A-Za-z0-9_]{1,19}" value={cashtag} onChange={(e) => setCashtag(e.target.value)} />
      </label>
    ),
    zelle: (
      <label className="co-field">Zelle email or phone number
        <input required placeholder="name@email.com" value={zelleId} onChange={(e) => setZelleId(e.target.value)} />
      </label>
    ),
    paypal: <p>You’ll log in to PayPal to approve the payment, then come straight back here.</p>,
    paystack: <p>Pay with your card, bank transfer or USSD through Paystack’s checkout.</p>,
  }

  return (
    <main className="co">
      <h1>Checkout</h1>
      <div className="co-grid">
        <form className="co-form" onSubmit={submit}>
          <section>
            <h2>Contact</h2>
            <div className="co-fields">
              <label className="co-field">Full name
                <input required autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
              </label>
              <label className="co-field">Email
                <input required type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              </label>
            </div>
          </section>

          <section>
            <h2>Delivery</h2>
            <div className="co-fields">
              <label className="co-field full">Country
                <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}>
                  {countries.map((name) => <option key={name}>{name}</option>)}
                </select>
              </label>
              <label className="co-field full">Address
                <input required autoComplete="street-address" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} />
              </label>
              <label className="co-field">City
                <input required autoComplete="address-level2" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </label>
              <label className="co-field">Postcode
                <input required autoComplete="postal-code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
              </label>
            </div>
          </section>

          <section>
            <h2>Payment</h2>
            <div className="method-tiles" role="radiogroup" aria-label="Payment method">
              {methods.map((item) => (
                <label key={item.id} className={`method-tile ${method === item.id ? 'active' : ''}`} title={item.label}>
                  <input
                    className="sr-only"
                    type="radio"
                    name="payment"
                    aria-label={item.label}
                    checked={method === item.id}
                    onChange={() => setMethod(item.id)}
                  />
                  <PayLogo id={item.id} />
                </label>
              ))}
            </div>
            <div className="method-panel">{panel[method]}</div>
            <button type="submit" className={`btn btn-lg btn-block pay-btn ${method === 'card' ? 'btn-dark' : `pay-${method}`}`}>
              {payLabel(method, total)}
            </button>
          </section>
        </form>

        <Summary items={cart} subtotal={subtotal} shipping={shipping} total={total} />
      </div>

      {sheet && <PaymentSheet method={method} total={total} onDone={finish} onCancel={() => setSheet(false)} />}
    </main>
  )
}
