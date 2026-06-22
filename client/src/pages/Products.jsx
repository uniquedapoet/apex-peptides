import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { products, CATEGORIES } from '../data/products'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'All'

  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState(initialCat)
  const [sortBy, setSortBy]     = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = products

    if (category && category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fullName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'popular')    list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))

    return list
  }, [category, search, sortBy])

  function handleCategory(cat) {
    setCategory(cat)
    if (cat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-apex-dark py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gold" />
        </div>
        <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
          Research Grade
        </span>
        <h1 className="font-display text-5xl md:text-6xl text-white tracking-widest mt-2">
          ALL PRODUCTS
        </h1>
        <p className="text-white/50 font-body text-sm mt-3 max-w-md mx-auto">
          {products.length} peptides available · Third-party tested · 99%+ purity
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-apex-muted" />
            <input
              type="text"
              placeholder="Search peptides…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-apex-muted hover:text-apex-dark"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field sm:w-48 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="sm:hidden btn-outline-gold flex items-center gap-2 justify-center py-3"
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Category sidebar — desktop always visible, mobile toggle */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } sm:block w-full sm:w-48 shrink-0`}
          >
            <p className="font-accent text-xs font-bold tracking-widest uppercase text-apex-dark mb-4">
              Category
            </p>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategory(cat)}
                    className={`w-full text-left font-body text-sm py-2 px-3 transition-colors ${
                      category === cat
                        ? 'bg-gold/10 text-gold font-semibold border-l-2 border-gold'
                        : 'text-apex-gray hover:text-apex-dark hover:bg-apex-light'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-apex-muted">
                <p className="font-accent text-lg tracking-widest">No products found</p>
                <button
                  onClick={() => { setSearch(''); handleCategory('All') }}
                  className="btn-outline-gold mt-6 text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-apex-muted font-body mb-5">
                  Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                  {category !== 'All' ? ` in ${category}` : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
