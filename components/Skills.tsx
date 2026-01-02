
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-blue-600 dark:text-blue-500 font-mono text-sm uppercase tracking-widest">Technical Arsenal</h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Core Skills</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive list of the tools and technologies I use to build, deploy, and maintain robust infrastructure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/20 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h4 className="text-md font-bold text-slate-900 dark:text-white">{category.name}</h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-[11px] rounded-md hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
