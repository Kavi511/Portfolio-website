
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Experience: React.FC = () => {
  const { siteData } = useSiteData();
  const EXPERIENCES = siteData.experiences;
  return (
    <section id="experience" className="py-24 bg-white/30 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">Career Path</h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-px h-full w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 dark:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6)] z-10"></div>

                {/* Content Card */}
                <div className="ml-8 md:ml-0 md:w-[45%]">
                  <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-green-500/30 dark:hover:border-white/10 transition-all group shadow-sm dark:shadow-none">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-500/10 text-green-500 dark:text-green-400 rounded-lg">
                        <Briefcase size={18} />
                      </div>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{exp.period}</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors mb-1">{exp.role}</h4>
                    <p className="text-green-500 dark:text-green-400 font-medium mb-4">{exp.company}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
