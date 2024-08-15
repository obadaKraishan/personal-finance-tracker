const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEventById = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEventById = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(204).send(); // No Content response
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addNewEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent); // Return the new event with a 201 Created status
  } catch (error) {
    console.error('Error adding new event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
