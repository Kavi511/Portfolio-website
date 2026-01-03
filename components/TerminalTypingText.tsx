import React, { useState, useEffect } from 'react';

interface TerminalTypingTextProps {
  text: string;
  speed?: number;
  prompt?: string;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  showCursorAfterComplete?: boolean;
}

const TerminalTypingText: React.FC<TerminalTypingTextProps> = ({ 
  text, 
  speed = 80, 
  prompt = '$ ',
  className = '',
  onComplete,
  showCursor: showCursorProp = true,
  showCursorAfterComplete: showCursorAfterCompleteProp = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

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
      <span className="text-slate-900 dark:text-white">{prompt}</span>
      <span className="text-slate-700 dark:text-slate-300">{displayedText}</span>
      {showCursorProp && (
        <span className={`text-slate-900 dark:text-white ml-0.5 inline-block w-0.5 h-4 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75 bg-current`}>
        </span>
      )}
      {!showCursorProp && isComplete && showCursorAfterCompleteProp && (
        <span className="text-slate-900 dark:text-white ml-0.5 inline-block w-0.5 h-4 align-middle animate-pulse bg-current">
        </span>
      )}
    </span>
  );
};

export default TerminalTypingText;

