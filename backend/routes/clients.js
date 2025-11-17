import express from 'express';
import Client from '../models/Client.js';
import { uploadAndProcessImage } from '../middleware/upload.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create client (admin only)
router.post('/', authenticateAdmin, uploadAndProcessImage.single('image'), async (req, res) => {
  const client = new Client({
    name: req.body.name,
    description: req.body.description,
    designation: req.body.designation,
    image: req.file ? `/uploads/${req.file.filename}` : null
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update client (admin only)
router.put('/:id', authenticateAdmin, uploadAndProcessImage.single('image'), async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    if (req.body.name) client.name = req.body.name;
    if (req.body.description) client.description = req.body.description;
    if (req.body.designation) client.designation = req.body.designation;
    if (req.file) client.image = `/uploads/${req.file.filename}`;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete client (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    
    await Client.deleteOne({ _id: req.params.id });
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
