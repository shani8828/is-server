const express = require("express");
const router = express.Router();
const { getLiveStats } = require("../controllers/stats.controller");

// Define the GET route for live stats
router.get("/live-stats", getLiveStats);

module.exports = router;