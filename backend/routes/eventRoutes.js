const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createEvent); // Route for creating events
router.get('/', getEvents); // Route for fetching events
router.put('/:id', authMiddleware, updateEvent); // Route for updating events
router.delete('/:id', authMiddleware, deleteEvent); // Route for deleting events

module.exports = router;
