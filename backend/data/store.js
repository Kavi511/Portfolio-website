import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const SITE_DATA_FILE = path.join(DATA_DIR, 'siteData.json');
const CONTACT_MESSAGES_FILE = path.join(DATA_DIR, 'contactMessages.json');

const defaultSiteData = {
  personalInfo: {
    name: 'Kavishka Herath',
    role: 'Aspiring SRE, DevOps & Cloud Enthusiast',
    tagline: 'Bridging the gap between development and operations through automation, cloud efficiency, and infrastructure excellence.',
    about: 'A final year Computer Science undergraduate passionate about Cloud Computing and DevOps.',
    location: 'Colombo, Sri Lanka',
    education: '',
    email: 'kavishkacherath@gmail.com',
    phone: '+94 72 764 3866',
    github: '',
    linkedin: '',
    medium: '',
    x: '',
    strava: '',
    cvUrl: '/api/upload/cv/download',
  },
  professionalSummary: {
    title: '',
    description: '',
    highlights: [],
  },
  experiences: [],
  skillCategories: [],
  projects: [],
  certifications: [],
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile(filePath, defaultValue) {
  ensureDataDir();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading file:', filePath, err.message);
  }
  return defaultValue !== undefined ? defaultValue : null;
}

function writeJsonFile(filePath, data) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ---------- Site data ----------
export function getSiteData() {
  const data = readJsonFile(SITE_DATA_FILE, defaultSiteData);
  if (!data.personalInfo) data.personalInfo = { ...defaultSiteData.personalInfo };
  if (!data.professionalSummary) data.professionalSummary = { ...defaultSiteData.professionalSummary };
  if (!Array.isArray(data.experiences)) data.experiences = [];
  if (!Array.isArray(data.skillCategories)) data.skillCategories = [];
  if (!Array.isArray(data.projects)) data.projects = [];
  if (!Array.isArray(data.certifications)) data.certifications = [];
  return data;
}

export function saveSiteData(data) {
  writeJsonFile(SITE_DATA_FILE, data);
}

// ---------- Contact messages ----------
export function getContactMessages() {
  const list = readJsonFile(CONTACT_MESSAGES_FILE, []);
  return Array.isArray(list) ? list : [];
}

export function addContactMessage(message) {
  const messages = getContactMessages();
  const id = String(Date.now());
  const newMsg = { _id: id, ...message, read: false, replied: false, createdAt: new Date().toISOString() };
  messages.unshift(newMsg);
  writeJsonFile(CONTACT_MESSAGES_FILE, messages);
  return newMsg;
}

export function updateContactMessage(id, updates) {
  const messages = getContactMessages();
  const idx = messages.findIndex((m) => m._id === id);
  if (idx === -1) return null;
  messages[idx] = { ...messages[idx], ...updates };
  writeJsonFile(CONTACT_MESSAGES_FILE, messages);
  return messages[idx];
}

export function deleteContactMessage(id) {
  const messages = getContactMessages();
  const filtered = messages.filter((m) => m._id !== id);
  if (filtered.length === messages.length) return false;
  writeJsonFile(CONTACT_MESSAGES_FILE, filtered);
  return true;
}
