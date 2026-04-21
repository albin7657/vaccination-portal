const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vaccine = require('../models/Vaccine');
const Appointment = require('../models/Appointment');

// Register User
router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Login User
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.json(user);
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

// Get all vaccines
router.get('/vaccines', async (req, res, next) => {
  try {
    const vaccines = await Vaccine.find().populate('hospitalId', 'name');
    res.json(vaccines);
  } catch (err) {
    next(err);
  }
});

// Book an appointment
router.post('/appointments', async (req, res, next) => {
  try {
    const { userId, hospitalId, vaccineId, date } = req.body;
    if (!userId || !hospitalId || !vaccineId || !date) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    const vaccine = await Vaccine.findById(vaccineId);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found.' });

    const entry = vaccine.availability.find(a => a.date === date);
    if (!entry || entry.available <= 0) {
      return res.status(400).json({ message: 'No vaccines available on selected date.' });
    }

    const appointment = await Appointment.create({ userId, hospitalId, vaccineId, date });
    entry.available -= 1;
    await vaccine.save();

    const populated = await Appointment.findById(appointment._id)
      .populate('vaccineId', 'name')
      .populate('hospitalId', 'name');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

// Get appointments for a user
router.get('/appointments/:userId', async (req, res, next) => {
  try {
    const apps = await Appointment.find({ userId: req.params.userId })
      .populate('vaccineId', 'name')
      .populate('hospitalId', 'name');
    res.json(apps);
  } catch (err) {
    next(err);
  }
});

module.exports = router;