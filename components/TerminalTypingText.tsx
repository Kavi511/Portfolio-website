import React, { useState, useEffect } from 'react';

interface TerminalTypingTextProps {
  text: string;
  speed?: number;
  prompt?: string;
  className?: string;
  onComplete?: () => void;
}

const TerminalTypingText: React.FC<TerminalTypingTextProps> = ({ 
  text, 
  speed = 80, 
  prompt = '$ ',
  className = '',
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
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
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      <span className="text-green-500 dark:text-green-400">{prompt}</span>
      <span className="text-slate-700 dark:text-slate-300">{displayedText}</span>
      <span className={`text-green-500 dark:text-green-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}>
        ▊
      </span>
    </span>
  );
};

export default TerminalTypingText;

