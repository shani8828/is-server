// routes/cameraRoutes.js
const express = require('express');
const router = express.Router();
const { addCamera, getCameras } = require('../controllers/addCamera.controller');

router.post('/add', addCamera);
router.get('/all', getCameras);

module.exports = router;