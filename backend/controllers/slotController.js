const Slot = require("../models/Slot");

// Create a new slot
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, maxBookings, service, price, discount } = req.body;
  const barberId = req.user._id;

  try {
    // 1. Validation
    if (!date || !startTime || !endTime || !service || !price || !maxBookings) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Convert string to Date
    const now = new Date();
    const slotStartDateTime = new Date(`${date}T${startTime}`);
    if (slotStartDateTime < now) {
      return res.status(400).json({ message: 'Cannot create a slot in the past' });
    }

    // 3. Check Duplicate Slot
    const existingSlot = await Slot.findOne({
      barber: barberId,
      date,
      startTime,
      endTime,
      service,
    });

    if (existingSlot) {
      return res.status(400).json({ message: 'Slot already exists for this barber at this time' });
    }

    // 4. Create New Slot
    const newSlot = new Slot({
      barber: barberId,
      date,
      startTime,
      endTime,
      service,
      maxBookings,
      price,
      discount: discount || 0,
    });

    await newSlot.save();

    return res.status(201).json({
      success: true,
      message: "Slot created successfully",
      slot: newSlot,
    });

  } catch (err) {
    console.error("Error creating slot:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
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
