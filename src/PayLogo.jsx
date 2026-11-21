import { useState } from 'react'

// Tries /payment/<id>.svg first so official logos can be dropped in. Falls back to a drawn badge.
const missing = new Set()
const font = { fontFamily: 'Inter, Arial, sans-serif' }

const drawn = {
  card: (
    <>
      <rect width="64" height="40" rx="6" fill="#fff" stroke="#d9d4cc" />
      <text x="6" y="24" fill="#1a1f71" fontSize="11" fontWeight="800" fontStyle="italic" style={font}>VISA</text>
      <circle cx="44" cy="20" r="7" fill="#eb001b" />
      <circle cx="52" cy="20" r="7" fill="#f79e1b" fillOpacity="0.92" />
    </>
  ),
  'apple-pay': (
    <>
      <rect width="64" height="40" rx="6" fill="#000" />
      <text x="32" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" style={font}>Apple Pay</text>
    </>
  ),
  'google-pay': (
    <>
      <rect width="64" height="40" rx="6" fill="#fff" stroke="#d9d4cc" />
      <text x="32" y="26" textAnchor="middle" fontSize="15" fontWeight="600" style={font}>
        <tspan fill="#4285f4">G</tspan><tspan fill="#5f6368"> Pay</tspan>
      </text>
    </>
  ),
  'cash-app': (
    <>
      <rect width="64" height="40" rx="6" fill="#00d64f" />
      <text x="32" y="29" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700" style={font}>$</text>
    </>
  ),
  zelle: (
    <>
      <rect width="64" height="40" rx="6" fill="#6d1ed4" />
      <text x="32" y="25" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" style={font}>Zelle</text>
    </>
  ),
  paypal: (
    <>
      <rect width="64" height="40" rx="6" fill="#fff" stroke="#d9d4cc" />
      <text x="32" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fontStyle="italic" style={font}>
        <tspan fill="#003087">Pay</tspan><tspan fill="#009cde">Pal</tspan>
      </text>
    </>
  ),
  paystack: (
    <>
      <rect width="64" height="40" rx="6" fill="#fff" stroke="#d9d4cc" />
      <rect x="7" y="13" width="9" height="3" rx="1.5" fill="#0ba4db" />
      <rect x="7" y="19" width="9" height="3" rx="1.5" fill="#0ba4db" />
      <rect x="7" y="25" width="9" height="3" rx="1.5" fill="#0ba4db" />
      <text x="20" y="25" fill="#011b33" fontSize="9.5" fontWeight="700" style={font}>paystack</text>
    </>
  ),
}

export default function PayLogo({ id }) {
  const [failed, setFailed] = useState(missing.has(id))

  if (!failed) {
    return (
      <img
        className="pay-logo"
        src={`/payment/${id}.svg`}
        alt=""
        onError={() => { missing.add(id); setFailed(true) }}
      />
    )
  }
  return (
    <svg className="pay-logo" viewBox="0 0 64 40" aria-hidden="true">{drawn[id]}</svg>
  )
}
