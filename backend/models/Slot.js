const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin who created the slot
    required: true,
  },
  date: {
    type: String, // Format: '2025-07-17'
    required: true,
  },
  startTime: {
    type: String, // Format: '10:00'
    required: true,
  },
  endTime: {
    type: String, // Format: '11:00'
    required: true,
  },
  service: {
    type: String, // Example: 'Haircut', 'Shave'
    required: true,
  },
  maxBookings: {
    type: Number,
    default: 1,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Percentage discount
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  bookings: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      bookedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
