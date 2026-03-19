const mongoose = require("mongoose");
const { initializeDB } = require("./initDB");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // 🔥 Initialize required collections
    await initializeDB();

  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};