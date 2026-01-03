
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Cloud } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const About: React.FC = () => {
  const { siteData } = useSiteData();
  const PERSONAL_INFO = siteData.personalInfo;
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2 text-center">
              <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">About Me</h3>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">Crafting Scalable Cloud Ecosystems</h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-center">
              {PERSONAL_INFO.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500 dark:text-green-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Location</h4>
                  <p className="text-slate-500 text-sm">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-500">
                  <GraduationCap size={20} />
                </div>
                <div className="w-full">
                  <h4 className="text-slate-900 dark:text-white font-medium mb-2">Education</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm whitespace-pre-line leading-relaxed">
                    {PERSONAL_INFO.education || "CINEC Campus (Pvt) Ltd – Sri Lanka\nBSc (Hons) Computer Science (University of Wolverhampton)"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400">
                  <Cloud size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Interests</h4>
                  <p className="text-slate-500 text-sm">Cloud Platforms, DevOps Tools, CI/CD Automation and Scalable Systems</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
