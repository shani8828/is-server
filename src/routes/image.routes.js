const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const personController = require('../controllers/image.controller');

// Configure Local Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/captured_faces'); // Ensure this folder exists!
  },
  filename: (req, file, cb) => {
    const name = req.body.person_id || 'unknown';
    const conf = (req.body.confidence || '0').replace('.', '');
    const safeName = name.replace(/\s+/g, '_');// 2. Clean the name (replace spaces with underscores for URL safety)
    const timestamp = Date.now();
    cb(null, `${safeName}-${conf}-${timestamp}.jpg`);
  }
});

const upload = multer({ storage: storage });

// POST from Python
router.post('/upload-image', upload.single('face_img'), personController.handleCombinedUpload);

// GET for Frontend
router.get('/captured-faces', personController.getAllImages);
router.get('/events', personController.getAllEvents);

module.exports = router;