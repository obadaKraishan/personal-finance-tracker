const Event = require('../models/Event');
const mongoose = require('mongoose');

exports.getAllEvents = async (req, res) => {
  try {
    const { date, location, category } = req.query;

    // Build the query object dynamically based on the filters provided
    let query = {};

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' }; // Case-insensitive regex search
    }

    if (category) {
      query.categories = { $regex: category, $options: 'i' }; // Case-insensitive regex search
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }

    const event = await Event.findById(id);
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
    const { id } = req.params;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
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
    const { id } = req.params;

    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
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
