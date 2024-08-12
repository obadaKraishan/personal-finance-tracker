const loadEvents = require('../utils/loadEvents'); // Import the function to load events from JSON
const Event = require('../models/Event'); // For creating new events in MongoDB

exports.createEvent = async (req, res) => {
  const { name, description, date } = req.body;
  try {
    const newEvent = new Event({ name, description, date, organizer: req.user.id });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = loadEvents(); // Load events from the JSON file
    res.json(events);
  } catch (err) {
    console.error('Failed to load events:', err);
    res.status(500).json({ message: 'Failed to load events' });
  }
};
