const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize the app
const app = express();
// Changed to 5001 to match the frontend API configuration and avoid conflicts
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allows your frontend to talk to this backend
app.use(bodyParser.json()); // Parses incoming JSON data

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hostelHiveDB';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const authRoutes = require('./routes/auth');          // Auth & Login
const complaintRoutes = require('./routes/complaints');
const communityRoutes = require('./routes/community'); // Community/Reddit features
const eventRoutes = require('./routes/events');       // Events management
const userRoutes = require('./routes/users');         // Student/User management

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('Hostel Hive Hub API is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});