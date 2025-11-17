import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    email: req.body.email
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully', subscriber: newSubscriber });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Get all subscribers (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete subscriber (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });
    
    await Subscriber.deleteOne({ _id: req.params.id });
    res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
