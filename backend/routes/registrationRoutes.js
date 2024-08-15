const express = require('express');
const { registerForEvent, getRegistrationsForUser } = require('../controllers/registrationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, registerForEvent); // Register for an event
router.get('/my-registrations', authMiddleware, getRegistrationsForUser); // Get all registrations for the logged-in user

module.exports = router;
