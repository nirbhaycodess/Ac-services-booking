const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const TECH_EMAIL = process.env.TECH_EMAIL
const TECH_PASS = process.env.TECH_PASS
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

// POST /api/auth/tech-login
router.post('/tech-login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' })

  // Ensure credentials are configured via environment variables
  if (!TECH_EMAIL || !TECH_PASS) {
    return res.status(500).json({ error: 'Server misconfigured: TECH_EMAIL and TECH_PASS must be set' })
  }

  if (email !== TECH_EMAIL || password !== TECH_PASS) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ role: 'tech', email }, JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

module.exports = router
