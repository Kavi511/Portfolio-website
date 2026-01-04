import React, { useState, useEffect } from 'react';
import { useSiteData } from "@/contexts/SiteDataContext";
import { Save, X, Plus, Trash2, Home, Download, Key, User, Eye, EyeOff, LogOut } from 'lucide-react';
import { Experience, SkillCategory, Project, Certification } from "@/types";
import BackgroundParticles from './BackgroundParticles';

interface AdminProps {
  onBack: () => void;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onBack, onLogout }) => {
  const { siteData, updatePersonalInfo, updateExperiences, updateSkillCategories, updateProjects, updateCertifications } = useSiteData();
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'skills' | 'projects' | 'certifications' | 'settings'>('personal');
  
  // Settings state
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  
  // Load current credentials
  useEffect(() => {
    const DEFAULT_USERNAME = 'admin';
    const DEFAULT_PASSWORD = 'admin123';
    const storedUsername = localStorage.getItem('admin_username') || DEFAULT_USERNAME;
    setCurrentUsername(storedUsername);
  }, []);

  const [personalInfo, setPersonalInfo] = useState(siteData.personalInfo);
  const [experiences, setExperiences] = useState(siteData.experiences);
  const [skillCategories, setSkillCategories] = useState(siteData.skillCategories);
  const [projects, setProjects] = useState(siteData.projects);
  const [certifications, setCertifications] = useState(siteData.certifications);

  const handleSave = () => {
    updatePersonalInfo(personalInfo);
    updateExperiences(experiences);
    updateSkillCategories(skillCategories);
    updateProjects(projects);
    updateCertifications(certifications);
    alert('Changes saved successfully! Refresh the page to see updates.');
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addProject = () => {
    setProjects([...projects, {
      id: `p-${Date.now()}`,
      title: '',
      description: '',
      techStack: [],
      githubUrl: ''
    }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    const updated = [...skillCategories];
    if (!updated[categoryIndex].skills) {
      updated[categoryIndex].skills = [];
    }
    updated[categoryIndex].skills = [...updated[categoryIndex].skills, skill];
    setSkillCategories(updated);
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const updated = [...skillCategories];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    setSkillCategories(updated);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialUrl: '',
      description: ''
    }]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleResetCredentials = () => {
    setSettingsError('');
    setSettingsSuccess('');
    
    // Validate inputs
    if (!currentPassword) {
      setSettingsError('Please enter your current password');
      return;
    }
    
    if (newUsername && newUsername.length < 3) {
      setSettingsError('New username must be at least 3 characters');
      return;
    }
    
    if (newPassword && newPassword.length < 6) {
      setSettingsError('New password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setSettingsError('New passwords do not match');
      return;
    }
    
    // Verify current password
    const DEFAULT_USERNAME = 'admin';
    const DEFAULT_PASSWORD = 'admin123';
    const storedUsername = localStorage.getItem('admin_username') || DEFAULT_USERNAME;
    const storedPassword = localStorage.getItem('admin_password') || DEFAULT_PASSWORD;
    
    if (currentPassword !== storedPassword) {
      setSettingsError('Current password is incorrect');
      return;
    }
    
    // Update credentials
    if (newUsername) {
      localStorage.setItem('admin_username', newUsername);
      setCurrentUsername(newUsername);
      setNewUsername('');
    }
    
    if (newPassword) {
      localStorage.setItem('admin_password', newPassword);
      setNewPassword('');
      setConfirmPassword('');
    }
    
    setCurrentPassword('');
    setSettingsSuccess('Credentials updated successfully! You will need to log in again with your new credentials.');
    
    // Logout after 2 seconds
    setTimeout(() => {
      onLogout();
    }, 2000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4 relative">
      <BackgroundParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Portal</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Edit your portfolio content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Back to Site
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to log out?')) {
                    onLogout();
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-500 dark:text-green-400 border-b-2 border-green-500 dark:border-green-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                  <input
                    type="text"
                    value={personalInfo.role}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tagline</label>
                  <input
                    type="text"
                    value={personalInfo.tagline}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, tagline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">About</label>
                  <textarea
                    value={personalInfo.about}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, about: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={personalInfo.github}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Medium URL</label>
                  <input
                    type="url"
                    value={personalInfo.medium}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, medium: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">X (Twitter) URL</label>
                  <input
                    type="url"
                    value={personalInfo.x}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, x: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Strava URL</label>
                  <input
                    type="url"
                    value={personalInfo.strava}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, strava: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CV File</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={personalInfo.cvUrl || ""}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, cvUrl: e.target.value })}
                        placeholder="/api/upload/cv/download or https://example.com/cv.pdf"
                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      {personalInfo.cvUrl && personalInfo.cvUrl.includes('/api/upload/cv/download') && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm('Are you sure you want to remove the CV file from the database? This action cannot be undone.')) {
                              try {
                                const token = localStorage.getItem('admin_token');
                                const apiUrl = import.meta.env.VITE_API_URL || '/api';
                                const headers: HeadersInit = {
                                  'Content-Type': 'application/json',
                                };
                                if (token) {
                                  headers['Authorization'] = `Bearer ${token}`;
                                }

                                const response = await fetch(`${apiUrl}/upload/cv`, {
                                  method: 'DELETE',
                                  headers: headers,
                                });

                                if (response.ok) {
                                  setPersonalInfo({ ...personalInfo, cvUrl: '' });
                                  alert('CV file removed successfully from database.');
                                } else {
                                  let errorMessage = 'Delete failed';
                                  try {
                                    const error = await response.json();
                                    errorMessage = error.error || error.message || errorMessage;
                                  } catch (e) {
                                    errorMessage = `Delete failed with status ${response.status}`;
                                  }
                                  alert(`Failed to remove CV: ${errorMessage}`);
                                }
                              } catch (error: any) {
                                console.error('Delete CV error:', error);
                                alert(`Failed to remove CV: ${error.message || 'Unknown error'}`);
                              }
                            }
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                          title="Remove CV file from database"
                        >
                          <Trash2 size={18} />
                          Remove CV
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Check file size (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File size must be less than 5MB');
                              return;
                            }

                            // Create FormData for file upload
                            const formData = new FormData();
                            formData.append('cv', file);

                            try {
                              // Get JWT token from localStorage
                              const token = localStorage.getItem('admin_token');
                              
                              // Upload to backend - use relative URL to work with Vite proxy
                              const apiUrl = import.meta.env.VITE_API_URL || '/api';
                              const headers: HeadersInit = {};
                              if (token) {
                                headers['Authorization'] = `Bearer ${token}`;
                              }
                              // Don't set Content-Type for FormData - browser will set it with boundary
                              
                              const response = await fetch(`${apiUrl}/upload/cv`, {
                                method: 'POST',
                                headers: headers,
                                body: formData,
                              });

                              if (response.ok) {
                                const data = await response.json();
                                // Update CV URL with the uploaded file URL
                                setPersonalInfo({ ...personalInfo, cvUrl: data.url });
                                alert(`CV uploaded successfully! File stored in database.`);
                              } else {
                                let errorMessage = 'Upload failed';
                                try {
                                  const error = await response.json();
                                  errorMessage = error.error || error.message || errorMessage;
                                } catch (e) {
                                  errorMessage = `Upload failed with status ${response.status}`;
                                }
                                alert(`Upload failed: ${errorMessage}\n\nPlease ensure:\n1. Backend server is running on port 5000\n2. You are logged in with valid credentials\n3. File is a valid PDF (max 5MB)`);
                              }
                            } catch (error: any) {
                              console.error('Upload error:', error);
                              const errorMessage = error.message || 'Unknown error';
                              alert(`Failed to upload CV: ${errorMessage}\n\nPlease check:\n1. Backend server is running (http://localhost:5000)\n2. Backend is accessible\n3. No CORS or network issues`);
                            }
                          }
                        }}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        <Download size={18} className="mr-2" />
                        Upload PDF CV
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Upload a PDF file (max 5MB) or enter a URL. Files are stored in the database.
                    </p>
                    {personalInfo.cvUrl && (
                      <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                              CV File Status:
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {personalInfo.cvUrl.includes('/api/upload/cv/download') 
                                ? '✓ Stored in database' 
                                : `URL: ${personalInfo.cvUrl}`}
                            </p>
                          </div>
                          {personalInfo.cvUrl.includes('/api/upload/cv/download') && (
                            <a
                              href={personalInfo.cvUrl}
                              download
                              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                            >
                              <Download size={14} />
                              Preview
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Experience
                </button>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Experience #{index + 1}</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Skills Categories</h2>
              
              <div className="space-y-6">
                {skillCategories.map((category, catIndex) => (
                  <div key={catIndex} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category Name</label>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => {
                          const updated = [...skillCategories];
                          updated[catIndex] = { ...updated[catIndex], name: e.target.value };
                          setSkillCategories(updated);
                        }}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={category.skills.join(', ')}
                        onChange={(e) => {
                          const updated = [...skillCategories];
                          updated[catIndex] = { ...updated[catIndex], skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) };
                          setSkillCategories(updated);
                        }}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        placeholder="Skill 1, Skill 2, Skill 3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h2>
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Project
                </button>
              </div>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Project #{index + 1}</h3>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tech Stack (comma-separated)</label>
                        <input
                          type="text"
                          value={project.techStack.join(', ')}
                          onChange={(e) => updateProject(project.id, 'techStack', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={project.githubUrl || ''}
                          onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications</h2>
                <button
                  onClick={addCertification}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Certification
                </button>
              </div>

              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Certification #{index + 1}</h3>
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Certification Name</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Issue Date</label>
                          <input
                            type="text"
                            value={cert.issueDate || ''}
                            onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                            placeholder="e.g., Jan 2024"
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Expiry Date (Optional)</label>
                          <input
                            type="text"
                            value={cert.expiryDate || ''}
                            onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                            placeholder="e.g., Jan 2027"
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Credential URL (Optional)</label>
                        <input
                          type="url"
                          value={cert.credentialUrl || ''}
                          onChange={(e) => updateCertification(cert.id, 'credentialUrl', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description (Optional)</label>
                        <textarea
                          value={cert.description || ''}
                          onChange={(e) => updateCertification(cert.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Credentials</h2>
                <p className="text-slate-600 dark:text-slate-400">Change your admin username and password</p>
              </div>

              {/* Current Username Display */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Username:</span>
                </div>
                <p className="text-lg font-mono text-slate-900 dark:text-white">{currentUsername}</p>
              </div>

              {/* Error Message */}
              {settingsError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
                  {settingsError}
                </div>
              )}

              {/* Success Message */}
              {settingsSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400">
                  {settingsSuccess}
                </div>
              )}

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        setSettingsError('');
                      }}
                      placeholder="Enter your current password"
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    New Username (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => {
                        setNewUsername(e.target.value);
                        setSettingsError('');
                      }}
                      placeholder="Leave empty to keep current username"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                      minLength={3}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Minimum 3 characters</p>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    New Password (Optional)
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setSettingsError('');
                      }}
                      placeholder="Leave empty to keep current password"
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Minimum 6 characters</p>
                </div>

                {/* Confirm Password */}
                {newPassword && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setSettingsError('');
                        }}
                        placeholder="Re-enter your new password"
                        className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                        required={!!newPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Update Button */}
                <div className="pt-4">
                  <button
                    onClick={handleResetCredentials}
                    className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Key size={18} />
                    Update Credentials
                  </button>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Note:</strong> After updating your credentials, you will be logged out and need to log in again with your new username and password.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

