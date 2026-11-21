import { useId } from 'react'
import { shoeMarkup } from './shoeSvg.js'

// Shows a product photo cutout when the product has an `image`, otherwise the vector sneaker.
// The photo version gets its shadow from CSS, so it works with any transparent PNG.
export default function Shoe({ palette, image, className = '', label = '', priority = false }) {
  const uid = useId().replace(/:/g, '')

  if (image) {
    return (
      <span className={`shoe shoe-photo ${className}`}>
        <img src={image} alt={label} draggable="false" loading={priority ? 'eager' : 'lazy'} />
        <span className="shoe-shadow" aria-hidden="true" />
      </span>
    )
  }

  return (
    <svg
      className={`shoe ${className}`}
      viewBox="0 0 900 520"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: shoeMarkup(palette, uid) }}
    />
  )
}
