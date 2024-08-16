// Full path: backend/controllers/dashboardController.js

const Event = require('../models/Event');
const User = require('../models/User');
const Registration = require('../models/Registration');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    const upcomingEvents = await Event.find({ date: { $gte: new Date() } }).sort('date').limit(5);

    res.json({
      totalEvents,
      totalUsers,
      totalRegistrations,
      upcomingEvents
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
