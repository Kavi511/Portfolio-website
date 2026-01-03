
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2 } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Projects: React.FC = () => {
  const { siteData } = useSiteData();
  const PROJECTS = siteData.projects;
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-black transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest font-semibold">My Work</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4 leading-relaxed">
            A collection of projects demonstrating the practical application of the field, related technologies and other areas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full flex flex-col glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-green-500/40 dark:hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-500/5 hover:-translate-y-1">
                {/* Header with icon */}
                <div className="p-6 pb-4 border-b border-slate-200/50 dark:border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 rounded-xl text-green-500 dark:text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 inline-block">
                      <Code2 size={24} />
                    </div>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all duration-300"
                        aria-label="View code on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                    {project.title}
                  </h4>
                </div>

                {/* Content */}
                <div className="p-6 pt-4 flex flex-col flex-grow">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIdx) => (
                        <motion.span 
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + techIdx * 0.03, duration: 0.3 }}
                          className="text-[10px] font-mono text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-md border border-green-200 dark:border-green-500/30 hover:bg-green-100 dark:hover:bg-green-500/20 hover:border-green-300 dark:hover:border-green-500/50 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
