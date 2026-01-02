
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Projects: React.FC = () => {
  const { siteData } = useSiteData();
  const PROJECTS = siteData.projects;
  return (
    <section id="projects" className="py-24 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">My Work</h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-green-500/20 transition-all flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden bg-slate-200 dark:bg-slate-800 transition-colors duration-300">
                <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                   <img 
                     src={`https://picsum.photos/seed/${project.id}/600/400`} 
                     alt={project.title}
                     className="w-full h-full object-cover"
                   />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-0.5 rounded-md border border-green-300 dark:border-green-400/20 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                  {project.title}
                </h4>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow transition-colors duration-300">
                  {project.description}
                </p>

                <div className="flex items-center space-x-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-slate-600 dark:text-slate-400 hover:text-green-500 dark:hover:text-white transition-colors duration-300 flex items-center text-sm font-medium">
                      <Github size={18} className="mr-2" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-slate-600 dark:text-slate-400 hover:text-green-500 dark:hover:text-white transition-colors duration-300 flex items-center text-sm font-medium">
                      <ExternalLink size={18} className="mr-2" />
                      Live Demo
                    </a>
                  )}
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
