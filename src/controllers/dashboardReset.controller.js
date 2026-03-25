const Event = require("../models/Event");
const Image = require("../models/Image.model"); // Imported your Image model
const fs = require("fs");
const path = require("path");

const resetDashboard = async (req, res) => {
  try {
    // 1. Delete all documents in both collections (MongoDB)
    await Event.deleteMany({});
    await Image.deleteMany({}); // Clears the "Checked People" / Best Shots data

    // 2. Define the path to the captured faces folder
    // Note: Ensure the path accurately points to your public folder from this controller
    const directory = path.join(__dirname, "..", "..", "public", "captured_faces");

    // 3. Read the directory and delete all files inside
    if (fs.existsSync(directory)) {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);
        
        // Ensure we only delete files, not directories
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      }
      console.log(`[Reset] Database cleared and ${files.length} images deleted from ${directory}`);
    } else {
      console.warn(`[Reset] Directory not found: ${directory}`);
    }

    res.status(200).json({ 
      success: true, 
      message: "Dashboard, image records, and physical files cleared successfully." 
    });
  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to reset dashboard and files.", 
      error: error.message 
    });
  }
};

module.exports = { resetDashboard };