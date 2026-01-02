
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Server, Shield } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const ProfessionalSummary: React.FC = () => {
  const { siteData } = useSiteData();
  const PROFESSIONAL_SUMMARY = siteData.professionalSummary;
  return (
    <section className="py-24 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {PROFESSIONAL_SUMMARY.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {PROFESSIONAL_SUMMARY.description}
            </p>
            <ul className="space-y-4 pt-4">
              {PROFESSIONAL_SUMMARY.highlights.map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center text-slate-700 dark:text-slate-300 font-medium"
                >
                  <CheckCircle2 className="text-green-500 dark:text-green-400 mr-3 shrink-0" size={20} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#0C0C0C] border-2 border-[#808080] overflow-hidden shadow-2xl">
              {/* Windows Command Prompt Title Bar */}
              <div className="bg-[#C0C0C0] px-2 py-1 border-b-2 border-[#808080] flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-sans text-[#000080] font-semibold">Administrator: Command Prompt</span>
                </div>
                <div className="flex items-center space-x-0.5">
                  <button className="w-5 h-5 border border-[#808080] bg-[#C0C0C0] hover:bg-[#D4D0C8] flex items-center justify-center">
                    <span className="text-[10px] text-[#000000] leading-none">_</span>
                  </button>
                  <button className="w-5 h-5 border border-[#808080] bg-[#C0C0C0] hover:bg-[#D4D0C8] flex items-center justify-center">
                    <span className="text-[10px] text-[#000000] leading-none">□</span>
                  </button>
                  <button className="w-5 h-5 border border-[#808080] bg-[#C0C0C0] hover:bg-[#D4D0C8] flex items-center justify-center">
                    <span className="text-[10px] text-[#000000] leading-none">×</span>
                  </button>
                </div>
              </div>
              {/* Command Prompt Content - Windows CMD Style with color 0A (black bg, light green text) */}
              <div className="p-4 font-mono text-sm sm:text-base space-y-2 bg-[#000000] text-[#00FF00] leading-relaxed">
                {/* Command Prompt */}
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[#00FF00]">C:\Users\Kavishka&gt;</span>
                  <span className="text-[#00FF00]">kubectl</span>
                  <span className="text-[#00FF00]">get methodology --output=summary</span>
                </div>
                {/* Output - Windows CMD Style */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-3 text-[#00FF00]">
                    <Zap className="text-[#FFFF00]" size={18} />
                    <span>Automation-First Workflow</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#00FF00]">
                    <Server className="text-[#00FF00]" size={18} />
                    <span>Infrastructure as Code (IaC)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#00FF00]">
                    <Shield className="text-[#00FF00]" size={18} />
                    <span>Secure Cloud Operations</span>
                  </div>
                </div>
                {/* Command Prompt Cursor */}
                <div className="pt-1">
                  <span className="text-[#00FF00]">C:\Users\Kavishka&gt;</span>
                  <span className="text-[#00FF00] ml-1 animate-pulse">_</span>
                </div>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/5 dark:bg-green-500/10 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSummary;
