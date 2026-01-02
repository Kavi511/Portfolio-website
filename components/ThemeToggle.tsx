import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showSystem?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showSystem = false 
}) => {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    // Prevent hydration mismatch - return a placeholder
    return (
      <button
        className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors ${className}`}
        aria-label="Toggle Theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const handleToggle = () => {
    if (showSystem) {
      // Cycle through: light -> dark -> system -> light
      if (theme === 'light') {
        setTheme('dark');
      } else if (theme === 'dark') {
        setTheme('system');
      } else {
        setTheme('light');
      }
    } else {
      // Simple toggle between light and dark
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
  };

  const getIcon = () => {
    if (showSystem && theme === 'system') {
      return <Monitor size={20} />;
    }
    return resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />;
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative overflow-hidden ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Current: ${theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme === 'system' ? 'system' : resolvedTheme}
          initial={{ y: 20, opacity: 0, rotate: -180 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;

