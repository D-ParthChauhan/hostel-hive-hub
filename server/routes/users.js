const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyCouncil } = require('../middleware/auth');

// GET all users (Council only)
router.get('/', verifyCouncil, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD a new user (Council only)
router.post('/', verifyCouncil, async (req, res) => {
  const { name, email, password, role, roomNumber, rollNumber, phoneNumber, image } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'student', 
      roomNumber,
      rollNumber,
      phoneNumber,
      image // Save image URL
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user (Council only)
router.delete('/:id', verifyCouncil, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;