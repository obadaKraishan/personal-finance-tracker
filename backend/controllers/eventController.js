// backend/controllers/eventController.js
const loadEvents = require('../utils/loadEvents');
const saveEvents = require('../utils/saveEvents');

exports.getAllEvents = (req, res) => {
  const events = loadEvents();
  res.json(events);
};

exports.getEventById = (req, res) => {
  const events = loadEvents();
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
};

exports.updateEventById = (req, res) => {
  const events = loadEvents();
  const eventIndex = events.findIndex(e => e.id === req.params.id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  events[eventIndex] = { ...events[eventIndex], ...req.body };
  saveEvents(events); // Save the updated events back to the storage (file/database/etc.)
  
  res.json(events[eventIndex]);
};

exports.deleteEventById = (req, res) => {
  let events = loadEvents();
  events = events.filter(e => e.id !== req.params.id);
  saveEvents(events);
  res.status(204).send(); // No Content response
};
