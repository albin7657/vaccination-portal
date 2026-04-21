const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vaccineDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(5000, () => console.log('Server running on port 5000')); 
