// Full path: backend/models/Event.js

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: String, required: true }, // Assuming organizer is a string based on your JSON data
  location: {
    venue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  categories: { type: [String], required: true },
  speakers: [
    {
      name: { type: String },
      topic: { type: String }
    }
  ],
  sponsors: { type: [String] },
  schedule: [
    {
      time: { type: String },
      activity: { type: String }
    }
  ],
});

module.exports = mongoose.model('Event', EventSchema);
