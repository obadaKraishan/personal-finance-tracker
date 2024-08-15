// Full path: backend/controllers/registrationController.js

const mongoose = require('mongoose');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Function to handle event registration
const registerForEvent = async (req, res) => {
    const { eventId } = req.body;
    
    console.log("Received Event ID:", eventId);  // Log received event ID

    try {
        // Check if eventId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            console.log("Invalid Event ID");  // Log invalid event ID
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            console.log("Event not found for ID:", eventId);  // Log if event is not found
            return res.status(404).json({ message: 'Event not found' });
        }

        const existingRegistration = await Registration.findOne({ user: req.user.id, event: eventId });
        if (existingRegistration) {
            console.log("User already registered for this event:", eventId);  // Log duplicate registration attempt
            return res.status(400).json({ message: 'You are already registered for this event' });
        }

        const registration = new Registration({
            user: req.user.id,
            event: eventId,
            ticketNumber: uuidv4()
        });

        await registration.save();

        console.log("Registration successful for event:", eventId);  // Log successful registration
        res.json({ message: 'Registration successful', registration });
    } catch (err) {
        console.error("Server error during registration:", err.message);  // Log any server errors
        res.status(500).send('Server error');
    }
};

// Function to get registrations for a user
const getRegistrationsForUser = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id }).populate('event');
        res.json(registrations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Export the functions as part of the module.exports object
module.exports = {
    registerForEvent,
    getRegistrationsForUser
};
