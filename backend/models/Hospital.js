const mongoose = require('mongoose');
const HospitalSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model('Hospital', HospitalSchema);