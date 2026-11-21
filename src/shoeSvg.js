// A stand-alone vector sneaker (side view, toe to the right). Every colour comes from the product palette,
// so one drawing covers all six pairs. Transparent background, no box.
export function shoeMarkup(p, u = 's') {
  const id = (n) => `${u}-${n}`
  return `
<defs>
  <linearGradient id="${id('up')}" x1="0.1" y1="0" x2="0.7" y2="1">
    <stop offset="0" stop-color="${p.light}"/><stop offset="0.55" stop-color="${p.upper}"/><stop offset="1" stop-color="${p.shade}"/>
  </linearGradient>
  <linearGradient id="${id('so')}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${p.sole}"/><stop offset="1" stop-color="${p.soleShade}"/>
  </linearGradient>
  <radialGradient id="${id('sh')}" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#000" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse cx="470" cy="478" rx="380" ry="26" fill="url(#${id('sh')})"/>
<path d="M88 350C78 362 80 396 98 414C112 428 142 436 184 436L742 436C802 436 846 412 852 372C854 356 846 346 830 342L790 332C700 348 560 352 470 348C360 344 240 346 150 338C118 335 98 340 88 350Z" fill="url(#${id('so')})"/>
<path d="M100 410C114 426 144 434 186 434L742 434C800 434 842 410 850 374C846 396 806 420 742 422L186 422C146 422 116 418 100 410Z" fill="#000" opacity="0.14"/>
<path d="M120 372C300 384 560 384 800 366" fill="none" stroke="#000" stroke-opacity="0.08" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
<path d="M92 346C84 300 86 232 106 180C112 162 128 152 148 154C192 162 234 178 272 178C302 178 324 152 348 126C360 114 380 112 390 122C402 134 412 152 426 166C474 214 544 252 640 272C730 290 806 300 838 336C846 348 840 362 824 364C700 352 560 354 470 350C360 346 240 348 150 342C120 340 104 344 92 346Z" fill="url(#${id('up')})"/>
<path d="M92 346C84 300 86 238 106 186C112 174 124 168 138 170C152 222 158 292 170 342C140 340 108 344 92 346Z" fill="${p.shade}" opacity="0.85"/>
<path d="M640 272C730 290 806 300 838 336C846 348 840 362 824 364L700 356C710 326 692 292 640 272Z" fill="${p.shade}" opacity="0.55"/>
<path d="M246 304C330 280 436 272 524 304C566 318 606 326 650 330L650 342C600 340 548 330 506 316C436 294 340 296 246 320Z" fill="${p.accent}"/>
<path d="M148 154C192 162 234 178 272 178L264 204C220 200 168 190 134 176C134 164 138 156 148 154Z" fill="${p.shade}" opacity="0.7"/>
<path d="M272 178C302 178 324 152 348 126C360 114 380 112 390 122C402 134 412 152 426 166L384 196C340 196 300 194 272 178Z" fill="${p.light}" opacity="0.95"/>
<path d="M330 178C392 214 470 258 560 292" fill="none" stroke="${p.shade}" stroke-opacity="0.55" stroke-width="44" stroke-linecap="round"/>
<g stroke="${p.lace}" stroke-width="12" stroke-linecap="round">
  <path d="M352 150L330 196"/><path d="M394 176L372 222"/><path d="M436 202L414 248"/><path d="M478 228L456 274"/><path d="M520 254L498 300"/>
</g>
<g fill="${p.shade}" opacity="0.9"><circle cx="330" cy="196" r="4"/><circle cx="372" cy="222" r="4"/><circle cx="414" cy="248" r="4"/><circle cx="456" cy="274" r="4"/><circle cx="498" cy="300" r="4"/></g>
<path d="M118 190C130 250 140 300 150 336" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="4 6"/>
<path d="M700 354C706 330 694 300 646 280" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="4 6"/>
<path d="M150 154C200 164 236 180 272 180C312 180 338 140 358 126" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`
}
