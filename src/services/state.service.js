const activeTracks = new Map(); 

// Cleanup old tracks every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [track_id, last_seen] of activeTracks.entries()) {
    if (now - last_seen > 60000) { // If older than 1 minute
      activeTracks.delete(track_id);
    }
  }
}, 300000);

function isDuplicate(track_id) {
  const now = Date.now();

  if (activeTracks.has(track_id)) {
    const last = activeTracks.get(track_id);
    if (now - last < 10000) { 
      return true;
    }
  }

  activeTracks.set(track_id, now);
  return false;
}

module.exports = { isDuplicate };