
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useSiteData } from "@/contexts/SiteDataContext";

const ExperienceCard: React.FC<{
  role: string;
  company: string;
  period: string;
  description: string;
}> = ({ role, company, period, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg dark:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-green-500/10 dark:bg-green-400/10 rounded-lg">
        <Briefcase size={20} className="text-green-500 dark:text-green-400" />
      </div>
      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
        {period}
      </span>
    </div>

    <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
      {role}
    </h4>

    <p className="text-green-500 dark:text-green-400 font-semibold mb-4 text-base md:text-lg">
      {company}
    </p>

    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </motion.div>
);

const Experience: React.FC = () => {
  const { siteData } = useSiteData();
  const EXPERIENCES = siteData.experiences;

  return (
    <section id="experience" className="py-24 bg-white/30 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">CAREER PATH</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            Professional journey showcasing diverse roles and responsibilities across different industries and projects.
          </p>
        </div>

        <div className="experience-ladder">
          <div className="experience-ladder__rails" aria-hidden="true" />

          <ol className="experience-ladder__list">
            {EXPERIENCES.map((exp, index) => {
              const isRight = index % 2 === 0;

              return (
                <motion.li
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`experience-ladder__item ${isRight ? 'experience-ladder__item--right' : 'experience-ladder__item--left'}`}
                >
                  <div className="experience-ladder__connector" aria-hidden="true">
                    <span className="experience-ladder__rung" />
                    <span className="experience-ladder__dot">
                      <span className="experience-ladder__dot-ping" />
                    </span>
                  </div>

                  <div className="experience-ladder__card">
                    <ExperienceCard
                      role={exp.role}
                      company={exp.company}
                      period={exp.period}
                      description={exp.description}
                    />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
