const express  = require('express')
const fs       = require('fs')
const path     = require('path')
const requireAdmin = require('../middleware/auth')

const router   = express.Router()
const DATA_FILE = path.join(__dirname, '../data/discounts.json')

function readDiscounts() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return [] }
}
function writeDiscounts(d) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2))
}

// POST /api/discounts/validate
router.post('/validate', (req, res) => {
  const { code } = req.body
  if (!code) return res.status(400).json({ message: 'Code required' })

  const discounts = readDiscounts()
  const found = discounts.find(
    (d) => d.code.toUpperCase() === code.toUpperCase() && d.active
  )
  if (!found) return res.status(404).json({ message: 'Invalid or expired code' })
  res.json({ percent: found.percent, code: found.code })
})

// GET /api/discounts (admin)
router.get('/', requireAdmin, (req, res) => res.json(readDiscounts()))

// POST /api/discounts (admin — add code)
router.post('/', requireAdmin, (req, res) => {
  const { code, percent } = req.body
  if (!code || !percent) return res.status(400).json({ message: 'code and percent required' })
  const discounts = readDiscounts()
  discounts.push({ code: code.toUpperCase(), percent: parseInt(percent), uses: 0, active: true })
  writeDiscounts(discounts)
  res.status(201).json({ message: 'Created' })
})

// PATCH /api/discounts/:code (admin — toggle active)
router.patch('/:code', requireAdmin, (req, res) => {
  const discounts = readDiscounts()
  const idx = discounts.findIndex((d) => d.code === req.params.code.toUpperCase())
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  discounts[idx] = { ...discounts[idx], ...req.body }
  writeDiscounts(discounts)
  res.json(discounts[idx])
})

module.exports = router
