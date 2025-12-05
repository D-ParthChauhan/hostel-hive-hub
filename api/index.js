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

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const communityRoutes = require('./routes/community');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contact');

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
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Connection failed', details: error.message });
  }
};
