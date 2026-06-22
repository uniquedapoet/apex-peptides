const express    = require('express')
const { v4: uuid } = require('uuid')
const fs         = require('fs')
const path       = require('path')
const nodemailer = require('nodemailer')
const requireAdmin = require('../middleware/auth')

const router   = express.Router()
const DATA_FILE = path.join(__dirname, '../data/orders.json')

function readOrders() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return [] }
}
function writeOrders(orders) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2))
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

function orderEmailHtml(order) {
  const itemsRows = order.items.map((i) =>
    `<tr><td>${i.name} (${i.size})</td><td>×${i.qty}</td><td>$${(i.price * i.qty).toFixed(2)}</td></tr>`
  ).join('')

  return `
    <h2>New Order — ${order.id}</h2>
    <p><strong>Customer:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
    <p><strong>Email:</strong> ${order.customer.email}</p>
    <p><strong>Address:</strong> ${order.customer.address1}, ${order.customer.city}, ${order.customer.state} ${order.customer.zip}</p>
    <p><strong>Payment:</strong> ${order.paymentMethod === 'crypto' ? `${order.cryptoCoin} — TX: ${order.txId}` : 'Manual'}</p>
    <table border="1" cellpadding="6">
      <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
      ${itemsRows}
      <tr><td colspan="2"><strong>Total</strong></td><td><strong>$${order.total.toFixed(2)}</strong></td></tr>
    </table>
    ${order.customer.notes ? `<p><strong>Notes:</strong> ${order.customer.notes}</p>` : ''}
  `
}

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const order = {
      id: 'APEX-' + uuid().slice(0, 7).toUpperCase(),
      ...req.body,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    const orders = readOrders()
    orders.push(order)
    writeOrders(orders)

    // Send notification email
    try {
      const transporter = createTransport()
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to:   process.env.ORDER_EMAIL,
        subject: `New Order ${order.id} — $${order.total.toFixed(2)}`,
        html: orderEmailHtml(order),
      })
      // Send confirmation to customer
      await transporter.sendMail({
        from:    process.env.FROM_EMAIL,
        to:      order.customer.email,
        subject: `Order Confirmation — ${order.id}`,
        html: `<h2>Thank you for your order, ${order.customer.firstName}!</h2>
               <p>Your order ID is <strong>${order.id}</strong>.</p>
               <p>Total: <strong>$${order.total.toFixed(2)}</strong></p>
               ${order.paymentMethod === 'manual' ? '<p>We will email you payment instructions within one business day.</p>' : '<p>We will process your order once your transaction is confirmed on the blockchain.</p>'}
               <p><em>For research purposes only.</em></p>`,
      })
    } catch (mailErr) {
      console.error('Email error:', mailErr.message)
    }

    res.status(201).json({ orderId: order.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create order' })
  }
})

// GET /api/orders (admin only)
router.get('/', requireAdmin, (req, res) => {
  res.json(readOrders())
})

// PATCH /api/orders/:id (admin only)
router.patch('/:id', requireAdmin, (req, res) => {
  const orders = readOrders()
  const idx = orders.findIndex((o) => o.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  orders[idx] = { ...orders[idx], ...req.body }
  writeOrders(orders)
  res.json(orders[idx])
})

module.exports = router
