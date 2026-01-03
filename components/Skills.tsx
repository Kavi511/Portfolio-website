
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Cpu, Box, Activity, ShieldCheck, Database, Code2, Network, Terminal } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Skills: React.FC = () => {
  const { siteData } = useSiteData();
  const SKILL_CATEGORIES = siteData.skillCategories;

  // Icon mapping based on category name
  const getIcon = (categoryName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Cloud & Infrastructure': <Cloud className="w-6 h-6" />,
      'Infrastructure as Code (IaC)': <Cpu className="w-6 h-6" />,
      'IaC': <Cpu className="w-6 h-6" />,
      'Containers & CI/CD': <Box className="w-6 h-6" />,
      'Monitoring & Observability': <Activity className="w-6 h-6" />,
      'Security & Networking': <ShieldCheck className="w-6 h-6" />,
      'DNS & SSL Management': <Network className="w-6 h-6" />,
      'Systems & Automation': <Terminal className="w-6 h-6" />,
      'Databases & Platforms': <Database className="w-6 h-6" />,
      'IDEs & Developer Tools': <Code2 className="w-6 h-6" />,
      'Developer Tools': <Code2 className="w-6 h-6" />,
    };
    return iconMap[categoryName] || <Code2 className="w-6 h-6" />;
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest mb-2">
            Technical Arsenal
          </h3>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Core Skills
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            A comprehensive list of the tools and technologies I use to build, deploy, and maintain robust infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:border-green-500/50 transition-all duration-300 shadow-lg dark:shadow-2xl hover:shadow-2xl hover:-translate-y-2">
                
                {/* Icon Section */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="text-green-500 dark:text-green-400">
                      {getIcon(category.name)}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>

                {/* Category Name */}
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative z-10 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                  {category.name}
                </h4>
                
                {/* Skills List */}
                <div className="space-y-3 relative z-10">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + skillIdx * 0.05, duration: 0.3 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
