const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  // Detailed address fields
  address: { type: String },
  landmark: { type: String },
  pincode: { type: String },
  city: { type: String },
  district: { type: String },
  service: { type: String },
  repairType: { type: String },
  imageUrl: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending','approved','done','cancelled'], default: 'pending' },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
