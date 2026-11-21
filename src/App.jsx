import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home.jsx'
import ProductPage from './ProductPage.jsx'

import ApproachPage from './ApproachPage.jsx'
import CheckoutPage from './CheckoutPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import Header from './Header.jsx'
import ServicePage from './ServicePage.jsx'
import Shoe from './Shoe.jsx'
import { money } from './utils.js'

// Scrolls to #sections on route changes, or back to the top on a new page.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.qty * item.price, 0), [cart])
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 12
  const total = subtotal + shipping

  const addToCart = (product) => {
    const key = `${product.id}-${product.selectedSize || 'one'}`
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, qty: item.qty + 1 } : item))
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          palette: product.palette,
          image: product.image,
          size: product.selectedSize || null,
          qty: 1,
        },
      ]
    })
    setCartOpen(true)
  }

  const changeQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (key) => setCart((prev) => prev.filter((item) => item.key !== key))

  return (
    <div className="shell">
      <ScrollManager />
      <Header itemCount={itemCount} onOpenCart={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/collection" element={<CollectionPage onAdd={addToCart} />} />
        <Route path="/our-approach" element={<ApproachPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} subtotal={subtotal} shipping={shipping} total={total} onComplete={() => setCart([])} />} />
        <Route path="/product/:id" element={<ProductPage onAdd={addToCart} />} />
        <Route
          path="*"
          element={
            <main className="section">
              <div className="empty-state">
                <p className="eyebrow">404</p>
                <h2>This page has walked off.</h2>
                <Link className="btn btn-dark" to="/">Back to the shop</Link>
              </div>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <div className="footer-brand">
          <Link to="/" className="logo">Maison Sole</Link>
          <p>Considered footwear, made in small runs and built to be worn.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <Link to="/collection">All shoes</Link>
            <Link to="/product/aurora-weave">Bestsellers</Link>
            <Link to="/collection?category=Limited">Limited</Link>
          </div>
          <div>
            <h4>Help</h4>
            <Link to="/service#shipping">Shipping</Link>
            <Link to="/service#returns">Returns</Link>
            <Link to="/service#size-guide">Size guide</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/our-approach">Our approach</Link>
            <Link to="/our-approach#materials">Materials</Link>
            <Link to="/service#contact">Contact</Link>
          </div>
        </div>
        <p className="fine">© {new Date().getFullYear()} Maison Sole. Demo storefront — no real payments are processed.</p>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart" onClick={(event) => event.stopPropagation()}>
            <div className="cart-head">
              <h2>Your bag ({itemCount})</h2>
              <button className="close-btn" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your bag is empty.</p>
                <button className="btn btn-dark btn-block" onClick={() => setCartOpen(false)}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.key} className="cart-item">
                      <Shoe className="cart-shoe" palette={item.palette} image={item.image} label={item.name} />
                      <div className="cart-item-info">
                        <div className="cart-item-top">
                          <h3>{item.name}</h3>
                          <span>{money(item.price * item.qty)}</span>
                        </div>
                        <p>{item.size ? `EU ${item.size}` : 'One size'}</p>
                        <div className="cart-item-controls">
                          <div className="qty">
                            <button onClick={() => changeQty(item.key, -1)} aria-label="Decrease quantity">−</button>
                            <span>{item.qty}</span>
                            <button onClick={() => changeQty(item.key, 1)} aria-label="Increase quantity">+</button>
                          </div>
                          <button className="text-link" onClick={() => removeItem(item.key)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-totals">
                  <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <div><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
                  <div className="cart-total"><span>Total</span><span>{money(total)}</span></div>
                </div>

                <Link className="btn btn-dark btn-block" to="/checkout" onClick={() => setCartOpen(false)}>Checkout</Link>
                <button className="text-link center" onClick={() => setCartOpen(false)}>Continue shopping</button>
              </>
            )}
          </aside>
        </div>
      )}

    </div>
  )
}
