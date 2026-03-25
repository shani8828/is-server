const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
// Configuration & Utils
const { connectDB } = require("./src/config/db.js");
const { initSocket } = require("./src/sockets/socket.js");

// Route Imports
const eventRoutes = require("./src/routes/logEvent.routes.js");
const statsRoutes = require("./src/routes/stats.routes.js");
const cameraRoutes = require("./src/routes/addCamera.routes.js");
const ingestRoutes = require("./src/routes/ingest.routes.js");
const dashboardResetRoutes = require("./src/routes/dashboardReset.route.js");
const imageRoutes = require("./src/routes/image.routes.js");

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
app.use('/captured_faces', express.static(path.join(__dirname, 'public/captured_faces')));

app.get("/", (req, res) => {
  res.send("IS Project server is running...");
});

// Routes
// app.use("/api/events", eventRoutes);
app.use("/api/stats", statsRoutes);
// app.use("/api/people", peopleRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/ingest", ingestRoutes);
app.use("/api/dashboard", dashboardResetRoutes);
app.use('/api', imageRoutes);
// Server Listen
const PORT = 5000;

server.listen(PORT,  () => {
// server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports = app;