const Slot = require("../models/Slot");

// Create a new slot
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, maxBookings, service, price, discount } = req.body;
  const barberId = req.user.id;
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
    console.log("Error creating slot:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};


// Get all slots for this barber (admin)
exports.getBarberSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ barber: req.user.id }).sort({ date: 1, time: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Slot (only if not booked)
exports.updateSlot = async (req, res) => {
  const slotId = req.params.id;
  const barberId = req.user.id;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    if (slot.barber.toString() !== barberId)
      return res.status(403).json({ message: 'Unauthorized' });

    if (slot.status === 'booked')
      return res.status(400).json({ message: 'Cannot update booked slot' });

    const { date, startTime, endTime, service, price, discount, maxBookings } = req.body;

    // Optional: Add date validation if required

    // Update fields
    slot.date = date || slot.date;
    slot.startTime = startTime || slot.startTime;
    slot.endTime = endTime || slot.endTime;
    slot.service = service || slot.service;
    slot.price = price || slot.price;
    slot.discount = discount !== undefined ? discount : slot.discount;
    slot.maxBookings = maxBookings || slot.maxBookings;

    await slot.save();

    res.json({ success: true, message: 'Slot updated successfully', slot });

  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Slot (only if not booked)
exports.deleteSlot = async (req, res) => {
  const slotId = req.params.id;
  const barberId = req.user.id;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    if (slot.barber.toString() !== barberId)
      return res.status(403).json({ message: 'Unauthorized' });

    if (slot.status === 'booked')
      return res.status(400).json({ message: 'Cannot delete booked slot' });

    await Slot.findByIdAndDelete(slotId);

    res.json({ success: true, message: 'Slot deleted successfully' });

  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
