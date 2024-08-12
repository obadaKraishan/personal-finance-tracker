const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('landing', { title: 'Welcome to the Event Management Platform', user: req.user });
});

// Event Details Page
router.get('/events', (req, res) => {
  // Assuming you have a way to get the user (e.g., from a session or JWT)
  res.render('eventDetails', { title: 'Event Details', user: req.user });
});

module.exports = router;
