// routes/event.js (CommonJS)
const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");
const { getCurrentSessionId } = require("../services/session.service");

router.post("/event", async (req, res) => {
  try {
    const { is_known, track_id } = req.body;
    const sessionId = getCurrentSessionId();

    console.log(`Received event for track: ${track_id}, Known: ${is_known}`);

    // Update the counter in MongoDB
    // upsert: true creates the document if it doesn't exist for this session
    await Counter.findOneAndUpdate(
      { session_id: sessionId },
      { 
        $inc: { 
          knownCount: is_known ? 1 : 0, 
          unknownCount: is_known ? 0 : 1 
        } 
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Event processed" });
  } catch (err) {
    console.error("Error processing incoming event:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;