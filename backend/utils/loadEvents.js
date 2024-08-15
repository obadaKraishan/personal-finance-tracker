const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Event = require('../models/Event'); // Make sure this path is correct

// Load environment variables from the .env file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const loadEvents = async () => {
  try {
    // Connect to the MongoDB database using the environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');

    // Read the events.json file
    const filePath = path.join(__dirname, '../data/events.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const events = JSON.parse(jsonData);

    // Clear the events collection before inserting new data (optional)
    await Event.deleteMany({});
    console.log('Existing events removed...');

    // Insert events into the MongoDB database
    await Event.insertMany(events);
    console.log('Events have been loaded into MongoDB...');

    // Close the database connection
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (err) {
    console.error('Error loading events:', err);
    mongoose.connection.close();
  }
};

module.exports = loadEvents;
