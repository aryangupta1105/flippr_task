import express from 'express';
import Contact from '../models/Contact.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create contact submission
router.post('/', async (req, res) => {
  const contact = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    city: req.body.city
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contacts (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    
    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
