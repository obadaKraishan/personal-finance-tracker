const cors = require('cors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Import routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

// Connect to the Database
connectDB();

// Enable CORS
app.use(cors());

// Set up Middleware
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', registrationRoutes); 
app.use('/api/users', userRoutes);  
app.use('/api/dashboard', dashboardRoutes);  

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
