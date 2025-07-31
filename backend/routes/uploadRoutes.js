const express = require('express');
const { imageUpload } = require('../controllers/uploadController')
const { upload } = require('../middlewares/uploadMiddleware')

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), imageUpload);

module.exports = router;