const express = require('express');
const Registration = require('../models/Registration');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/registrations
// @desc    Get all registrations (Admin only)
// @access  Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const registrations = await Registration.find().populate('user event');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
