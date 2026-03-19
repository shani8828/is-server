const Counter = require("../models/Counter");

const initializeDB = async () => {
  const existingCounter = await Counter.findOne();

  if (!existingCounter) {
    await Counter.create({
      knownCount: 0,
      unknownCount: 0,
    });
    console.log("Counter initialized");
  } else {
    console.log("Counter already exists");
  }
};

module.exports = { initializeDB };