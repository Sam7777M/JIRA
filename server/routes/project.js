const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, addMember } = require('../controllers/projectController');
const { userAuth } = require('../middleware/auth');

router.post('/', userAuth, createProject);
router.get('/', userAuth, getProjects);
router.get('/:id', userAuth, getProjectById);
router.post('/:id/add-member', userAuth, addMember);

module.exports = router;
