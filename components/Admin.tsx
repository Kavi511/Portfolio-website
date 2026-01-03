import React, { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';
import { Save, X, Plus, Trash2, Home, RotateCcw, Download } from 'lucide-react';
import { Experience, SkillCategory, Project, Certification } from '../types';

interface AdminProps {
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({ onClose }) => {
  const { siteData, updatePersonalInfo, updateExperiences, updateSkillCategories, updateProjects, updateCertifications, resetToDefaults } = useSiteData();
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'skills' | 'projects' | 'certifications'>('personal');

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

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
      window.location.reload();
    }
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

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Portal</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Edit your portfolio content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Back to Site
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
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Education</label>
                  <textarea
                    value={personalInfo.education}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, education: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Enter education details (use new lines for multiple lines)"
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
                    <input
                      type="text"
                      value={personalInfo.cvUrl || ""}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, cvUrl: e.target.value })}
                      placeholder="/cv.pdf or https://example.com/cv.pdf"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // For client-side only: store as data URL or path
                            // In a real app, you'd upload to a server
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              // Store the file name/path
                              // Note: In a real app, you'd upload this to a server
                              const fileName = file.name;
                              // For now, we'll just use the file name
                              // User needs to place the file in the public folder
                              setPersonalInfo({ ...personalInfo, cvUrl: `/${fileName}` });
                              alert(`File selected: ${fileName}\n\nPlease ensure this file is placed in the public folder of your project.\nThe CV URL has been set to: /${fileName}`);
                            };
                            reader.readAsDataURL(file);
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
                      Enter a path (e.g., /cv.pdf) or upload a PDF file. If uploading, place the file in the public folder.
                    </p>
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
        </div>
      </div>
    </div>
  );
};

export default Admin;

