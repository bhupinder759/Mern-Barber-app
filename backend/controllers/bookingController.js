const Slot = require('../models/Slot');

// 1. Book a Slot
exports.bookSlot = async (req, res) => {
  const { slotId } = req.params;
  const customerId = req.user._id;

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    if (slot.bookings.length >= slot.maxBookings) {
      return res.status(400).json({ message: 'Slot fully booked' });
    }

    const alreadyBooked = slot.bookings.find(b => b.customer.toString() === customerId.toString());
    if (alreadyBooked) {
      return res.status(400).json({ message: 'You already booked this slot' });
    }

    slot.bookings.push({ customer: customerId });
    await slot.save();

    res.status(200).json({ success: true, message: 'Slot booked', slot });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// 2. Get My Bookings (Customer)
exports.getMyBookings = async (req, res) => {
  try {
    const slots = await Slot.find({ 'bookings.customer': req.user._id })
      .populate('barber', 'name email')
      .sort({ date: 1, startTime: 1 });

    // filter bookings belonging to current user
    const myBookings = slots.map(slot => ({
      ...slot._doc,
      bookings: slot.bookings.filter(b => b.customer.toString() === req.user._id.toString()),
    }));

    res.json(myBookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// 3. Cancel Booking
exports.cancelBooking = async (req, res) => {
  const { slotId } = req.params;
  const customerId = req.user._id;

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    const bookingIndex = slot.bookings.findIndex(
      b => b.customer.toString() === customerId.toString()
    );
    if (bookingIndex === -1) {
      return res.status(403).json({ message: 'Booking not found or not yours' });
    }

    slot.bookings.splice(bookingIndex, 1);
    await slot.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// 4. Admin – Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const slots = await Slot.find({ 'bookings.0': { $exists: true } })
      .populate('barber', 'name email')
      .populate('bookings.customer', 'name email')
      .sort({ date: 1, startTime: 1 });

    res.json(slots);
  } catch (error) {
    console.error('Admin view error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
