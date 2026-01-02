
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Server, Shield } from 'lucide-react';
import { PROFESSIONAL_SUMMARY } from '../constants';

const ProfessionalSummary: React.FC = () => {
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
                  <CheckCircle2 className="text-blue-600 dark:text-blue-500 mr-3 shrink-0" size={20} />
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
            <div className="glass-card rounded-2xl border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl dark:shadow-none">
              <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">devops-summary.sh</div>
              </div>
              <div className="p-8 font-mono text-sm sm:text-base space-y-4 bg-white/50 dark:bg-transparent">
                <div className="flex space-x-2">
                  <span className="text-emerald-600 dark:text-green-400">$</span>
                  <span className="text-blue-600 dark:text-blue-400">kubectl</span>
                  <span className="text-slate-700 dark:text-slate-300">get methodology --output=summary</span>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex items-center space-x-4 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <Zap className="text-yellow-500 dark:text-yellow-400" size={20} />
                    <span>Automation-First Workflow</span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <Server className="text-blue-600 dark:text-blue-400" size={20} />
                    <span>Infrastructure as Code (IaC)</span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <Shield className="text-emerald-600 dark:text-emerald-400" size={20} />
                    <span>Secure Cloud Operations</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 dark:bg-blue-600/10 blur-[100px] rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSummary;
