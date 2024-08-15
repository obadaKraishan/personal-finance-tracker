const express = require('express');
const { registerForEvent, getRegistrationsForUser } = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to register for an event
router.post('/register', authMiddleware, registerForEvent);

// Route to get registrations for the logged-in user
router.get('/my-registrations', authMiddleware, getRegistrationsForUser);

module.exports = router;
