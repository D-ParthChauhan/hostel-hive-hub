const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// GET all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new complaint
router.post('/', async (req, res) => {
  const { studentName, roomNumber, type, description } = req.body;
  const newComplaint = new Complaint({
    studentName,
    roomNumber,
    type,
    description
  });

  try {
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH status (e.g. mark resolved)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;