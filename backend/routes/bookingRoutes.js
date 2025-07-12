const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { bookSlot, getMyBookings, cancelBooking, getAllBookings } = require('../controllers/bookingController');

router.post('/book', protect, authorizeRoles('customer'), bookSlot);
router.get('/my-bookings', protect, authorizeRoles('customer'), getMyBookings);
router.post('/cancel', protect, authorizeRoles('customer'), cancelBooking);
router.get('/all', protect, authorizeRoles('admin'), getAllBookings);

module.exports = router;