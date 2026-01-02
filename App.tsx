
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProfessionalSummary from './components/ProfessionalSummary';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundParticles from './components/BackgroundParticles';
import { Terminal } from 'lucide-react';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <div className="min-h-screen selection:bg-blue-500/30 relative transition-colors duration-300">
        <BackgroundParticles />
        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <ProfessionalSummary />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <footer className="py-12 border-t border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm relative z-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                  <Terminal size={18} />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                  Kavishka Herath
                </span>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                &copy; {new Date().getFullYear()} Kavishka Herath. Built with React & Tailwind.
              </p>

              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy</a>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
