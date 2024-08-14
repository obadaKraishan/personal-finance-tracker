const loadEvents = require('../utils/loadEvents');
const saveEvents = require('../utils/saveEvents');

exports.getAllEvents = (req, res) => {
  const events = loadEvents();
  res.json(events);
};

exports.getEventById = (req, res) => {
  const events = loadEvents();
  const event = events.find(e => e.id === req.params.id); // Ensure ID is a string
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
};

exports.updateEventById = (req, res) => {
  console.log(`Updating event with ID: ${req.params.id}`); // Log the ID
  const events = loadEvents();
  const eventIndex = events.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    console.log('Event not found');
    return res.status(404).json({ message: 'Event not found' });
  }

  events[eventIndex] = { ...events[eventIndex], ...req.body };
  saveEvents(events);
  
  console.log('Event updated successfully');
  res.json(events[eventIndex]);
};

exports.deleteEventById = (req, res) => {
  let events = loadEvents();
  events = events.filter(e => e.id !== req.params.id);
  saveEvents(events);
  res.status(204).send(); // No Content response
};
