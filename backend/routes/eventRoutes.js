const express = require('express');
const { getAllEvents, getEventById } = require('../controllers/eventController');
const router = express.Router();

router.get('/', getAllEvents); // Route to get all events
router.get('/:id', getEventById); // Route to get event by ID

module.exports = router;
