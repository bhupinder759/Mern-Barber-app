const Slot = require('../models/Slot');
const User = require('../models/User');

// Customer books a slot
exports.bookSlot = async (req, res) => {
  const { slotId } = req.body;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    // Slot already booked?
    if (slot.isBooked) return res.status(400).json({ message: 'Slot already booked' });

    // Slot date/time already passed?
    const now = new Date();
    const slotDateTime = new Date(`${slot.date} ${slot.time}`);
    if (slotDateTime < now) {
      return res.status(400).json({ message: 'Slot time has already passed' });
    }

    // Mark as booked
    slot.isBooked = true;
    slot.bookedBy = req.user._id;
    await slot.save();

    res.json({ message: 'Slot booked successfully', slot });
  } catch (error) {
    console.log(error, 'Error booking slot');
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const slots = await Slot.find({ bookedBy: req.user._id })
      .populate('barber', 'name email') // show barber info
      .sort({ date: 1, time: 1 });

    res.json(slots);
  } catch (error) {
    console.log(error, 'Error fetching bookings');
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.cancelBooking = async (req, res) => {
  const { slotId } = req.body;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Check if the slot belongs to the current user
    if (String(slot.bookedBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You are not allowed to cancel this booking' });
    }

    // Check if slot date/time already passed
    const now = new Date();
    const slotDateTime = new Date(`${slot.date} ${slot.time}`);
    if (slotDateTime < now) {
      return res.status(400).json({ message: 'Cannot cancel a past booking' });
    }

    // Cancel slot
    slot.isBooked = false;
    slot.bookedBy = null;
    await slot.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.log(error, 'Error cancelling booking');
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Controller
// Admin views all booked slots
exports.getAllBookings = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: true })
      .populate('bookedBy', 'name email')   // customer info
      .populate('barber', 'name email')     // barber info
      .sort({ date: 1, time: 1 });

    res.json(slots);
  } catch (error) {
    console.log(error, 'Error fetching bookings');
    res.status(500).json({ message: 'Server error', error });
  }
};