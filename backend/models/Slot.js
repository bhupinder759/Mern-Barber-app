const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String, // e.g., '2025-07-11'
    required: true,
  },
  time: {
    type: String, // e.g., '10:30 AM'
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null,
}
});

module.exports = mongoose.model('Slot', slotSchema);
