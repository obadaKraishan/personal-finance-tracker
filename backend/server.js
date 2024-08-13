// server.js
const cors = require('cors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const loadEvents = require('./utils/loadEvents');
const app = express();

// Connect to the Database
connectDB();

// Enable CORS
app.use(cors());

// Set up Middleware
app.use(express.json()); // Parse JSON bodies

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', (req, res) => {
  const events = loadEvents(); // Load events from the JSON file
  res.render('landing', { title: 'Welcome to the Event Management Platform', user: req.user, events });
});

// Event Details Route
app.get('/events/:id', (req, res) => {
  const events = loadEvents();
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  res.render('eventDetails', { title: 'Event Details', event, user: req.user });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
