const fs = require('fs');
const path = require('path');
const loadEvents = require('../utils/loadEvents');

exports.createEvent = (req, res) => {
  const events = loadEvents(); // Load existing events from the JSON file
  const newEvent = {
    id: Date.now().toString(), // Generate a unique ID for the event
    ...req.body
  };

  events.push(newEvent); // Add the new event to the list

  try {
    fs.writeFileSync(path.join(__dirname, '../data/events.json'), JSON.stringify(events, null, 2));
    res.status(201).json(newEvent); // Respond with the newly created event
  } catch (err) {
    console.error('Failed to save event:', err);
    res.status(500).json({ message: 'Failed to save event' });
  }
};

exports.getEvents = (req, res) => {
  try {
    const events = loadEvents(); // Load events from the JSON file
    res.json(events);
  } catch (err) {
    console.error('Failed to load events:', err);
    res.status(500).json({ message: 'Failed to load events' });
  }
};
