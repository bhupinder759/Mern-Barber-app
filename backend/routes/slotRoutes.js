const express = require('express');
const router = express.Router();
const {
  createSlot,
  getBarberSlots,
  updateSlot,
  deleteSlot
} = require('../controllers/slotController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/create', protect, authorizeRoles('admin'), createSlot);
router.get('/my-slots', protect, authorizeRoles('admin'), getBarberSlots);
router.put('/:id', protect, authorizeRoles('admin'), updateSlot);
router.delete('/:id', protect, authorizeRoles('admin'), deleteSlot);

module.exports = router;
