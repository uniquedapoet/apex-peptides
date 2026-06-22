const jwt = require('jsonwebtoken')

module.exports = function requireAdmin(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = auth.slice(7)
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
