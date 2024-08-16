// backend/controllers/registrationController.js
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { v4: uuidv4 } = require('uuid');

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate('user event');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerForEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingRegistration = await Registration.findOne({ user: req.user.id, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    const registration = new Registration({
      user: req.user.id,
      event: eventId,
      ticketNumber: uuidv4(),
    });

    await registration.save();
    res.json({ message: 'Registration successful', registration });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getRegistrationsForUser = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id }).populate('event');
    res.json(registrations);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getRegistrations,
  registerForEvent,
  getRegistrationsForUser,
};
