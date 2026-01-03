
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalTypingProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

const TerminalTyping: React.FC<TerminalTypingProps> = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete,
  showCursor: showCursorProp = true
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
    if (!showCursorProp) return;
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [showCursorProp]);

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
      <span className="font-mono text-green-500 dark:text-green-400">
        {showCursorProp && <span className="opacity-0 inline-block w-0.5 h-4 align-middle bg-current"></span>}
      </span>
    );
  }

  return (
    <span className="font-mono text-green-500 dark:text-green-400">
      {displayedText}
      {showCursorProp && (
        <span className={`ml-0.5 inline-block w-0.5 h-4 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75 bg-current`}>
        </span>
      )}
    </span>
  );
};

const About: React.FC = () => {
  const helloTranslations = [
    { lang: 'English', text: 'Hello' },
    { lang: 'Mandarin Chinese', text: '你好' },
    { lang: 'Hindi', text: 'नमस्ते' },
    { lang: 'Spanish', text: 'Hola' },
    { lang: 'French', text: 'Bonjour' },
    { lang: 'Sinhala', text: 'ආයුබෝවන්' }
  ];

  const [currentHelloIndex, setCurrentHelloIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHelloIndex((prev) => (prev + 1) % helloTranslations.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Realistic cursor blink animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Realistic terminal cursor blink timing
    return () => clearInterval(cursorInterval);
  }, []);

  const aboutText = [
    "I'm a final year Computer Science undergraduate with a strong sense of responsibility",
    "and a practical approach to solving challenges. My passion lies in the fields of",
    "DevOps and Cloud Engineering and I am actively learning and exploring these areas",
    "through hands on projects and continuous self study. Although I do not have prior",
    "professional experience in DevOps or Cloud, I'm eager to apply my knowledge and",
    "grow my skills to contribute to real world projects involving automation, CI/CD",
    "pipelines and system reliability to build a strong foundation in this field. I thrive",
    "in collaborative environments and enjoy working with teams to deliver efficient and",
    "high quality solutions."
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">About Me</h3>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3 min-h-[3rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentHelloIndex}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-block"
              >
                {helloTranslations[currentHelloIndex].text}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            A brief professional introduction and overview of who I am
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#0C0C0C] border-2 border-[#808080] overflow-hidden shadow-2xl">
            {/* Windows Command Prompt Title Bar */}
            <div className="bg-[#C0C0C0] px-2 py-1 border-b-2 border-[#808080] flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-sans text-[#000080] font-semibold">
                  About Me
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
            <div className="p-6 font-mono text-base space-y-2 bg-[#000000] text-white leading-relaxed min-h-[400px]">
              {/* Command Prompt */}
              <div className="flex flex-wrap items-center gap-1 mb-4">
                <span className="text-white">C:\Users\Kavishka&gt;</span>
                <TerminalTyping 
                  text="about.txt"
                  speed={50}
                  delay={500}
                  showCursor={false}
                />
              </div>
              
              {/* About Text Output with Typing Animation */}
              <div className="pt-2 text-justify" style={{ textAlignLast: 'left', wordSpacing: '0.05em', letterSpacing: '0.01em', lineHeight: '1.8' }}>
                {aboutText.map((line, lineIdx) => {
                  const lineDelay = 2000 + (lineIdx * 1500);
                  const isLastLine = lineIdx === aboutText.length - 1;
                  return (
                    <span key={lineIdx}>
                      <TerminalTyping 
                        text={lineIdx === 0 ? line : ' ' + line}
                        speed={30}
                        delay={lineDelay}
                        showCursor={false}
                      />
                      {!isLastLine && <span className="inline-block w-0"></span>}
                    </span>
                  );
                })}
              </div>
              
              {/* Command Prompt Cursor */}
              <div className="pt-4">
                <span className="text-white">C:\Users\Kavishka&gt;</span>
                <span className={`text-white ml-0.5 inline-block w-0.5 h-4 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150 bg-current`}></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
