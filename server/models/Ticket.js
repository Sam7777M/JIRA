const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  type: { type: String, enum: ['Bug', 'Task', 'Story', 'Epic'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Backlog', 'To Do', 'In Progress', 'Done'], default: 'Backlog' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Linking fields
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }, // For Bug/Task: link to Story
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },  // For Story: link to Epic
  comments: [commentSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
