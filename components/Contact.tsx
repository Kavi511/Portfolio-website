
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Contact: React.FC = () => {
  const { siteData } = useSiteData();
  const PERSONAL_INFO = siteData.personalInfo;
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">Connectivity</h3>
              <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">Let's Build Something Great Together</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                Looking for a dedicated DevOps associate or have a project that needs cloud scaling? Reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border-slate-200 dark:border-white/5 group hover:border-blue-500/20 transition-all shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-900 dark:text-white font-medium hover:text-blue-500 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border-slate-200 dark:border-white/5 group hover:border-green-500/20 transition-all shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Phone</p>
                  <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`} className="text-slate-900 dark:text-white font-medium hover:text-green-500 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-[#0077B5] dark:hover:text-[#0077B5] hover:border-[#0077B5]/30 shadow-sm dark:shadow-none transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-white dark:hover:text-white hover:border-white/20 shadow-sm dark:shadow-none transition-all"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a 
                href={PERSONAL_INFO.medium} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 shadow-sm dark:shadow-none transition-all"
                aria-label="Medium"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.77A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.77A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-2.35 6.42-5.27 6.42-2.93 0-5.27-2.88-5.27-6.42s2.35-6.42 5.27-6.42c2.92 0 5.27 2.88 5.27 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
              <a 
                href={PERSONAL_INFO.x} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-white dark:hover:text-white hover:border-white/20 shadow-sm dark:shadow-none transition-all"
                aria-label="X (Twitter)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-green-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-green-500/50 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry about DevOps Role"
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Your Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center group active:scale-[0.98]">
                Send Message
                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
