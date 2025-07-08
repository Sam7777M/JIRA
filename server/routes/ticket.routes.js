const express = require('express');
const router = express.Router();
const { createTicket, getTicketsByProject, getTicketById, addComment } = require('../controllers/ticketController');
const { userAuth } = require('../middleware/auth');

router.post('/', userAuth, createTicket);
router.get('/project/:projectId', userAuth, getTicketsByProject);
router.get('/:id', userAuth, getTicketById);
router.post('/:id/comment', userAuth, addComment);

module.exports = router;
