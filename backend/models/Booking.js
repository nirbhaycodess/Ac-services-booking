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
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
