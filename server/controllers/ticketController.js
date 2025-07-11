const Ticket = require('../models/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, type, priority, status, projectId, assignedTo, story, epic } = req.body;
    const ticketData = {
      title,
      description,
      type,
      priority,
      status,
      projectId,
      assignedTo,
      createdBy: req.user.id
    };
    // Link Bug/Task to Story
    if ((type === 'Bug' || type === 'Task') && story) {
      ticketData.story = story;
    }
    // Link Story to Epic
    if (type === 'Story' && epic) {
      ticketData.epic = epic;
    }
    const ticket = await Ticket.create(ticketData);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tickets for a project
exports.getTicketsByProject = async (req, res) => {
  try {
    const tickets = await Ticket.find({ projectId: req.params.projectId })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email')
      .populate('story', 'title type')
      .populate('epic', 'title type');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email')
      .populate('story', 'title type')
      .populate('epic', 'title type');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a ticket
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    ticket.comments.push({ text, author: req.user.id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
