
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useSiteData } from "@/contexts/SiteDataContext";

const Experience: React.FC = () => {
  const { siteData } = useSiteData();
  const EXPERIENCES = siteData.experiences;

  return (
    <section id="experience" className="py-24 bg-white/30 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">CAREER PATH</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            Professional journey showcasing diverse roles and responsibilities across different industries and projects.
          </p>
        </div>

        {/* Ladder Design Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Ladder Structure - Two Vertical Rails */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-20 md:w-24">
            {/* Left Rail */}
            <div className="absolute left-0 h-full w-2 bg-black dark:bg-white rounded-full"></div>
            {/* Right Rail */}
            <div className="absolute right-0 h-full w-2 bg-black dark:bg-white rounded-full"></div>
          </div>

          {/* Experience Cards with Ladder Rungs */}
          <div className="space-y-12 relative">
            {EXPERIENCES.map((exp, index) => {
              const isRight = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative min-h-[120px]"
                >
                  {/* Ladder Rung - Horizontal bar connecting the two rails */}
                  <div 
                    className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-16 md:w-24 h-2 bg-black dark:bg-white z-10 rounded-full"
                  ></div>
                  
                  {/* Timeline Dot on Rung */}
                  <div 
                    className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500 dark:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6)] z-20 border-2 border-white dark:border-slate-900"
                  >
                    <div className="absolute inset-0 rounded-full bg-green-500 dark:bg-green-400 opacity-50 animate-ping"></div>
                  </div>

                  {/* Content Card - alternate sides on desktop (first card on the right) */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] relative z-10 ${
                    isRight ? 'md:ml-[calc(50%+3rem)]' : 'md:mr-[calc(50%+3rem)]'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg dark:shadow-xl transition-all"
                    >
                      {/* Icon and Date */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-500/10 dark:bg-green-400/10 rounded-lg">
                          <Briefcase size={20} className="text-green-500 dark:text-green-400" />
                        </div>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {exp.period}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {exp.role}
                      </h4>

                      {/* Company Name */}
                      <p className="text-green-500 dark:text-green-400 font-semibold mb-4 text-base md:text-lg">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
