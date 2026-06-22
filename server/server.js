require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const ordersRouter     = require('./routes/orders')
const subscribersRouter = require('./routes/subscribers')
const adminRouter      = require('./routes/admin')
const discountsRouter  = require('./routes/discounts')

const app  = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

// Routes
app.use('/api/orders',      ordersRouter)
app.use('/api/subscribers', subscribersRouter)
app.use('/api/admin',       adminRouter)
app.use('/api/discounts',   discountsRouter)

// Contact form (simple — just logs / sends email)
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing fields' })

  try {
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    await transporter.sendMail({
      from:    process.env.FROM_EMAIL,
      to:      process.env.ORDER_EMAIL,
      subject: `Contact Form: ${subject || 'General Inquiry'} — ${name}`,
      html:    `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
  } catch (err) {
    console.error('Contact email error:', err.message)
  }

  res.json({ message: 'Message received' })
})

app.listen(PORT, () => {
  console.log(`APEX PEPTIDES server running on http://localhost:${PORT}`)
})
