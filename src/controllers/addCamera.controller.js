// controllers/cameraController.js
const Camera = require('../models/addCamera');

exports.addCamera = async (req, res) => {
  try {
    const { name, ipAddress } = req.body;
    const newCamera = new Camera({ name, ipAddress });
    await newCamera.save();
    res.status(201).json({ message: "Camera added successfully", camera: newCamera });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCameras = async (req, res) => {
  try {
    const cameras = await Camera.find();
    res.status(200).json(cameras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};