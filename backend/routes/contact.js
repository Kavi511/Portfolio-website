import express from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (Public)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;

      const contactMessage = await ContactMessage.create({
        name,
        email,
        subject,
        message,
      });

      res.status(201).json({
        message: 'Contact message submitted successfully',
        id: contactMessage._id,
      });
    } catch (error) {
      console.error('Error submitting contact message:', error);
      res.status(500).json({ error: 'Error submitting contact message' });
    }
  }
);

// Get all contact messages (Admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Error fetching contact messages' });
  }
});

// Get single contact message (Admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ error: 'Error fetching contact message' });
  }
});

// Mark message as read (Admin only)
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Error updating message' });
  }
});

// Mark message as replied (Admin only)
router.patch('/:id/replied', authenticateToken, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { replied: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Error updating message' });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: 'Error deleting contact message' });
  }
});

export default router;

