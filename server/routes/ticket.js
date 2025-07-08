const express = require('express');
const router = express.Router();
const { createTicket, getTicketsByProject, getTicketById, addComment } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createTicket);
router.get('/project/:projectId', protect, getTicketsByProject);
router.get('/:id', protect, getTicketById);
router.post('/:id/comment', protect, addComment);

module.exports = router;
