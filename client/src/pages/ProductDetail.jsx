import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ChevronRight, FlaskConical, Package, ShieldCheck, Star, ArrowLeft } from 'lucide-react'
import { getProductById, getProductsByCategory } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ui/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(product?.defaultSize || '')
  const [qty, setQty]     = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-accent text-xl tracking-widest text-apex-dark">Product Not Found</p>
        <Link to="/products" className="btn-gold text-sm">Back to Products</Link>
      </div>
    )
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  function handleAddToCart() {
    addToCart(product, selectedSize, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-apex-border bg-apex-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-body text-apex-muted">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
            <ChevronRight size={12} />
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gold transition-colors">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-apex-dark font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {product.popular && (
              <div className="absolute top-4 left-4 bg-gold text-white font-accent text-xs tracking-widest px-3 py-1">
                BEST SELLER
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="font-accent text-xs font-semibold tracking-widest uppercase text-gold">
              {product.category}
            </span>
            <h1 className="font-display text-5xl text-apex-dark tracking-wider mt-2 mb-1">
              {product.name}
            </h1>
            <p className="text-apex-muted font-body text-sm mb-4">{product.fullName}</p>

            {/* Purity / form badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: FlaskConical, text: `Purity ${product.purity}` },
                { icon: Package,      text: product.form },
                { icon: ShieldCheck,  text: 'COA Included' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 bg-apex-light border border-apex-border text-apex-gray font-body text-xs px-3 py-1.5">
                  <Icon size={11} className="text-gold" /> {text}
                </span>
              ))}
            </div>

            <p className="font-body text-apex-gray leading-relaxed text-sm mb-6">
              {product.description}
            </p>

            {/* Benefits */}
            {product.benefits && (
              <div className="mb-6">
                <p className="font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-3">
                  Research Benefits
                </p>
                <ul className="space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm font-body text-apex-gray">
                      <span className="text-gold shrink-0">✦</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stack includes */}
            {product.includes && (
              <div className="bg-apex-light border border-apex-border p-4 mb-6">
                <p className="font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-2">
                  Stack Includes
                </p>
                <ul className="space-y-1">
                  {product.includes.map((item) => (
                    <li key={item} className="text-sm font-body text-apex-gray flex items-center gap-2">
                      <span className="text-gold">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size selector */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-3">
                  Size
                </p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-5 py-2 border font-accent text-sm font-semibold tracking-wider transition-colors ${
                        selectedSize === s
                          ? 'border-gold bg-gold text-white'
                          : 'border-apex-border text-apex-gray hover:border-gold'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex border border-apex-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-apex-gray hover:text-apex-dark transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="w-12 h-11 flex items-center justify-center font-accent font-bold text-apex-dark border-x border-apex-border">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-11 flex items-center justify-center text-apex-gray hover:text-apex-dark transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
              <span className="font-display text-3xl text-apex-dark tracking-wider">
                ${(product.price * qty).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn-gold w-full flex items-center justify-center gap-2 py-4 text-sm mb-3 ${
                added ? 'bg-green-600 hover:bg-green-600' : ''
              }`}
            >
              <ShoppingCart size={16} />
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link to="/cart" className="btn-outline-gold w-full text-center block py-3 text-sm">
              View Cart
            </Link>

            {/* Research disclaimer */}
            <p className="text-xs text-apex-muted font-body mt-4 p-3 bg-apex-light border-l-2 border-gold/30">
              ⚠ For laboratory and research use only. Not for human consumption.
              {product.usage && ` ${product.usage}`}
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-2">More in {product.category}</h2>
            <div className="gold-divider mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
