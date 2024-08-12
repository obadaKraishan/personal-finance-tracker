// server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

// Connect to the Database
connectDB();

// Set up Middleware
app.use(express.json()); // Parse JSON bodies

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', (req, res) => {
  res.render('landing', { title: 'Welcome to the Event Management Platform', user: req.user });
});

// Event Details Route
app.get('/events', (req, res) => {
  // Assuming you have a way to get the user (e.g., from a session or JWT)
  res.render('eventDetails', { title: 'Event Details', user: req.user });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
