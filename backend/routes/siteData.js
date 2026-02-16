import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getSiteData, saveSiteData } from '../data/store.js';

const router = express.Router();

// GET all site data (public)
router.get('/', (req, res) => {
  try {
    const data = getSiteData();
    res.json({
      personalInfo: data.personalInfo,
      professionalSummary: data.professionalSummary,
      experiences: data.experiences,
      skillCategories: data.skillCategories,
      projects: data.projects,
      certifications: data.certifications,
    });
  } catch (error) {
    console.error('Error fetching site data:', error);
    res.status(500).json({ error: 'Error fetching site data' });
  }
});

// ---------- Personal info ----------
router.get('/personal-info', (req, res) => {
  try {
    const data = getSiteData();
    res.json(data.personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ error: 'Error fetching personal info' });
  }
});

router.put('/personal-info', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const update = { ...req.body };
    delete update.cvFile;
    delete update.cvFileName;
    delete update.cvFileType;
    data.personalInfo = { ...data.personalInfo, ...update };
    saveSiteData(data);
    res.json(data.personalInfo);
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({ error: 'Error updating personal info' });
  }
});

// ---------- Professional summary ----------
router.get('/professional-summary', (req, res) => {
  try {
    const data = getSiteData();
    res.json(data.professionalSummary);
  } catch (error) {
    console.error('Error fetching professional summary:', error);
    res.status(500).json({ error: 'Error fetching professional summary' });
  }
});

router.put('/professional-summary', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    data.professionalSummary = { ...data.professionalSummary, ...req.body };
    saveSiteData(data);
    res.json(data.professionalSummary);
  } catch (error) {
    console.error('Error updating professional summary:', error);
    res.status(500).json({ error: 'Error updating professional summary' });
  }
});

// ---------- Experiences ----------
router.get('/experiences', (req, res) => {
  try {
    const data = getSiteData();
    const sorted = [...data.experiences].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(sorted);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Error fetching experiences' });
  }
});

router.post('/experiences', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const experience = { ...req.body, id: req.body.id || `exp-${Date.now()}` };
    data.experiences.push(experience);
    saveSiteData(data);
    res.status(201).json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Error creating experience' });
  }
});

router.put('/experiences/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.experiences.findIndex((e) => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Experience not found' });
    data.experiences[idx] = { ...data.experiences[idx], ...req.body };
    saveSiteData(data);
    res.json(data.experiences[idx]);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Error updating experience' });
  }
});

router.delete('/experiences/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.experiences.findIndex((e) => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Experience not found' });
    data.experiences.splice(idx, 1);
    saveSiteData(data);
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Error deleting experience' });
  }
});

// ---------- Skill categories ----------
router.get('/skill-categories', (req, res) => {
  try {
    const data = getSiteData();
    const sorted = [...data.skillCategories].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(sorted);
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    res.status(500).json({ error: 'Error fetching skill categories' });
  }
});

router.post('/skill-categories', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const category = { ...req.body, _id: `cat-${Date.now()}` };
    data.skillCategories.push(category);
    saveSiteData(data);
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating skill category:', error);
    res.status(500).json({ error: 'Error creating skill category' });
  }
});

router.put('/skill-categories/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.skillCategories.findIndex((c) => c._id === req.params.id || String(c.order) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Skill category not found' });
    data.skillCategories[idx] = { ...data.skillCategories[idx], ...req.body };
    saveSiteData(data);
    res.json(data.skillCategories[idx]);
  } catch (error) {
    console.error('Error updating skill category:', error);
    res.status(500).json({ error: 'Error updating skill category' });
  }
});

router.delete('/skill-categories/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.skillCategories.findIndex((c) => c._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Skill category not found' });
    data.skillCategories.splice(idx, 1);
    saveSiteData(data);
    res.json({ message: 'Skill category deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill category:', error);
    res.status(500).json({ error: 'Error deleting skill category' });
  }
});

// ---------- Projects ----------
router.get('/projects', (req, res) => {
  try {
    const data = getSiteData();
    const sorted = [...data.projects].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(sorted);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

router.post('/projects', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const project = { ...req.body, id: req.body.id || `p-${Date.now()}` };
    data.projects.push(project);
    saveSiteData(data);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

router.put('/projects/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.projects.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Project not found' });
    data.projects[idx] = { ...data.projects[idx], ...req.body };
    saveSiteData(data);
    res.json(data.projects[idx]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

router.delete('/projects/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.projects.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Project not found' });
    data.projects.splice(idx, 1);
    saveSiteData(data);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

// ---------- Certifications ----------
router.get('/certifications', (req, res) => {
  try {
    const data = getSiteData();
    const sorted = [...data.certifications].sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(sorted);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Error fetching certifications' });
  }
});

router.post('/certifications', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const certification = { ...req.body, id: req.body.id || `cert-${Date.now()}` };
    data.certifications.push(certification);
    saveSiteData(data);
    res.status(201).json(certification);
  } catch (error) {
    console.error('Error creating certification:', error);
    res.status(500).json({ error: 'Error creating certification' });
  }
});

router.put('/certifications/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.certifications.findIndex((c) => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Certification not found' });
    data.certifications[idx] = { ...data.certifications[idx], ...req.body };
    saveSiteData(data);
    res.json(data.certifications[idx]);
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ error: 'Error updating certification' });
  }
});

router.delete('/certifications/:id', authenticateToken, (req, res) => {
  try {
    const data = getSiteData();
    const idx = data.certifications.findIndex((c) => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Certification not found' });
    data.certifications.splice(idx, 1);
    saveSiteData(data);
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).json({ error: 'Error deleting certification' });
  }
});

export default router;
