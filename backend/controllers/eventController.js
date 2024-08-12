const Event = require('../models/Event');

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
    const events = await Event.find().populate('organizer', ['name']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
