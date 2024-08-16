const Event = require('../models/Event');
const User = require('../models/User');
const Registration = require('../models/Registration');

// Controller function to get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalRegistrations = await Registration.countDocuments();

        // Analytics for event popularity and registration trends
        const popularEvents = await Registration.aggregate([
            { $group: { _id: "$event", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: "events", localField: "_id", foreignField: "_id", as: "event" } },
            { $unwind: "$event" },
        ]);

        const registrationTrends = await Registration.aggregate([
            { $group: { _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({
            totalEvents,
            totalUsers,
            totalRegistrations,
            popularEvents,
            registrationTrends,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Additional controller for user activity reports
exports.getUserActivityReport = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const registrations = await Registration.find({ user: userId }).populate('event');

        res.json({
            user,
            registrations
        });
    } catch (error) {
        console.error('Error fetching user activity report:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
