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

// --- Import Routes ---
const authRoutes = require('./routes/auth');           // <--- NEW
const complaintRoutes = require('./routes/complaints');
const communityRoutes = require('./routes/community'); // <--- NEW

// --- Use Routes ---
app.use('/api/auth', authRoutes);                      // <--- NEW
app.use('/api/complaints', complaintRoutes);
app.use('/api/community', communityRoutes);            // <--- NEW

// Health Check
app.get('/', (req, res) => {
  res.send('Hostel Hive Hub API is Running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});