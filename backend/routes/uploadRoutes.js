const express = require('express');
const router = express.Router();
const { imageUpload } = require('../controllers/uploadController')
const { upload } = require('../middlewares/uploadMiddleware')

router.post('/upload-image', upload.single('my_file'), imageUpload);

module.exports = router;