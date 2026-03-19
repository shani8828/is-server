// A unique ID for this server run
const currentSessionId = `session-${Date.now()}`;

const getCurrentSessionId = () => {
  return currentSessionId;
};

module.exports = { getCurrentSessionId };