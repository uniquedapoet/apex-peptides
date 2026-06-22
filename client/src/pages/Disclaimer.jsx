import { Link } from 'react-router-dom'

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-apex-dark py-16 px-4 text-center">
        <h1 className="font-display text-5xl text-white tracking-widest">RESEARCH DISCLAIMER</h1>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-body text-apex-gray text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">For Research Purposes Only</h2>
          <p>All products sold by APEX PEPTIDES are intended exclusively for in vitro laboratory research and scientific study. These products are not intended for, nor shall they be used for, human or animal consumption, medical treatment, diagnosis, or any in vivo application.</p>
        </section>
        <section>
          <h2 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">Not FDA Approved</h2>
          <p>The peptides offered on this website have not been evaluated or approved by the U.S. Food and Drug Administration (FDA) or any other regulatory authority for use in humans or animals. APEX PEPTIDES makes no claims regarding the therapeutic, diagnostic, or preventive properties of any product.</p>
        </section>
        <section>
          <h2 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">Age Requirement</h2>
          <p>You must be at least 18 years of age to purchase from APEX PEPTIDES. By completing a purchase, you confirm that you meet this age requirement.</p>
        </section>
        <section>
          <h2 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">Purchaser Responsibility</h2>
          <p>It is the sole responsibility of the purchaser to comply with all local, state, federal, and international laws regarding the possession, use, and handling of peptides. APEX PEPTIDES is not responsible for any misuse, improper handling, or illegal application of its products.</p>
        </section>
        <section>
          <h2 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">Liability Limitation</h2>
          <p>APEX PEPTIDES shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or misuse of any product. All sales are final for opened vials.</p>
        </section>
        <div className="pt-6 border-t border-apex-border">
          <Link to="/" className="btn-outline-gold text-xs">Return to Home</Link>
        </div>
      </div>
    </div>
  )
}
