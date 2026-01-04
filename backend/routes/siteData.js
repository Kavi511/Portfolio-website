import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import PersonalInfo from '../models/PersonalInfo.js';
import ProfessionalSummary from '../models/ProfessionalSummary.js';
import Experience from '../models/Experience.js';
import SkillCategory from '../models/SkillCategory.js';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';

const router = express.Router();

// ========== GET ALL SITE DATA (Public) ==========
router.get('/', async (req, res) => {
  try {
    const [personalInfo, professionalSummary, experiences, skillCategories, projects, certifications] = await Promise.all([
      PersonalInfo.getPersonalInfo(),
      ProfessionalSummary.getProfessionalSummary(),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      SkillCategory.find().sort({ order: 1 }),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Certification.find().sort({ order: 1, issueDate: -1 }),
    ]);

    res.json({
      personalInfo,
      professionalSummary,
      experiences,
      skillCategories,
      projects,
      certifications,
    });
  } catch (error) {
    console.error('Error fetching site data:', error);
    res.status(500).json({ error: 'Error fetching site data' });
  }
});

// ========== PERSONAL INFO ==========
router.get('/personal-info', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.getPersonalInfo();
    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ error: 'Error fetching personal info' });
  }
});

router.put('/personal-info', authenticateToken, async (req, res) => {
  try {
    let personalInfo = await PersonalInfo.findOne();
    
    if (!personalInfo) {
      personalInfo = await PersonalInfo.create(req.body);
    } else {
      personalInfo = await PersonalInfo.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json(personalInfo);
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({ error: 'Error updating personal info' });
  }
});

// ========== PROFESSIONAL SUMMARY ==========
router.get('/professional-summary', async (req, res) => {
  try {
    const summary = await ProfessionalSummary.getProfessionalSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching professional summary:', error);
    res.status(500).json({ error: 'Error fetching professional summary' });
  }
});

router.put('/professional-summary', authenticateToken, async (req, res) => {
  try {
    let summary = await ProfessionalSummary.findOne();
    
    if (!summary) {
      summary = await ProfessionalSummary.create(req.body);
    } else {
      summary = await ProfessionalSummary.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json(summary);
  } catch (error) {
    console.error('Error updating professional summary:', error);
    res.status(500).json({ error: 'Error updating professional summary' });
  }
});

// ========== EXPERIENCES ==========
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Error fetching experiences' });
  }
});

router.post('/experiences', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Error creating experience' });
  }
});

router.put('/experiences/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Error updating experience' });
  }
});

router.delete('/experiences/:id', authenticateToken, async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ id: req.params.id });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Error deleting experience' });
  }
});

// ========== SKILL CATEGORIES ==========
router.get('/skill-categories', async (req, res) => {
  try {
    const categories = await SkillCategory.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    res.status(500).json({ error: 'Error fetching skill categories' });
  }
});

router.post('/skill-categories', authenticateToken, async (req, res) => {
  try {
    const category = await SkillCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating skill category:', error);
    res.status(500).json({ error: 'Error creating skill category' });
  }
});

router.put('/skill-categories/:id', authenticateToken, async (req, res) => {
  try {
    const category = await SkillCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Skill category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error updating skill category:', error);
    res.status(500).json({ error: 'Error updating skill category' });
  }
});

router.delete('/skill-categories/:id', authenticateToken, async (req, res) => {
  try {
    const category = await SkillCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Skill category not found' });
    }

    res.json({ message: 'Skill category deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill category:', error);
    res.status(500).json({ error: 'Error deleting skill category' });
  }
});

// ========== PROJECTS ==========
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

router.post('/projects', authenticateToken, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

router.put('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ id: req.params.id });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

// ========== CERTIFICATIONS ==========
router.get('/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ order: 1, issueDate: -1 });
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Error fetching certifications' });
  }
});

router.post('/certifications', authenticateToken, async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (error) {
    console.error('Error creating certification:', error);
    res.status(500).json({ error: 'Error creating certification' });
  }
});

router.put('/certifications/:id', authenticateToken, async (req, res) => {
  try {
    const certification = await Certification.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.json(certification);
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ error: 'Error updating certification' });
  }
});

router.delete('/certifications/:id', authenticateToken, async (req, res) => {
  try {
    const certification = await Certification.findOneAndDelete({ id: req.params.id });

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).json({ error: 'Error deleting certification' });
  }
});

export default router;

