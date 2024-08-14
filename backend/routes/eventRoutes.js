const express = require('express');
const { getAllEvents, getEventById, updateEventById, deleteEventById, addNewEvent } = require('../controllers/eventController');
const router = express.Router();

router.get('/', getAllEvents); // Route to get all events
router.get('/:id', getEventById); // Route to get event by ID
router.put('/:id', updateEventById); // Route to update event by ID
router.delete('/:id', deleteEventById); // Route to delete event by ID
router.post('/', addNewEvent); // Route to add a new event

module.exports = router;
