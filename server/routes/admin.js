const express  = require('express')
const jwt      = require('jsonwebtoken')
const bcrypt   = require('bcryptjs')

const router = express.Router()

// Hash of 'LetsGetRich' — generated once at startup
let passwordHash = ''
;(async () => {
  passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'LetsGetRich', 10)
})()

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ message: 'Password required' })

  const match = await bcrypt.compare(password, passwordHash)
  if (!match) return res.status(401).json({ message: 'Incorrect password' })

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

module.exports = router
