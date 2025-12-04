const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
// Changed to 5001 to avoid 'EADDRINUSE' conflicts (common with AirPlay on macOS)
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// For local development, we use a local DB. For production, use MongoDB Atlas string in .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hostelHiveDB';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const complaintRoutes = require('./routes/complaints');
app.use('/api/complaints', complaintRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Hostel Hive Hub API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});