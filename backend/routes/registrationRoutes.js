// backend/routes/registrationRoutes.js
const express = require('express');
const { getRegistrations, registerForEvent, getRegistrationsForUser } = require('../controllers/registrationController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all registrations (Admin only)
router.get('/', protect, admin, getRegistrations);

// Route to register for an event
router.post('/register', protect, registerForEvent);

// Route to get registrations for the logged-in user
router.get('/my-registrations', protect, getRegistrationsForUser);

module.exports = router;
