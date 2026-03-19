const LiveStats = require("../models/liveStats.model");
const { getIO } = require("../sockets/socket");

const updateStats = async ({ knownDelta = 0, unknownDelta = 0 }) => {
  let stats = await LiveStats.findOne();

  if (!stats) {
    stats = await LiveStats.create({
      totalKnown: 0,
      totalUnknown: 0,
    });
  }

  stats.totalKnown += knownDelta;
  stats.totalUnknown += unknownDelta;
  await stats.save();

  // Emit real-time update
  const io = getIO();
  io.emit("stats:update", {
    totalKnown: stats.totalKnown,
    totalUnknown: stats.totalUnknown,
  });

  return stats;
};

module.exports = { updateStats };