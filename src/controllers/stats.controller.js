const Counter = require("../models/Counter");
const { getCurrentSessionId } = require("../services/session.service");

const getLiveStats = async (req, res) => {
  try {
    const sessionId = getCurrentSessionId();
    const counter = await Counter.findOne({ session_id: sessionId });

    // Ensure we always return the same keys: total, known, unknown
    if (!counter) {
      return res.json({
        total: 0,
        known: 0,
        unknown: 0,
        session_id: sessionId
      });
    }

    res.json({
      total: (counter.knownCount || 0) + (counter.unknownCount || 0),
      known: counter.knownCount || 0,
      unknown: counter.unknownCount || 0,
      session_id: sessionId
    });
  } catch (err) {
    console.error("Fetch Stats Error:", err);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = { getLiveStats };