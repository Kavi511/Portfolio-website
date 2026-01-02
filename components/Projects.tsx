
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Box } from 'lucide-react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-blue-500 font-mono text-sm uppercase tracking-widest">My Work</h3>
          <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden bg-slate-800 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700">
                   <img 
                     src={`https://picsum.photos/seed/${project.id}/600/400`} 
                     alt={project.title}
                     className="w-full h-full object-cover"
                   />
                </div>
                <div className="relative z-10 w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 backdrop-blur-sm border border-blue-500/20">
                  <Box size={32} />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center space-x-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-slate-400 hover:text-white transition-colors flex items-center text-sm font-medium">
                      <Github size={18} className="mr-2" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-slate-400 hover:text-white transition-colors flex items-center text-sm font-medium">
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
