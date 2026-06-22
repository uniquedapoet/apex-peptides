import { Link } from 'react-router-dom'
import { ShoppingCart, FlaskConical } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block overflow-hidden aspect-square bg-apex-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-apex-dark text-white font-accent text-xs tracking-widest px-4 py-1">
              OUT OF STOCK
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span className="font-accent text-[10px] font-semibold tracking-widest uppercase text-gold mb-2">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-accent font-bold text-apex-dark text-base leading-snug hover:text-gold transition-colors mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-apex-muted font-body mb-3 line-clamp-2">
            {product.shortDesc}
          </p>
        </Link>

        {/* Purity */}
        <div className="flex items-center gap-1.5 mb-4">
          <FlaskConical size={12} className="text-gold" />
          <span className="text-xs text-apex-gray font-body">
            Purity {product.purity} · {product.form}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-accent font-bold text-xl text-apex-dark">
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product, product.defaultSize)}
            className="btn-gold text-xs py-2 px-4 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
