import { useState, useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'
import { products as defaultProducts } from '../data/products'
import {
  Lock, LayoutDashboard, Package, ShoppingBag, Tag, Users,
  LogOut, Plus, Edit2, Trash2, Check, X, Eye, EyeOff,
} from 'lucide-react'

// ── Login screen ───────────────────────────────────────────────────
function AdminLogin() {
  const { login, authError } = useAdmin()
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await login(password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-apex-dark flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-10 border-t-4 border-gold shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 border-2 border-gold flex items-center justify-center text-gold mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h1 className="font-display text-4xl tracking-widest text-apex-dark">ADMIN</h1>
          <p className="text-apex-muted font-body text-sm mt-1">APEX PEPTIDES Control Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="input-field pr-10"
              required
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-apex-muted"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {authError && <p className="text-red-500 text-xs font-body">{authError}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full py-3 disabled:opacity-60">
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Shared table components ────────────────────────────────────────
function Badge({ children, color = 'gold' }) {
  const cls = color === 'green' ? 'bg-green-100 text-green-700' : color === 'red' ? 'bg-red-100 text-red-600' : 'bg-gold/10 text-gold-700'
  return <span className={`inline-block px-2.5 py-0.5 text-[10px] font-accent font-bold tracking-widest uppercase ${cls}`}>{children}</span>
}

// ── Products tab ───────────────────────────────────────────────────
function ProductsTab() {
  const [list, setList]     = useState(defaultProducts)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const EMPTY = { id: '', name: '', fullName: '', category: 'Recovery & Healing', price: '', sizes: '5mg', defaultSize: '5mg', purity: '99%+', form: 'Lyophilized Powder', inStock: true, featured: false, popular: false, image: '', shortDesc: '', description: '' }
  const [draft, setDraft]   = useState(EMPTY)

  function startEdit(p) { setDraft({ ...p, sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes }); setEditing(p.id); setAdding(false) }
  function startAdd()   { setDraft(EMPTY); setAdding(true); setEditing(null) }
  function cancel()     { setEditing(null); setAdding(false) }
  function save() {
    const product = { ...draft, price: parseFloat(draft.price), sizes: draft.sizes.split(',').map((s) => s.trim()), id: draft.id || draft.name.toLowerCase().replace(/\s+/g,'-') }
    if (adding) setList((l) => [...l, product])
    else setList((l) => l.map((p) => p.id === editing ? product : p))
    cancel()
  }
  function remove(id) { if (confirm('Remove this product?')) setList((l) => l.filter((p) => p.id !== id)) }

  const showForm = editing || adding
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark">Products ({list.length})</h2>
        <button onClick={startAdd} className="btn-gold text-xs py-2 px-4 flex items-center gap-1.5"><Plus size={13} /> Add Product</button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6 border-l-4 border-gold">
          <h3 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-4">
            {adding ? 'New Product' : `Editing: ${draft.name}`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              ['id', 'ID / Slug'],['name','Name'],['fullName','Full Name'],['category','Category'],
              ['price','Price'],['sizes','Sizes (comma-sep)'],['defaultSize','Default Size'],
              ['purity','Purity'],['form','Form'],['image','Image URL'],['shortDesc','Short Description'],
            ].map(([key, lbl]) => (
              <div key={key} className={key === 'shortDesc' || key === 'image' ? 'sm:col-span-2' : ''}>
                <label className="block font-accent text-[10px] font-bold tracking-widest uppercase text-apex-muted mb-1">{lbl}</label>
                <input
                  type={key === 'price' ? 'number' : 'text'}
                  step="0.01"
                  value={draft[key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                  className="input-field text-xs py-2"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block font-accent text-[10px] font-bold tracking-widest uppercase text-apex-muted mb-1">Description</label>
              <textarea
                rows={3}
                value={draft.description ?? ''}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                className="input-field text-xs py-2 resize-none"
              />
            </div>
            <div className="flex gap-6 items-center">
              {['inStock','featured','popular'].map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!draft[key]} onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.checked }))} className="accent-gold" />
                  <span className="font-accent text-xs font-semibold tracking-wider capitalize text-apex-dark">{key}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="btn-gold text-xs py-2 px-5 flex items-center gap-1.5"><Check size={13} /> Save</button>
            <button onClick={cancel} className="btn-outline-gold text-xs py-2 px-5 flex items-center gap-1.5"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-body border-collapse">
          <thead>
            <tr className="bg-apex-dark text-white">
              {['Product','Category','Price','Stock','Featured',''].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-accent tracking-widest uppercase text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={p.id} className={`border-b border-apex-border ${i % 2 === 0 ? 'bg-white' : 'bg-apex-light/40'} hover:bg-gold/5 transition-colors`}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-apex-dark">{p.name}</div>
                  <div className="text-apex-muted">{p.id}</div>
                </td>
                <td className="px-4 py-3 text-apex-muted">{p.category}</td>
                <td className="px-4 py-3 font-bold text-apex-dark">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-3"><Badge color={p.inStock ? 'green' : 'red'}>{p.inStock ? 'In Stock' : 'OOS'}</Badge></td>
                <td className="px-4 py-3"><Badge color={p.featured ? 'gold' : ''}>{p.featured ? 'Yes' : '—'}</Badge></td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => startEdit(p)} className="p-1.5 text-apex-muted hover:text-gold transition-colors"><Edit2 size={13} /></button>
                  <button onClick={() => remove(p.id)} className="p-1.5 text-apex-muted hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Orders tab (demo) ─────────────────────────────────────────────
const DEMO_ORDERS = [
  { id: 'APEX-A1B2C3', customer: 'John Smith', email: 'john@lab.com', total: 214.97, method: 'crypto', status: 'Pending', date: '2024-12-10' },
  { id: 'APEX-D4E5F6', customer: 'Dr. Sarah Lee', email: 'sarah@university.edu', total: 349.98, method: 'manual', status: 'Processing', date: '2024-12-09' },
  { id: 'APEX-G7H8I9', customer: 'Marcus T.', email: 'marcus@research.org', total: 109.99, method: 'crypto', status: 'Shipped', date: '2024-12-08' },
  { id: 'APEX-J0K1L2', customer: 'Alex P.', email: 'alex@gmail.com', total: 534.96, method: 'crypto', status: 'Delivered', date: '2024-12-07' },
]

const STATUS_COLORS = { Pending: 'gold', Processing: 'gold', Shipped: 'green', Delivered: 'green', Cancelled: 'red' }

function OrdersTab() {
  const [orders, setOrders] = useState(DEMO_ORDERS)
  function setStatus(id, status) {
    setOrders((o) => o.map((ord) => ord.id === id ? { ...ord, status } : ord))
  }
  return (
    <div>
      <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5">
        Orders ({orders.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-body border-collapse">
          <thead>
            <tr className="bg-apex-dark text-white">
              {['Order ID','Customer','Total','Payment','Status','Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-accent tracking-widest uppercase text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} className={`border-b border-apex-border ${i % 2 === 0 ? 'bg-white' : 'bg-apex-light/40'}`}>
                <td className="px-4 py-3 font-mono text-apex-dark font-semibold">{o.id}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-apex-dark">{o.customer}</div>
                  <div className="text-apex-muted">{o.email}</div>
                </td>
                <td className="px-4 py-3 font-bold text-apex-dark">${o.total.toFixed(2)}</td>
                <td className="px-4 py-3 capitalize text-apex-gray">{o.method}</td>
                <td className="px-4 py-3"><Badge color={STATUS_COLORS[o.status] || 'gold'}>{o.status}</Badge></td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o.id, e.target.value)}
                    className="border border-apex-border text-xs px-2 py-1 text-apex-dark focus:outline-none focus:border-gold cursor-pointer"
                  >
                    {['Pending','Processing','Shipped','Delivered','Cancelled'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Discounts tab ─────────────────────────────────────────────────
function DiscountsTab() {
  const AUTO_TIERS = [
    { threshold: 500, percent: 15 },
    { threshold: 300, percent: 10 },
    { threshold: 150, percent: 5 },
  ]
  const [codes, setCodes] = useState([
    { code: 'APEX10', percent: 10, uses: 0, active: true },
    { code: 'APEX15', percent: 15, uses: 0, active: true },
    { code: 'RESEARCH5', percent: 5, uses: 0, active: true },
  ])
  const [newCode, setNewCode] = useState({ code: '', percent: '' })
  function addCode() {
    if (!newCode.code || !newCode.percent) return
    setCodes((c) => [...c, { code: newCode.code.toUpperCase(), percent: parseInt(newCode.percent), uses: 0, active: true }])
    setNewCode({ code: '', percent: '' })
  }
  function toggle(code) {
    setCodes((c) => c.map((d) => d.code === code ? { ...d, active: !d.active } : d))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-4">Automatic Tiers</h2>
        <div className="card overflow-hidden">
          {AUTO_TIERS.map((t) => (
            <div key={t.threshold} className="flex items-center justify-between px-5 py-3 border-b border-apex-border last:border-b-0">
              <span className="font-body text-sm text-apex-gray">Spend <strong>${t.threshold}+</strong></span>
              <Badge color="gold">{t.percent}% off</Badge>
            </div>
          ))}
        </div>
        <p className="text-xs text-apex-muted font-body mt-2">Tiers apply automatically — no code needed.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark">Promo Codes</h2>
          <div className="flex gap-2">
            <input type="text" placeholder="CODE" value={newCode.code} onChange={(e) => setNewCode((n) => ({ ...n, code: e.target.value }))} className="input-field w-28 text-xs py-1.5" />
            <input type="number" placeholder="%" value={newCode.percent} onChange={(e) => setNewCode((n) => ({ ...n, percent: e.target.value }))} className="input-field w-16 text-xs py-1.5" />
            <button onClick={addCode} className="btn-gold text-xs py-1.5 px-4 flex items-center gap-1"><Plus size={12} /> Add</button>
          </div>
        </div>
        <div className="card overflow-hidden">
          {codes.map((d) => (
            <div key={d.code} className="flex items-center justify-between px-5 py-3 border-b border-apex-border last:border-b-0">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-apex-dark">{d.code}</span>
                <Badge color="gold">{d.percent}% off</Badge>
                <span className="text-xs text-apex-muted">{d.uses} uses</span>
              </div>
              <button onClick={() => toggle(d.code)} className={`font-accent text-xs font-semibold tracking-widest uppercase ${d.active ? 'text-green-600' : 'text-red-500'}`}>
                {d.active ? 'Active' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Subscribers tab ───────────────────────────────────────────────
const DEMO_SUBS = [
  { email: 'researcher@lab.com', date: '2024-12-10', code: 'APEX10' },
  { email: 'drsmith@university.edu', date: '2024-12-09', code: 'APEX10' },
  { email: 'marcus@perf.org', date: '2024-12-08', code: 'APEX10' },
]

function SubscribersTab() {
  return (
    <div>
      <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-apex-dark mb-5">
        Subscribers ({DEMO_SUBS.length})
      </h2>
      <div className="card overflow-hidden">
        <table className="w-full text-xs font-body border-collapse">
          <thead>
            <tr className="bg-apex-dark text-white">
              {['Email','Subscribed','Code Sent'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 font-accent tracking-widest uppercase text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_SUBS.map((s, i) => (
              <tr key={s.email} className={`border-b border-apex-border ${i % 2 === 0 ? 'bg-white' : 'bg-apex-light/40'}`}>
                <td className="px-4 py-3 text-apex-dark font-semibold">{s.email}</td>
                <td className="px-4 py-3 text-apex-muted">{s.date}</td>
                <td className="px-4 py-3"><span className="font-mono text-gold font-bold">{s.code}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────
const TABS = [
  { id: 'products',    label: 'Products',    icon: Package },
  { id: 'orders',      label: 'Orders',      icon: ShoppingBag },
  { id: 'discounts',   label: 'Discounts',   icon: Tag },
  { id: 'subscribers', label: 'Subscribers', icon: Users },
]

function AdminDashboard() {
  const { logout } = useAdmin()
  const [tab, setTab] = useState('products')

  return (
    <div className="min-h-screen bg-apex-light">
      {/* Top bar */}
      <header className="bg-apex-dark border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} className="text-gold" />
            <span className="font-display text-xl tracking-widest text-white">APEX</span>
            <span className="font-accent text-xs text-white/40 tracking-widest">ADMIN</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-accent font-semibold tracking-widest uppercase transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 border font-accent text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition-all ${
                tab === id ? 'border-gold bg-gold text-white' : 'border-apex-border bg-white text-apex-gray hover:border-gold'
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="card p-6">
          {tab === 'products'    && <ProductsTab />}
          {tab === 'orders'      && <OrdersTab />}
          {tab === 'discounts'   && <DiscountsTab />}
          {tab === 'subscribers' && <SubscribersTab />}
        </div>
      </div>
    </div>
  )
}

// ── Route entry point ─────────────────────────────────────────────
export default function Admin() {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
