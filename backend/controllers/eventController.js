const loadEvents = require('../utils/loadEvents');

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
