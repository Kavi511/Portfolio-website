import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const checkPassword = async (password) => {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return bcrypt.compare(password, hash);
  const plain = process.env.ADMIN_PASSWORD;
  if (plain) return password === plain;
  return false;
};

// Login (no database - uses env ADMIN_USERNAME and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const hasPassword = process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD;
    if (!hasPassword) {
      console.warn('No ADMIN_PASSWORD or ADMIN_PASSWORD_HASH set in .env');
      return res.status(500).json({ error: 'Server not configured for login' });
    }

    if (username !== adminUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: 'admin', username: adminUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      token,
      user: { id: 'admin', username: adminUsername, role: 'admin' },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Verify token (no database - just validate JWT)
router.get('/verify', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      valid: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role || 'admin',
      },
    });
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
});

export default router;
