const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get dashboard statistics
router.get('/stats', protect, admin, getDashboardStats);

module.exports = router;
