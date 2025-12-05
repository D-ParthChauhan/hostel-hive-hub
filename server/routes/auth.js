const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, verifyCouncil } = require('../middleware/auth');

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 1. Check user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // 2. Check password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid password' });

  // 3. Create Token
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name }, JWT_SECRET);
  
  res.header('Authorization', token).json({ token, user: { name: user.name, role: user.role, email: user.email } });
});

// CREATE USER (Council Only)
router.post('/register', verifyCouncil, async (req, res) => {
  const { name, email, password, role, roomNumber } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name, email, password: hashedPassword, role, roomNumber
  });

  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;