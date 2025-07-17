const express = require('express');
const router = express.Router();
const {
  bookSlot,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require('../controllers/bookingController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Customer routes
router.post('/book/:slotId', protect, authorizeRoles('customer'), bookSlot);
router.get('/my-bookings', protect, authorizeRoles('customer'), getMyBookings);
router.post('/cancel/:slotId', protect, authorizeRoles('customer'), cancelBooking);

// Admin route
router.get('/all', protect, authorizeRoles('admin'), getAllBookings);

module.exports = router;
