
import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Contact: React.FC = () => {
  const { siteData } = useSiteData();
  const PERSONAL_INFO = siteData.personalInfo;
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none"
          >
            <div className="text-center mb-8">
              <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest mb-2">Contact Form</h3>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Send a Message</h2>
            </div>
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
