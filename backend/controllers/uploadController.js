const { imageUploadUtil } = require('../middlewares/uploadMiddleware.js');

exports.imageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const { buffer, mimetype } = req.file;

    const result = await imageUploadUtil(buffer, mimetype);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      result: { url: result.secure_url }, // Cloudinary returns secure_url
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ success: false, message: 'Image upload failed', error: error.message });
  }
};
