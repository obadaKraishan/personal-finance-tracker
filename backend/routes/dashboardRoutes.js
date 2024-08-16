const express = require('express');
const { getDashboardStats, getUserActivityReport } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get dashboard statistics
router.get('/stats', protect, admin, getDashboardStats);

// Route to get user activity report
router.get('/user-report/:userId', protect, admin, getUserActivityReport);

module.exports = router;
