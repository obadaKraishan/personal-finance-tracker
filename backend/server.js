// Full path: backend/server.js

const cors = require('cors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db'); // Ensure this is correctly defined and connects to your DB
const app = express();
const dashboardRoutes = require('./routes/dashboardRoutes'); // Import your dashboard routes

// Connect to the Database
connectDB(); // Make sure your DB connection is working as expected

// Enable CORS
app.use(cors());

// Set up Middleware
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes')); // Ensure this route is correct
app.use('/api/dashboard', dashboardRoutes);  // Add this line to include dashboard routes

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
