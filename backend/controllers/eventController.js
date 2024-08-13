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

// New function to update an event
exports.updateEvent = (req, res) => {
  const events = loadEvents();
  const eventIndex = events.findIndex(e => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const updatedEvent = { ...events[eventIndex], ...req.body };
  events[eventIndex] = updatedEvent;

  try {
    fs.writeFileSync(path.join(__dirname, '../data/events.json'), JSON.stringify(events, null, 2));
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Failed to update event:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// New function to delete an event
exports.deleteEvent = (req, res) => {
  const events = loadEvents();
  const updatedEvents = events.filter(e => e.id !== req.params.id);

  if (events.length === updatedEvents.length) {
    return res.status(404).json({ message: 'Event not found' });
  }

  try {
    fs.writeFileSync(path.join(__dirname, '../data/events.json'), JSON.stringify(updatedEvents, null, 2));
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Failed to delete event:', err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};
