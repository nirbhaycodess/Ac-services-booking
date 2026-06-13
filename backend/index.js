require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings');
const authRouter = require('./routes/auth');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const TECH_EMAIL = process.env.TECH_EMAIL;
const TECH_PASS = process.env.TECH_PASS;

// Attempt to connect to MongoDB. Do not exit the process on failure so
// Render can show logs and the process can be diagnosed; the health
// endpoint reports DB connection status.
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Continuing without DB connection; set MONGO_URI in Render env vars or backend/.env');
  });

// Health endpoint for platform health checks and quick debugging
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState // 0 = disconnected, 1 = connected
  res.json({ ok: true, dbConnected: dbState === 1, dbState })
})

if (!TECH_EMAIL || !TECH_PASS) {
  console.warn('Warning: TECH_EMAIL and/or TECH_PASS not set. Technician login will be unavailable until they are configured. Add them to backend/.env or your environment.');
}

app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('AC Repair Booking API'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
