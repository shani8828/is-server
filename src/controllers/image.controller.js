const Image = require("../models/Image.model");
const Event = require("../models/Event");
const { getIO } = require("../sockets/socket"); // Imported your socket service

exports.handleCombinedUpload = async (req, res) => {
  try {
    console.log("Body received:", req.body);
    console.log("File received:", req.file ? req.file.filename : "NULL");
    
    if (!req.file) return res.status(400).json({ message: "Missing image" });
    
    const {
      event_id,
      camera_id,
      track_id,
      person_id,
      is_known,
      confidence,
      timestamp,
    } = req.body;
    
    const imagePath = `/captured_faces/${req.file.filename}`;

    // 1. Save to Event Collection (for the Activity Log)
    const newEvent = await Event.create({
      event_id,
      camera_id,
      track_id,
      person_id,
      is_known: is_known === "true",
      confidence: parseFloat(confidence),
      timestamp: timestamp || new Date(),
    });

    // 2. Save to Image/Person Collection (for the Best Shots / Checked People)
    // You can update an existing record or create a new one
    const newImageEntry = await Image.create({
      label: person_id,
      confidence: parseFloat(confidence),
      imagePath: imagePath,
      cameraId: camera_id,
      trackId: track_id,
      is_known: is_known === "true",
    });

    // 3. Emit to Sockets using your socket.js getIO()
    try {
      const io = getIO();
      io.emit("new-event", newEvent); // Updates Activity Log
      io.emit("new-face-capture", newImageEntry); // Updates Checked People
    } catch (socketError) {
      console.error("Socket Emission Error:", socketError.message);
      // We don't crash the request if only the socket fails
    }

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Combined Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const people = await Image.find().sort({ createdAt: -1 }).limit(50);
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(50);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};