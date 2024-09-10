const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
