const Event = require('../models/Event');
const User = require('../models/User');

// Controller function to get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrganizers = await User.countDocuments({ role: 'organizer' });
    const totalAttendees = await User.countDocuments({ role: 'attendee' });

    res.json({
      totalEvents,
      totalUsers,
      totalOrganizers,
      totalAttendees,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
