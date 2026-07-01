import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HELLO_TRANSLATIONS = [
  { lang: 'English', text: 'Hello' },
  { lang: 'Mandarin Chinese', text: '你好' },
  { lang: 'Hindi', text: 'नमस्ते' },
  { lang: 'Spanish', text: 'Hola' },
  { lang: 'French', text: 'Bonjour' },
  { lang: 'Sinhala', text: 'ආයුබෝවන්' },
];

interface HelloRotatorProps {
  className?: string;
  intervalMs?: number;
}

const HelloRotator: React.FC<HelloRotatorProps> = ({
  className = 'text-4xl md:text-5xl font-bold text-green-500 dark:text-green-400',
  intervalMs = 2000,
}) => {
  const [currentHelloIndex, setCurrentHelloIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHelloIndex((prev) => (prev + 1) % HELLO_TRANSLATIONS.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <div className={`flex items-center min-h-[1.2em] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentHelloIndex}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
        >
          {HELLO_TRANSLATIONS[currentHelloIndex].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default HelloRotator;
