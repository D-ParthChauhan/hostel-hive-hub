const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { verifyCouncil } = require('../middleware/auth');

// CREATE Event (Council only)
router.post('/', verifyCouncil, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Event (Council only)
router.delete('/:id', verifyCouncil, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Events (Public) - Note: This might duplicate what you have, but good for Admin list
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;