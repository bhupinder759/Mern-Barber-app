const express = require('express');
const router = express.Router();
const { createSlot, getBarberSlots } = require('../controllers/slotController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin (barber) creates and views slots
router.post('/', protect, authorizeRoles('admin'), createSlot);
router.get('/my-slots', protect, authorizeRoles('admin'), getBarberSlots);

module.exports = router;
