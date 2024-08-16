// backend/routes/userRoutes.js
const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all users (Admin only)
router.get('/', protect, admin, getAllUsers);

module.exports = router;
