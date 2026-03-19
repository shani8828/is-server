const express = require("express");
const router = express.Router();
const { updateStats } = require("../services/stats.service");

// ML sends events here
router.post("/ingest", async (req, res) => {
  const { personType } = req.body;
  // personType = "KNOWN" | "UNKNOWN"

  if (!personType) {
    return res.status(400).json({ message: "personType required" });
  }

  if (personType === "KNOWN") {
    await updateStats({ knownDelta: 1 });
  }

  if (personType === "UNKNOWN") {
    await updateStats({ unknownDelta: 1 });
  }

  res.json({ success: true });
});

module.exports = router;