const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
// Configuration & Utils
const { connectDB } = require("./src/config/db.js");
const { initSocket } = require("./src/sockets/socket.js");

// Route Imports
const eventRoutes = require("./src/routes/logEvent.routes.js");
const statsRoutes = require("./src/routes/stats.routes.js");
const peopleRoutes = require("./src/routes/people.routes.js");
const cameraRoutes = require("./src/routes/addCamera.routes.js");
const ingestRoutes = require("./src/routes/ingest.routes.js");


const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

// Initialize Socket
const io = initSocket(server);

app.set("io", io);

// Middleware
const front = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: front,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("IS Project server is running...");
});

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/ingest", ingestRoutes);
// Server Listen
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}...`);
});

module.exports = app;