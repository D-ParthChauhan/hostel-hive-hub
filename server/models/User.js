const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'student_council', 'council'], 
    default: 'student' 
  },
  roomNumber: { type: String },
  rollNumber: { type: String },
  phoneNumber: { type: String },
  image: { type: String }, // URL for profile image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);