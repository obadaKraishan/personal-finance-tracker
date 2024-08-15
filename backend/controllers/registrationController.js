const mongoose = require('mongoose');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Function to handle event registration
const registerForEvent = async (req, res) => {
    const { eventId } = req.body;

    console.log("Received Event ID:", eventId);

    try {
        // Fetch all events for debugging
        const allEvents = await Event.find({});
        console.log("All Events:", allEvents);  // Log all events to ensure they exist and check IDs

        // Fetch the event using the string ID
        const event = await Event.findOne({ id: eventId });

        if (!event) {
            console.log("Event not found for ID:", eventId);
            return res.status(404).json({ message: 'Event not found' });
        }

        console.log("Found Event:", event);  // Log the found event

        const existingRegistration = await Registration.findOne({ user: req.user.id, event: eventId });
        if (existingRegistration) {
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
        console.error("Server error during registration:", err.message);
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
