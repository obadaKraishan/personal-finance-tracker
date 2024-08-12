const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createEvent); // Route for creating events
router.get('/', getEvents); // Route for fetching events

module.exports = router;
