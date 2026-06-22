import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQS = [
  {
    category: 'General',
    items: [
      {
        q: 'What are research peptides?',
        a: 'Research peptides are short chains of amino acids synthesized for use in laboratory and scientific research. They are studied for their potential biological activities such as tissue repair, metabolic regulation, and cellular signaling. All peptides sold by APEX are for research use only and are not approved for human consumption.',
      },
      {
        q: 'Are your products safe for human use?',
        a: 'Our products are not intended, labeled, or sold for human use. They are sold strictly for in vitro laboratory research purposes. Any use of these compounds in humans is done entirely at the individual\'s own risk and is outside the scope of our business.',
      },
      {
        q: 'Who can purchase from APEX PEPTIDES?',
        a: 'Our products are intended for purchase by researchers, scientists, and qualified professionals for legitimate research applications. You must be at least 18 years of age to place an order. By purchasing, you confirm that you are acquiring these products for lawful research purposes only.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently we ship within the United States only. International shipping is on our roadmap — subscribe to our newsletter to be notified when it becomes available.',
      },
    ],
  },
  {
    category: 'Products & Quality',
    items: [
      {
        q: 'What purity levels do your peptides have?',
        a: 'Our standard peptides are 99%+ purity as verified by HPLC. Some niche peptides carry a 98%+ purity certification. Every product listing clearly states the guaranteed purity level, and every batch ships with a Certificate of Analysis from an independent third-party laboratory.',
      },
      {
        q: 'What form do the peptides come in?',
        a: 'Most of our peptides are supplied as lyophilized (freeze-dried) powder in hermetically sealed vials. This form provides the longest shelf life and maximum stability. Some peptides are available in other forms — the product listing will specify.',
      },
      {
        q: 'How should I store peptides?',
        a: 'Lyophilized peptides should be stored at −20 °C (a standard freezer) when not in use. Once reconstituted, store at 4 °C (refrigerator) and use within 30 days. Always protect from light and moisture. Detailed storage instructions are included with every order.',
      },
      {
        q: 'Do you provide Certificates of Analysis?',
        a: 'Yes. Every batch is independently tested by a certified third-party laboratory and a Certificate of Analysis (COA) is included with your order. You can also view COAs for current inventory on our Lab Results page.',
      },
      {
        q: 'Are your products tested for heavy metals and endotoxins?',
        a: 'Yes. Our comprehensive testing panel includes HPLC purity testing, mass spectrometry for identity verification, and endotoxin testing (LAL test). We are continuously expanding our testing protocols to meet the highest research standards.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Bitcoin (BTC), Ethereum (ETH), and USD Coin (USDC) as our primary payment method. We also offer a manual payment option (bank transfer or money order) for customers who prefer not to use cryptocurrency. Payment instructions are provided at checkout.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Orders placed before 2:00 PM EST on business days ship the same day. Standard shipping typically takes 3–5 business days. Expedited options are available at checkout. You will receive a tracking number via email once your order ships.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes — free standard shipping is included on all orders over $150.',
      },
      {
        q: 'How is my order packaged?',
        a: 'All orders ship in discreet, unmarked packaging. Temperature-sensitive items are packed with appropriate insulation materials. There is no mention of APEX PEPTIDES or product contents on the exterior packaging.',
      },
    ],
  },
  {
    category: 'Discounts & Promotions',
    items: [
      {
        q: 'Do you offer bulk discounts?',
        a: 'Yes. Automatic discounts are applied at checkout based on your order total: 5% off $150+, 10% off $300+, and 15% off $500+. These apply automatically — no code required.',
      },
      {
        q: 'How do I get a discount code?',
        a: 'Subscribe to our email newsletter on the homepage and you\'ll receive a 10% discount code for your first order instantly.',
      },
      {
        q: 'Can I combine a discount code with automatic discounts?',
        a: 'Discounts do not stack — the better of the two (automatic tier vs. your code) will automatically be applied at checkout.',
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-apex-border last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-accent font-semibold text-sm text-apex-dark tracking-wide">{q}</span>
        <ChevronDown
          size={18}
          className={`text-gold shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="text-apex-gray font-body text-sm leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-apex-dark py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gold" />
        </div>
        <span className="font-accent text-xs font-semibold tracking-[0.4em] uppercase text-gold">
          Support
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest mt-2">
          FAQ
        </h1>
        <p className="text-white/50 font-body text-sm mt-3 max-w-md mx-auto">
          Everything you need to know about APEX PEPTIDES
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {FAQS.map(({ category, items }) => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-0.5 bg-gold" />
              <h2 className="font-accent font-bold text-sm tracking-widest uppercase text-gold">
                {category}
              </h2>
            </div>
            <div className="border border-apex-border bg-white px-2">
              {items.map((item) => (
                <FAQItem key={item.q} {...item} />
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="bg-apex-light border border-apex-border p-8 text-center mt-8">
          <h3 className="font-accent font-bold text-base text-apex-dark tracking-wide mb-2">
            Still Have Questions?
          </h3>
          <p className="text-apex-muted font-body text-sm mb-5">
            Our team is here to help with any research or order queries.
          </p>
          <Link to="/contact" className="btn-gold text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
