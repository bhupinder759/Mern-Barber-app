const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Hello Admin!');
});

module.exports = router;
