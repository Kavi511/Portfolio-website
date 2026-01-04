import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PersonalInfo from '../models/PersonalInfo.js';

const router = express.Router();

// Error handler for multer errors
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

// Upload CV file (Admin only) - Store in database
router.post('/cv', authenticateToken, upload.single('cv'), handleMulterError, async (req, res) => {
  try {
    console.log('CV upload request received');
    console.log('User:', req.user?.username || 'Unknown');
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('File received:', req.file.originalname, 'Size:', (req.file.size / 1024).toFixed(2), 'KB');

    // Read the file as buffer
    let fileBuffer;
    try {
      fileBuffer = fs.readFileSync(req.file.path);
    } catch (readError) {
      console.error('Error reading file:', readError);
      return res.status(500).json({ error: 'Error reading uploaded file', details: readError.message });
    }

    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    // Validate file type
    if (fileType !== 'application/pdf') {
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    // Get or create PersonalInfo document
    let personalInfo;
    try {
      // First, try to find existing document
      personalInfo = await PersonalInfo.findOne();
      
      // If no document exists, create one with required fields
      if (!personalInfo) {
        console.log('PersonalInfo document not found, creating new one...');
        personalInfo = await PersonalInfo.create({
          name: 'Your Name',
          role: 'Your Role',
          tagline: 'Your Tagline',
          about: 'About you',
          location: 'Your Location',
          education: 'Your Education',
          email: 'your@email.com',
          phone: 'Your Phone',
        });
        console.log('PersonalInfo document created successfully');
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      console.error('Error stack:', dbError.stack);
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ 
        error: 'Database error', 
        details: dbError.message,
        hint: 'Run: npm run check-personal-info to verify PersonalInfo document exists. Or run: npm run seed to seed the database.'
      });
    }

    // Store file in database
    try {
      // Check file size (MongoDB document limit is 16MB)
      const fileSizeMB = fileBuffer.length / (1024 * 1024);
      if (fileSizeMB > 16) {
        // Clean up uploaded file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ 
          error: 'File too large for database storage', 
          details: `File size is ${fileSizeMB.toFixed(2)}MB. Maximum is 16MB for MongoDB document storage.`
        });
      }

      console.log(`Storing CV file: ${fileName} (${fileSizeMB.toFixed(2)}MB)`);
      
      personalInfo.cvFile = fileBuffer;
      personalInfo.cvFileName = fileName;
      personalInfo.cvFileType = fileType;
      personalInfo.cvUrl = `/api/upload/cv/download`; // URL to download from database
      
      await personalInfo.save();
      console.log('CV file saved to database successfully');
    } catch (saveError) {
      console.error('Error saving to database:', saveError);
      console.error('Error details:', saveError.message);
      console.error('Error stack:', saveError.stack);
      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({ 
        error: 'Error saving file to database', 
        details: saveError.message,
        hint: 'Check backend console for detailed error. File might be too large (>16MB) or database connection issue.'
      });
    }

    // Delete the temporary file from uploads folder
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (deleteError) {
      console.error('Warning: Could not delete temporary file:', deleteError);
      // Don't fail the request if we can't delete the temp file
    }

    res.json({
      message: 'File uploaded and stored in database successfully',
      url: personalInfo.cvUrl,
      filename: fileName,
      storedInDatabase: true,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    // Clean up uploaded file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }
    res.status(500).json({ 
      error: 'Error uploading file', 
      details: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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

    // Get filename, sanitize it
    const fileName = personalInfo.cvFileName || 'Resume.pdf';
    // Remove any path components and ensure .pdf extension
    const safeFileName = fileName.replace(/^.*[\\\/]/, '').replace(/\.(pdf|PDF)$/, '') + '.pdf';

    // Set proper headers for secure PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"; filename*=UTF-8''${encodeURIComponent(safeFileName)}`);
    res.setHeader('Content-Length', personalInfo.cvFile.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
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

