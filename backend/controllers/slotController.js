const Slot = require('../models/Slot');

// Create a slot (admin only)
exports.createSlot = async (req, res) => {
  const { date, time } = req.body;

  try {
    const slot = await Slot.create({
      barber: req.user._id,
      date,
      time,
    });

    res.status(201).json({
      message: 'Slot created successfully',
      slot,
    });
  } catch (error) {
    console.log(error, 'Error creating slot');
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all slots for this barber (admin)
exports.getBarberSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ barber: req.user._id }).sort({ date: 1, time: 1 });
    res.json(slots);
  } catch (error) {
    console.log(error, 'Error fetching slots');
    res.status(500).json({ message: 'Server error', error });
  }
};
