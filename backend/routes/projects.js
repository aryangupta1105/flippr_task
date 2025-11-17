import express from 'express';
import Project from '../models/Project.js';
import { uploadAndProcessImage } from '../middleware/upload.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create project (admin only)
router.post('/', authenticateAdmin, uploadAndProcessImage.single('image'), async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : null
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project (admin only)
router.put('/:id', authenticateAdmin, uploadAndProcessImage.single('image'), async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.body.name) project.name = req.body.name;
    if (req.body.description) project.description = req.body.description;
    if (req.file) project.image = `/uploads/${req.file.filename}`;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
