const express = require("express");
const { upload } = require('../middlewares/uploadMiddleware.js');

// import {upload} from '../middlewares/uploadMiddleware.js';
import { updateBarberProfile } from '../controllers/barberController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/profile', protect, upload.single('image'), updateBarberProfile);

module.exports = router; 