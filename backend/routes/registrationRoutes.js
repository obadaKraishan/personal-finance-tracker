const express = require('express');
const { registerForEvent, getRegistrationsForUser } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware'); // Destructure to get the protect middleware
const router = express.Router();

// Route to register for an event
router.post('/register', protect, registerForEvent);

// Route to get registrations for the logged-in user
router.get('/my-registrations', protect, getRegistrationsForUser);

module.exports = router;
