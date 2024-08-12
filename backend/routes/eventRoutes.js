const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createEvent);
router.get('/', getEvents);

module.exports = router;
