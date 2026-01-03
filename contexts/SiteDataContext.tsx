import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Experience, SkillCategory, Project, Certification } from '../types';
import * as defaultData from '../constants';

interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  about: string;
  location: string;
  education: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  medium: string;
  x: string;
}

interface ProfessionalSummary {
  title: string;
  description: string;
  highlights: string[];
}

interface SiteData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  experiences: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}

interface SiteDataContextType {
  siteData: SiteData;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateProfessionalSummary: (data: Partial<ProfessionalSummary>) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  resetToDefaults: () => void;
  saveToStorage: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

const loadFromStorage = (): SiteData | null => {
  try {
    const stored = localStorage.getItem('portfolio-site-data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading site data from storage:', error);
  }
  return null;
};

const saveToStorage = (data: SiteData) => {
  try {
    localStorage.setItem('portfolio-site-data', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving site data to storage:', error);
  }
};

const getInitialData = (): SiteData => {
  const stored = loadFromStorage();
  const defaults = {
    personalInfo: { ...defaultData.PERSONAL_INFO },
    professionalSummary: { ...defaultData.PROFESSIONAL_SUMMARY },
    experiences: [...defaultData.EXPERIENCES],
    skillCategories: defaultData.SKILL_CATEGORIES.map(({ icon, ...rest }) => rest),
    projects: [...defaultData.PROJECTS],
    certifications: [...(defaultData.CERTIFICATIONS || [])],
  };
  
  if (stored) {
    // Merge stored data with defaults to ensure new fields are included
    // For experiences, always use defaults for experiences that exist in defaults (to get updates)
    // Keep any additional stored experiences that don't exist in defaults
    const defaultExpIds = new Set(defaults.experiences.map(exp => exp.id));
    const additionalStored = stored.experiences?.filter((storedExp: Experience) => 
      !defaultExpIds.has(storedExp.id)
    ) || [];
    
    // For skillCategories, always use defaults to ensure consistency with code updates
    // User can edit via Admin portal if needed
    return {
      personalInfo: { ...defaults.personalInfo, ...stored.personalInfo },
      professionalSummary: { ...defaults.professionalSummary, ...stored.professionalSummary },
      experiences: [...defaults.experiences, ...additionalStored],
      skillCategories: defaults.skillCategories,
      projects: stored.projects || defaults.projects,
      certifications: stored.certifications || defaults.certifications,
    };
  }
  
  return defaults;
};

interface SiteDataProviderProps {
  children: ReactNode;
}

export const SiteDataProvider: React.FC<SiteDataProviderProps> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(getInitialData);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setSiteData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  };

  const updateProfessionalSummary = (data: Partial<ProfessionalSummary>) => {
    setSiteData(prev => ({
      ...prev,
      professionalSummary: { ...prev.professionalSummary, ...data }
    }));
  };

  const updateExperiences = (experiences: Experience[]) => {
    setSiteData(prev => ({ ...prev, experiences }));
  };

  const updateSkillCategories = (categories: SkillCategory[]) => {
    setSiteData(prev => ({ ...prev, skillCategories: categories }));
  };

  const updateProjects = (projects: Project[]) => {
    setSiteData(prev => ({ ...prev, projects }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setSiteData(prev => ({ ...prev, certifications }));
  };

  const resetToDefaults = () => {
    const defaults = {
      personalInfo: { ...defaultData.PERSONAL_INFO },
      professionalSummary: { ...defaultData.PROFESSIONAL_SUMMARY },
      experiences: [...defaultData.EXPERIENCES],
      skillCategories: defaultData.SKILL_CATEGORIES.map(({ icon, ...rest }) => rest),
      projects: [...defaultData.PROJECTS],
      certifications: [...(defaultData.CERTIFICATIONS || [])],
    };
    setSiteData(defaults);
    saveToStorage(defaults);
  };

  const saveToStorageHandler = () => {
    saveToStorage(siteData);
  };

  // Migration: Ensure education field exists on mount
  useEffect(() => {
    if (!siteData.personalInfo.education) {
      setSiteData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          education: defaultData.PERSONAL_INFO.education
        }
      }));
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    saveToStorage(siteData);
  }, [siteData]);

  const value: SiteDataContextType = {
    siteData,
    updatePersonalInfo,
    updateProfessionalSummary,
    updateExperiences,
    updateSkillCategories,
    updateProjects,
    updateCertifications,
    resetToDefaults,
    saveToStorage: saveToStorageHandler,
  };

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
};

