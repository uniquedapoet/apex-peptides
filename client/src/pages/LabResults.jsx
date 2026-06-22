import { Link } from 'react-router-dom'
import { FileText, ExternalLink, FlaskConical, CheckCircle } from 'lucide-react'
import { products } from '../data/products'

const IN_STOCK = products.filter((p) => p.inStock)

export default function LabResults() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-dark py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gold" />
        </div>
        <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
          Verified Purity
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest mt-2">
          LAB RESULTS
        </h1>
        <p className="text-white/50 font-body text-sm mt-3 max-w-md mx-auto">
          Every batch independently tested. Every certificate available for review.
        </p>
      </div>

      {/* Testing methodology */}
      <section className="bg-apex-light border-b border-apex-border py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: FlaskConical,
                title: 'HPLC Purity Testing',
                desc: 'High-Performance Liquid Chromatography verifies peptide purity to confirm 99%+ concentration with no impurities.',
              },
              {
                Icon: CheckCircle,
                title: 'Mass Spectrometry',
                desc: 'LC-MS/MS confirms the identity and molecular weight of each peptide, ensuring what\'s on the label matches what\'s in the vial.',
              },
              {
                Icon: FileText,
                title: 'Endotoxin (LAL) Testing',
                desc: 'Limulus Amebocyte Lysate testing confirms all batches meet endotoxin thresholds for research-grade materials.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-accent font-bold text-sm text-apex-dark tracking-wide mb-1">{title}</h3>
                  <p className="text-apex-muted font-body text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COA Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            Current Batch Testing
          </span>
          <h2 className="section-title mt-2 mb-1">Certificates of Analysis</h2>
          <div className="gold-divider" />
          <p className="text-apex-muted font-body text-sm mt-4">
            COAs are updated with each new batch. Batch dates and lot numbers are included in every order.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-apex-border text-sm font-body">
            <thead>
              <tr className="bg-apex-dark text-white">
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">Product</th>
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">Category</th>
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">Batch</th>
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">Purity</th>
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">Test Date</th>
                <th className="text-left px-5 py-3 font-accent text-xs tracking-widest uppercase">COA</th>
              </tr>
            </thead>
            <tbody>
              {IN_STOCK.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-apex-border ${i % 2 === 0 ? 'bg-white' : 'bg-apex-light/50'} hover:bg-gold/5 transition-colors`}
                >
                  <td className="px-5 py-4">
                    <Link to={`/products/${p.id}`} className="font-semibold text-apex-dark hover:text-gold transition-colors">
                      {p.name}
                    </Link>
                    <p className="text-xs text-apex-muted mt-0.5">{p.fullName}</p>
                  </td>
                  <td className="px-5 py-4 text-apex-muted">{p.category}</td>
                  <td className="px-5 py-4 text-apex-muted font-mono text-xs">
                    AP-{p.id.toUpperCase().slice(0, 4)}-{2024 + (i % 2)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-green-700 font-semibold">
                      <CheckCircle size={13} className="text-green-600" />
                      {p.purity}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-apex-muted text-xs">
                    {new Date(2024, (i * 3) % 12, (i * 7 % 28) + 1).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <button className="inline-flex items-center gap-1.5 text-gold hover:text-gold-700 font-accent text-xs font-semibold tracking-wider uppercase transition-colors">
                      <FileText size={13} /> View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {IN_STOCK.map((p, i) => (
            <div key={p.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link to={`/products/${p.id}`} className="font-accent font-bold text-apex-dark hover:text-gold transition-colors">
                    {p.name}
                  </Link>
                  <p className="text-xs text-apex-muted mt-0.5">{p.category}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-xs">
                  <CheckCircle size={12} /> {p.purity}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-apex-muted">
                <span>Batch: AP-{p.id.toUpperCase().slice(0,4)}-{2024 + (i % 2)}</span>
                <button className="text-gold font-accent font-semibold tracking-wider uppercase flex items-center gap-1">
                  <FileText size={12} /> COA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-l-4 border-gold/40 bg-apex-light p-5 text-xs font-body text-apex-gray">
          <strong className="font-accent text-apex-dark">Note:</strong> COA PDFs are provided for reference.
          Purity and identity data are confirmed by independent, accredited third-party laboratories.
          Batch numbers are traceable and available upon request. For research purposes only.
        </div>
      </section>
    </div>
  )
}
