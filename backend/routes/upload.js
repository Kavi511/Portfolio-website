import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getSiteData, saveSiteData } from '../data/store.js';

const router = express.Router();

const CV_FILENAME = 'cv.pdf';
const getUploadDir = () => path.resolve(process.env.UPLOAD_DIR || './uploads');
const cvFilePath = () => path.join(getUploadDir(), CV_FILENAME);

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: 'File upload error', details: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message || 'File upload error' });
  }
  next();
};

// Upload CV (Admin only) - store as file on disk
router.post('/cv', authenticateToken, upload.single('cv'), handleMulterError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    const uploadDir = getUploadDir();
    const targetPath = cvFilePath();
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
    fs.renameSync(req.file.path, targetPath);

    const data = getSiteData();
    data.personalInfo.cvUrl = '/api/upload/cv/download';
    saveSiteData(data);

    res.json({
      message: 'File uploaded successfully',
      url: '/api/upload/cv/download',
      filename: req.file.originalname,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
    res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
});

// Delete CV (Admin only)
router.delete('/cv', authenticateToken, (req, res) => {
  try {
    const targetPath = cvFilePath();
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
    const data = getSiteData();
    data.personalInfo.cvUrl = '';
    saveSiteData(data);
    res.json({ message: 'CV file deleted successfully', deleted: true });
  } catch (error) {
    console.error('Error deleting CV file:', error);
    res.status(500).json({ error: 'Error deleting CV file' });
  }
});

// Download CV (public) - serve from disk
router.get('/cv/download', (req, res) => {
  try {
    const targetPath = cvFilePath();
    if (!fs.existsSync(targetPath)) {
      return res.status(404).json({ error: 'CV file not found' });
    }
    const fileName = CV_FILENAME;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.resolve(targetPath));
  } catch (error) {
    console.error('Error serving CV:', error);
    res.status(500).json({ error: 'Error serving CV file' });
  }
});

// Serve other uploaded files by filename
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(getUploadDir(), filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Error serving file' });
  }
});

export default router;
