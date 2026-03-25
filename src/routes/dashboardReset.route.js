const express = require("express");
const router = express.Router();
const { resetDashboard } = require("../controllers/dashboardReset.controller");

router.delete("/reset", resetDashboard);

module.exports = router;