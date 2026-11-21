# Maison Sole — Premium Shoe Storefront

A clean, modern e-commerce storefront for a premium footwear brand. Built with React + Vite.

## Features

- Full-bleed colour hero with a floating shoe you can switch between pairs, plus collection grid, brand story, and newsletter
- Product detail pages with image gallery, colour, EU size selector, and product details
- Slide-in shopping bag with quantity controls and totals
- Checkout form with validation and order confirmation (demo only, no payment is processed)
- Pointer-driven 3D tilt, glare and parallax on the hero, product tiles and product page (CSS + a small React component, no WebGL)
- Motion switches off for touch devices and for people who prefer reduced motion
- Responsive layout down to mobile

## Stack

- React 18
- React Router 6
- Vite 5
- Plain CSS (no UI framework)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3002.

## Build

```bash
npm run build
npm run preview
```

Build output is written to `dist/`.

## Project structure

```
index.html            HTML entry point (fonts, root div)
vite.config.js        Vite + React configuration
package.json          Dependencies and scripts
src/main.jsx          React root, router setup
src/App.jsx           App shell: header, routes, cart drawer, checkout
src/Home.jsx          Home page
src/ProductPage.jsx   Product detail page
src/CheckoutPage.jsx  /checkout (payment picker, simulated payments)
src/PaymentSheet.jsx  The payment confirmation sheet
src/PayLogo.jsx       Payment logos (drop official SVGs in public/payment/)
src/CollectionPage.jsx  /collection (filter + sort)
src/ApproachPage.jsx  /our-approach
src/ServicePage.jsx   /service (shipping, returns, size guide, FAQ, contact)
src/PageHero.jsx      Shared page title band
src/ProductCard.jsx   Shared product tile
src/Header.jsx        Announcement bar, header and mobile menu
src/SearchOverlay.jsx Search panel (click Search, or press / or Ctrl/Cmd+K)
src/Tilt.jsx          3D tilt wrapper
src/Shoe.jsx          Sneaker illustration component
src/shoeSvg.js        Sneaker drawing, driven by a colour palette
src/utils.js          Shared helpers (money)
src/products.js       Product catalog (name, price, copy, images)
src/styles.css        All styling and responsive rules
```

## Notes

- Shoes are vector illustrations (`src/shoeSvg.js`) coloured from each product's `palette` in `src/products.js`, so there are no image files to load.
- To use a real photo, put a transparent PNG in `public/shoes/` and add `image: '/shoes/name.png'` to the product. The site draws its own shadow under it.
- `hero: true` puts a pair in the home hero. Products without it appear in the collection only (they still need `tint`, and `palette` only if they have no image).
- Checkout is simulated on the client. Connect a payment provider before going live.
