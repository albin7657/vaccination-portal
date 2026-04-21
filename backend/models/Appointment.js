const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  vaccineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' },
  date: String,
  status: { type: String, default: 'booked' },
});
module.exports = mongoose.model('Appointment', AppointmentSchema);