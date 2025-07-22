import Barber from '../models/User.js'; // or User model if barber profile is there

export const updateBarberProfile = async (req, res) => {
  try {
    const { name, shopName } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL
    const barberId = req.user._id;

    const updated = await Barber.findByIdAndUpdate(
      barberId,
      { name, shopName, shopImage: imageUrl },
      { new: true }
    );

    res.status(200).json({ message: 'Profile updated', profile: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Profile update failed' });
  }
};
