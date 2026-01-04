import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import path from 'path';
import fs from 'fs';
import PersonalInfo from '../models/PersonalInfo.js';

const router = express.Router();

// Upload CV file (Admin only) - Store in database
router.post('/cv', authenticateToken, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file as buffer
    const fileBuffer = fs.readFileSync(req.file.path);
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    // Get or create PersonalInfo document
    let personalInfo = await PersonalInfo.findOne();
    if (!personalInfo) {
      personalInfo = await PersonalInfo.create({});
    }

    // Store file in database
    personalInfo.cvFile = fileBuffer;
    personalInfo.cvFileName = fileName;
    personalInfo.cvFileType = fileType;
    personalInfo.cvUrl = `/api/upload/cv/download`; // URL to download from database
    await personalInfo.save();

    // Delete the temporary file from uploads folder
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'File uploaded and stored in database successfully',
      url: personalInfo.cvUrl,
      filename: fileName,
      storedInDatabase: true,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Delete CV file from database (Admin only)
router.delete('/cv', authenticateToken, async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne();
    
    if (!personalInfo || !personalInfo.cvFile) {
      return res.status(404).json({ error: 'CV file not found in database' });
    }

    // Remove CV file from database
    personalInfo.cvFile = null;
    personalInfo.cvFileName = '';
    personalInfo.cvFileType = '';
    personalInfo.cvUrl = '';
    await personalInfo.save();

    res.json({
      message: 'CV file deleted successfully',
      deleted: true,
    });
  } catch (error) {
    console.error('Error deleting CV file:', error);
    res.status(500).json({ error: 'Error deleting CV file' });
  }
});

// Download CV from database
router.get('/cv/download', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne();
    
    if (!personalInfo || !personalInfo.cvFile) {
      return res.status(404).json({ error: 'CV file not found in database' });
    }

    // Set headers to force download
    res.setHeader('Content-Type', personalInfo.cvFileType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${personalInfo.cvFileName || 'cv.pdf'}"`);
    
    // Send the file buffer from database
    res.send(personalInfo.cvFile);
  } catch (error) {
    console.error('Error serving CV from database:', error);
    res.status(500).json({ error: 'Error serving CV file' });
  }
});

// Serve uploaded files from file system (fallback for old files)
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set headers to force download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Error serving file' });
  }
});

export default router;

