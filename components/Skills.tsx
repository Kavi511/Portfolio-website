
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../contexts/SiteDataContext';

interface TerminalTypingProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TerminalTyping: React.FC<TerminalTypingProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Start delay
  useEffect(() => {
    if (delay > 0) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    } else {
      setHasStarted(true);
    }
  }, [delay]);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!hasStarted) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, isComplete, onComplete, hasStarted]);

  if (!hasStarted) {
    return (
      <span className="font-mono text-white">
        <span className="opacity-0 inline-block w-0.5 h-4 align-middle bg-current"></span>
      </span>
    );
  }

  return (
    <span className="font-mono text-white">
      {displayedText}
      <span className={`ml-0.5 inline-block w-0.5 h-4 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75 bg-current`}>
      </span>
    </span>
  );
};

const Skills: React.FC = () => {
  const { siteData } = useSiteData();
  const SKILL_CATEGORIES = siteData.skillCategories;

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const baseDelay = idx * 500; // Stagger each terminal window
            const commandDelay = baseDelay + 800; // Delay for command typing
            const skillsStartDelay = commandDelay + category.name.length * 50 + 500; // Start skills after command
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-[#0C0C0C] border-2 border-[#808080] overflow-hidden shadow-2xl">
                  {/* Windows Command Prompt Title Bar */}
                  <div className="bg-[#C0C0C0] px-2 py-1 border-b-2 border-[#808080] flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-sans text-[#000080] font-semibold">
                        {category.name}
                      </span>
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
                  
                  {/* Command Prompt Content */}
                  <div className="p-4 font-mono text-sm space-y-2 bg-[#000000] text-white leading-relaxed min-h-[200px]">
                    {/* Command Prompt */}
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-white">C:\Users\Kavishka&gt;</span>
                      <TerminalTyping 
                        text={`list skills --category="${category.name}"`}
                        speed={50}
                        delay={commandDelay}
                      />
                    </div>
                    
                    {/* Skills Output with Typing Animation */}
                    <div className="space-y-1.5 pt-2">
                      {category.skills.map((skill, skillIdx) => {
                        const skillDelay = skillsStartDelay + (skillIdx * 800);
                        return (
                          <div key={skill} className="flex items-start space-x-2">
                            <span className="text-white">•</span>
                            <div className="flex-1">
                              <TerminalTyping 
                                text={skill}
                                speed={30}
                                delay={skillDelay}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Command Prompt Cursor */}
                    <div className="pt-2">
                      <span className="text-white">C:\Users\Kavishka&gt;</span>
                      <span className="text-white ml-0.5 inline-block w-0.5 h-4 align-middle animate-pulse bg-current"></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
