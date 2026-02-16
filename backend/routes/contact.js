import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import {
  getContactMessages,
  addContactMessage,
  updateContactMessage,
  deleteContactMessage,
} from '../data/store.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;
      const contactMessage = addContactMessage({ name, email, subject, message });

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

router.get('/', authenticateToken, (req, res) => {
  try {
    const messages = getContactMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Error fetching contact messages' });
  }
});

router.get('/:id', authenticateToken, (req, res) => {
  try {
    const messages = getContactMessages();
    const message = messages.find((m) => m._id === req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ error: 'Error fetching contact message' });
  }
});

router.patch('/:id/read', authenticateToken, (req, res) => {
  try {
    const updated = updateContactMessage(req.params.id, { read: true });
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Error updating message' });
  }
});

router.patch('/:id/replied', authenticateToken, (req, res) => {
  try {
    const updated = updateContactMessage(req.params.id, { replied: true });
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Error updating message' });
  }
});

router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const deleted = deleteContactMessage(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: 'Error deleting contact message' });
  }
});

export default router;
