const express    = require('express')
const fs         = require('fs')
const path       = require('path')
const nodemailer = require('nodemailer')
const requireAdmin = require('../middleware/auth')

const router   = express.Router()
const DATA_FILE = path.join(__dirname, '../data/subscribers.json')
const WELCOME_CODE = 'APEX10'
const DISCOUNT_PCT = 10

function readSubs() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return [] }
}
function writeSubs(subs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(subs, null, 2))
}

// POST /api/subscribers
router.post('/', async (req, res) => {
  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email required' })
  }

  const subs = readSubs()
  if (subs.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'Already subscribed', code: WELCOME_CODE })
  }

  const sub = { email, code: WELCOME_CODE, subscribedAt: new Date().toISOString() }
  subs.push(sub)
  writeSubs(subs)

  // Send welcome email with discount code
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    await transporter.sendMail({
      from:    process.env.FROM_EMAIL,
      to:      email,
      subject: `Your ${DISCOUNT_PCT}% Discount Code — APEX PEPTIDES`,
      html: `
        <h2>Welcome to APEX PEPTIDES</h2>
        <p>Thank you for subscribing. Here's your exclusive discount code:</p>
        <h1 style="color:#C9A84C;letter-spacing:0.2em;">${WELCOME_CODE}</h1>
        <p>Use this code at checkout for <strong>${DISCOUNT_PCT}% off</strong> your first order.</p>
        <p><em>For research purposes only. Must be 18+.</em></p>
      `,
    })
  } catch (err) {
    console.error('Subscriber email error:', err.message)
  }

  res.status(201).json({ message: 'Subscribed', code: WELCOME_CODE })
})

// GET /api/subscribers (admin only)
router.get('/', requireAdmin, (req, res) => {
  res.json(readSubs())
})

module.exports = router
