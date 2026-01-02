
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Cloud } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-blue-600 dark:text-blue-500 font-mono text-sm uppercase tracking-widest">About Me</h3>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">Crafting Scalable Cloud Ecosystems</h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {PERSONAL_INFO.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Location</h4>
                  <p className="text-slate-500 text-sm">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-500">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Education</h4>
                  <p className="text-slate-500 text-sm">Computer Science Final Year</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-500">
                  <Cloud size={20} />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Interests</h4>
                  <p className="text-slate-500 text-sm">Cloud, DevOps & Automation</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-2 shadow-xl dark:shadow-none">
               <img 
                 src="https://picsum.photos/seed/devops/800/800" 
                 alt="Professional workspace" 
                 className="w-full h-full object-cover rounded-2xl opacity-80 transition-all duration-700 dark:grayscale dark:hover:grayscale-0"
               />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-2xl dark:shadow-none border-white/5">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Entry</div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Level Engineer</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
