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
  const [showCursorAfterComplete, setShowCursorAfterComplete] = useState(true);

  // Blinking cursor animation during typing
  useEffect(() => {
    if (!showCursorProp || isComplete) return;
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [showCursorProp, isComplete]);

  // Blinking cursor animation after completion
  useEffect(() => {
    if (!showCursorAfterCompleteProp || !isComplete) return;
    const cursorInterval = setInterval(() => {
      setShowCursorAfterComplete(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [showCursorAfterCompleteProp, isComplete]);

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
      {showCursorProp && !isComplete && (
        <span className={`inline-block ml-0.5 w-[2px] h-4 align-middle bg-slate-900 dark:bg-white ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>
        </span>
      )}
      {isComplete && showCursorAfterCompleteProp && (
        <span className={`inline-block ml-0.5 w-[2px] h-4 align-middle bg-slate-900 dark:bg-white ${showCursorAfterComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>
        </span>
      )}
    </span>
  );
};

export default TerminalTypingText;

