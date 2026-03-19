const validateEvent = (data) => {
  return data.cameraId && data.trackingId && data.label;
};

exports.validateEvent = validateEvent;