const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    // Fetch last 50 events, sorted by newest first
    const events = await Event.find().sort({ timestamp: -1 }).limit(50);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = { getEvents };