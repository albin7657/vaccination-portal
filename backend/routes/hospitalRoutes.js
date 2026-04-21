const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Vaccine = require('../models/Vaccine');
const Appointment = require('../models/Appointment');

// Register Hospital
router.post('/register', async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.json(hospital);
  } catch (err) {
    next(err);
  }
});

// Login Hospital
router.post('/login', async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ email: req.body.email });
    if (hospital && hospital.password === req.body.password) {
      res.json(hospital);
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

// Get vaccines for a hospital
router.get('/vaccines', async (req, res, next) => {
  try {
    const { hospitalId } = req.query;
    const vaccines = await Vaccine.find({ hospitalId }).populate('hospitalId', 'name');
    res.json(vaccines);
  } catch (err) {
    next(err);
  }
});

// Add a new vaccine
router.post('/vaccines', async (req, res, next) => {
  try {
    const vaccine = await Vaccine.create(req.body);
    res.json(vaccine);
  } catch (err) {
    next(err);
  }
});

// Update availability of a vaccine
router.post('/updateAvailability', async (req, res, next) => {
  try {
    const { vaccineId, date, available } = req.body;
    const vaccine = await Vaccine.findById(vaccineId);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found.' });

    const entry = vaccine.availability.find(a => a.date === date);
    if (entry) {
      entry.available = available;
    } else {
      vaccine.availability.push({ date, available });
    }

    await vaccine.save();
    res.json({ message: 'Availability updated.' });
  } catch (err) {
    next(err);
  }
});

// ✅ Get appointments for a hospital (updated to use query param)
router.get('/appointments', async (req, res, next) => {
  try {
    const { hospitalId } = req.query;
    const apps = await Appointment.find({ hospitalId })
      .populate('userId', 'name')
      .populate('vaccineId', 'name');
    res.json(apps);
  } catch (err) {
    next(err);
  }
});
// Update appointment status to "vaccinated"
router.patch('/appointments/:appointmentId', async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body; // expected: "vaccinated"

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    )
      .populate('userId', 'name')
      .populate('vaccineId', 'name');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json(appointment);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
