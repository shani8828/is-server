const Person = require('../models/addPerson.model');

exports.addPerson = async (req, res) => {
  try {
    const { name, position, images } = req.body;

    if (!images || images.length < 10) {
      return res.status(400).json({ 
        error: `Incomplete data: Received ${images?.length || 0}/10 required images.` 
      });
    }

    const newPerson = new Person({ name, position, images });
    await newPerson.save();
    
    res.status(201).json({ message: "Person registered successfully", person: newPerson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Add this to your existing controller file
exports.getKnownPeople = async (req, res) => {
  try {
    // We only fetch the first image to save bandwidth on the list view
    const people = await Person.find().sort({ createdAt: -1 });
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};