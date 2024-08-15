const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registrationDate: { type: Date, default: Date.now },
  ticketNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
