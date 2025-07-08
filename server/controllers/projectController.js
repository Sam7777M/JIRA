const Project = require('../models/Project');
const User = require('../models/User');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user.id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects for the logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    }).populate('members', 'name email role').populate('createdBy', 'name email role');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email role')
      .populate('createdBy', 'name email role');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a member to a project (only by creator)
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the project creator can add members' });
    }
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }
    // Optionally, check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    project.members.push(userId);
    await project.save();
    res.json({ message: 'User added to project', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
