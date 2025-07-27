const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "lax", // or "none" if cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "lax", // or "none" if cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
};

exports.updateBarberProfile = async (req, res) => {
  try {
    const userId = req.user._id; // From verifyJWT middleware
    const { shopName, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        shopName,
        profileImage,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Barber profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error });
  }
};
