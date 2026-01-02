
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AVAILABLE FOR NEW OPPORTUNITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{PERSONAL_INFO.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-8"
          >
            {PERSONAL_INFO.role}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl"
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-slate-200 transition-all group shadow-lg shadow-blue-600/20 dark:shadow-none"
            >
              Get In Touch
              <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="flex items-center justify-center px-8 py-4 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/10 transition-all group"
            >
              Download CV
              <Download className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase mb-4">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
