const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateBarberProfile } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const  User  = require('../models/User')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update-profile', protect, authorizeRoles('admin'), updateBarberProfile);

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;