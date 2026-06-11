const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

function requireTech(req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (payload.role !== 'tech') return res.status(403).json({ error: 'Forbidden' })
    req.tech = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext);
  }
});
const upload = multer({ storage });

// Create booking (accepts optional image under field name `image`)
// Create booking (accepts optional image under field name `image`)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const bookingData = { ...req.body };
    if (req.file) {
      bookingData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List bookings
router.get('/', async (req, res) => {
  try {
    const { status } = req.query
    const filter = {}
    if (status) filter.status = status
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id)
    if (!b) return res.status(404).json({ error: 'Not found' })
    res.json(b)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update booking status/note or other allowed fields
router.patch('/:id', requireTech, async (req, res) => {
  try {
    const allowed = ['status', 'note']
    const updates = {}
    Object.keys(req.body).forEach(k => { if (allowed.includes(k)) updates[k] = req.body[k] })
    const updated = await Booking.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete booking (technician only)
router.delete('/:id', requireTech, async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id)
    if (!b) return res.status(404).json({ error: 'Not found' })

    // remove uploaded image file if exists
    if (b.imageUrl) {
      const filePath = path.join(__dirname, '..', b.imageUrl.replace(/^\//, ''))
      try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath) } catch (e) { console.warn('Failed to remove image file', e) }
    }

    await Booking.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;
