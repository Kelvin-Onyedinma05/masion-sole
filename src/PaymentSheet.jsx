import { useEffect, useState } from 'react'
import PayLogo from './PayLogo.jsx'
import { money } from './utils.js'

const flows = {
  card: { title: 'Card payment', head: '#14110f', steps: ['Securing your payment', 'Contacting your bank', 'Payment approved'] },
  'apple-pay': { title: 'Apple Pay', head: '#000', confirm: true, steps: ['Authenticating', 'Sending payment', 'Payment approved'] },
  'google-pay': { title: 'Google Pay', head: '#f1f3f4', light: true, confirm: true, steps: ['Verifying your card', 'Sending payment', 'Payment approved'] },
  'cash-app': { title: 'Cash App Pay', head: '#00d64f', dark: true, steps: ['Opening Cash App', 'Waiting for your confirmation', 'Payment approved'] },
  zelle: { title: 'Zelle', head: '#6d1ed4', steps: ['Contacting your bank', 'Verifying the transfer', 'Payment received'] },
  paypal: { title: 'PayPal', head: '#003087', steps: ['Connecting to PayPal', 'Approving payment', 'Payment approved'] },
  paystack: { title: 'Paystack', head: '#011b33', steps: ['Starting your session', 'Authorising payment', 'Payment successful'] },
}

// Walks through a payment: wallets ask for a confirm tap first, the rest start straight away.
export default function PaymentSheet({ method, total, onDone, onCancel }) {
  const flow = flows[method]
  const last = flow.steps.length - 1
  const [started, setStarted] = useState(!flow.confirm)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onCancel])

  useEffect(() => {
    if (!started) return undefined
    const timer = setTimeout(() => (step < last ? setStep(step + 1) : onDone()), 1000)
    return () => clearTimeout(timer)
  }, [started, step])

  const color = flow.light || flow.dark ? '#14110f' : '#fff'

  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label={`${flow.title} payment`}>
      <div className="sheet">
        <div className="sheet-head" style={{ background: flow.head, color }}>
          <PayLogo id={method} />
          <span>{flow.title}</span>
          <button type="button" onClick={onCancel} aria-label="Cancel payment">✕</button>
        </div>
        <div className="sheet-body">
          <p className="sheet-merchant">Maison Sole</p>
          <p className="sheet-amount">{money(total)}</p>

          {!started ? (
            <>
              <div className="sheet-card"><span>Visa •••• 4242</span><span>Default</span></div>
              <button type="button" className="btn btn-dark btn-block" onClick={() => setStarted(true)}>
                {method === 'apple-pay' ? 'Pay with Touch ID' : 'Continue'}
              </button>
            </>
          ) : (
            <ul className="sheet-steps">
              {flow.steps.map((label, i) => (
                <li key={label} className={i < step || (i === step && i === last) ? 'done' : i === step ? 'active' : ''}>
                  <span className="dot" />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
