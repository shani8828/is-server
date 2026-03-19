const express = require("express");
const { getCameras } = require("../controllers/camera.controller.js");

const router = express.Router();

router.get("/", getCameras);

module.exports = router;