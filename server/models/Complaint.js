const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Electrical', 'Carpentry', 'Plumbing', 'Cleaning', 'Other'],
    required: true 
  },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);