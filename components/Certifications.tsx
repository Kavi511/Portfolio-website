
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Certifications: React.FC = () => {
  const { siteData } = useSiteData();
  const CERTIFICATIONS = siteData.certifications;

  return (
    <section id="certifications" className="py-24 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">Credentials</h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Certifications</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            Professional certifications and credentials relevant to the field, demonstrating expertise and industry knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-green-500/20 transition-all flex flex-col h-full"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-green-500/10 rounded-xl text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                      aria-label="View credential"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                  {cert.name}
                </h4>
                
                <p className="text-green-500 dark:text-green-400 font-medium mb-3 text-sm">
                  {cert.issuer}
                </p>
                
                {cert.issueDate && (
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono mb-4">
                    Issued: {cert.issueDate}
                    {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                  </p>
                )}
                
                {cert.description && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {cert.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

