const { imageUploadUtil } = require('../middlewares/uploadMiddleware');

const imageUpload = async (req, res) => {
    try {
        const b64 = req.file.buffer.toString('base64');
        const url = req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtil(url);

        return res.json({
            success: true,
            result: result.secure_url,
            message: 'Image uploaded successfully',
        })
    }
    catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    });
}
}

module.exports = { imageUpload }