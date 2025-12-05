const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    throw err;
  }
};

const authRoutes = require('../server/routes/auth');
const complaintRoutes = require('../server/routes/complaints');
const communityRoutes = require('../server/routes/community');
const eventRoutes = require('../server/routes/events');
const userRoutes = require('../server/routes/users');
const contactRoutes = require('../server/routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hostel Hive Hub API is Running!' });
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
