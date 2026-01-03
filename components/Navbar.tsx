
import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Get In Touch', href: '#footer' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4 shadow-sm dark:shadow-none' 
        : 'bg-transparent py-6'
    } transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center relative">
          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="absolute right-0 flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Portal Icon */}
            <button
              onClick={onAdminClick}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors hidden md:block"
              aria-label="Admin Portal"
              title="Admin Portal"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className="text-slate-900 dark:text-slate-100 p-2 transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300"
          >
            <div className="px-4 py-8 flex flex-col space-y-4 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-green-500"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminClick();
                }}
                className="w-full text-center py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Settings size={20} />
                Admin Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
