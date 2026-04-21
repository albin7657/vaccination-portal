const mongoose = require('mongoose');
const VaccineSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  name: String,
  total: Number,
  // track availability per date
  availability: [
    { date: String, available: Number }
  ],
});
module.exports = mongoose.model('Vaccine', VaccineSchema);