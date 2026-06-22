import { Link } from 'react-router-dom'
import { FlaskConical, Award, Truck, Users } from 'lucide-react'

const STATS = [
  { value: '99%+',  label: 'Average Purity' },
  { value: '25+',   label: 'Peptides in Stock' },
  { value: '48hr',  label: 'Avg. Fulfillment' },
  { value: '100%',  label: 'Third-Party Tested' },
]

const VALUES = [
  {
    Icon: FlaskConical,
    title: 'Uncompromising Quality',
    desc: 'Every peptide we carry undergoes independent third-party testing before it reaches your door. We publish the Certificates of Analysis so you can verify purity yourself.',
  },
  {
    Icon: Award,
    title: 'Transparency First',
    desc: 'No proprietary blends, no hidden fillers. Every product listing includes full purity data, sourcing information, and storage requirements.',
  },
  {
    Icon: Truck,
    title: 'Reliable Fulfillment',
    desc: 'We understand research timelines. Orders placed before 2PM EST ship the same business day, packed with temperature-controlled materials.',
  },
  {
    Icon: Users,
    title: 'Research Community',
    desc: 'We exist to support the legitimate research community. Our team is available to answer technical questions and help you find the right compounds for your work.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-dark py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gold" />
        </div>
        <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
          Our Story
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest mt-2">
          ABOUT APEX
        </h1>
      </div>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
              Our Mission
            </span>
            <h2 className="section-title mt-2 mb-4">
              Raising the Bar<br />for Research<br />Peptides
            </h2>
            <div className="gold-divider" />
            <p className="text-apex-gray font-body leading-relaxed mt-6 mb-5">
              APEX PEPTIDES was founded with a single purpose: to provide researchers with
              the highest-quality peptides available — without the opacity and inconsistency
              that has plagued the industry.
            </p>
            <p className="text-apex-gray font-body leading-relaxed mb-5">
              We work directly with world-class synthesis facilities and maintain strict
              quality control at every step of the supply chain. Every batch is independently
              analyzed by certified third-party laboratories before we offer it for sale.
            </p>
            <p className="text-apex-gray font-body leading-relaxed">
              Our commitment is simple: if we wouldn't use it in our own research, we won't
              sell it to you. That standard drives everything we do.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
              alt="Research lab"
              className="w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-5 -left-5 bg-white border border-apex-border p-5 shadow-lg hidden sm:block">
              <p className="font-display text-3xl text-gold tracking-wider">2024</p>
              <p className="font-accent text-xs font-semibold tracking-widest uppercase text-apex-gray mt-1">
                Founded
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-apex-dark py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-5xl text-gold tracking-wider">{value}</p>
              <p className="font-accent text-xs font-semibold tracking-widest uppercase text-white/50 mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
            What We Stand For
          </span>
          <h2 className="section-title mt-2">Our Values</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map(({ Icon, title, desc }) => (
            <div key={title} className="card p-8 flex gap-5">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-accent font-bold text-base text-apex-dark mb-2">{title}</h3>
                <p className="text-apex-gray font-body text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-apex-light border-y border-apex-border py-16 px-4 text-center">
        <h2 className="section-title mb-4">Ready to Explore?</h2>
        <p className="text-apex-muted font-body text-sm mb-8 max-w-md mx-auto">
          Browse our full catalog of research-grade peptides, each backed by a Certificate of Analysis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-gold">Shop All Products</Link>
          <Link to="/lab-results" className="btn-outline-gold">View Lab Results</Link>
        </div>
      </section>
    </div>
  )
}
