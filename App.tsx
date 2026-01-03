
import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SiteDataProvider, useSiteData } from './contexts/SiteDataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Admin from './components/Admin';
import Login from './components/Login';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import BackgroundParticles from './components/BackgroundParticles';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

function AppContent() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated in this session
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { siteData } = useSiteData();

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAdmin(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setShowAdmin(false);
  };

  return (
    <>
      {showAdmin && isAuthenticated ? (
        <Admin onClose={handleLogout} />
      ) : showAdmin && !isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen selection:bg-green-500/30 relative transition-colors duration-300">
          <BackgroundParticles />
          <Navbar onAdminClick={() => setShowAdmin(true)} />
          
          <main className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Certifications />
          </main>

          <footer id="footer" className="py-16 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/50 backdrop-blur-sm relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Contact Me Section */}
              <div className="mb-12">
                <div className="space-y-4 mb-8">
                  <h3 className="text-green-500 dark:text-green-400 font-mono text-sm uppercase tracking-widest">Connectivity</h3>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">Contact Me</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border-slate-200 dark:border-white/5 group hover:border-blue-500/20 transition-all shadow-sm dark:shadow-none">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email</p>
                      <a href={`mailto:${siteData.personalInfo.email}`} className="text-slate-900 dark:text-white font-medium hover:text-blue-500 transition-colors text-sm">
                        {siteData.personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border-slate-200 dark:border-white/5 group hover:border-red-500/20 transition-all shadow-sm dark:shadow-none">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Phone</p>
                      <a href={`tel:${siteData.personalInfo.phone.replace(/\s/g, '')}`} className="text-slate-900 dark:text-white font-medium hover:text-red-500 transition-colors text-sm">
                        {siteData.personalInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 items-center justify-center mb-8">
                    <a 
                      href={siteData.personalInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-[#0077B5] dark:hover:text-[#0077B5] hover:border-[#0077B5]/30 shadow-sm dark:shadow-none transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a 
                      href={siteData.personalInfo.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900/30 dark:hover:border-white/20 shadow-sm dark:shadow-none transition-all"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                    <a 
                      href={siteData.personalInfo.medium} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 shadow-sm dark:shadow-none transition-all"
                      aria-label="Medium"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.77A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.77A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-2.35 6.42-5.27 6.42-2.93 0-5.27-2.88-5.27-6.42s2.35-6.42 5.27-6.42c2.92 0 5.27 2.88 5.27 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                      </svg>
                    </a>
                    <a 
                      href={siteData.personalInfo.x} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900/30 dark:hover:border-white/20 shadow-sm dark:shadow-none transition-all"
                      aria-label="X (Twitter)"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a 
                      href={siteData.personalInfo.strava || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-[#FC4C02] dark:hover:text-[#FC4C02] hover:border-[#FC4C02]/30 shadow-sm dark:shadow-none transition-all"
                      aria-label="Strava"
                    >
                      <svg width="22" height="22" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M120 288L232 56l112 232h-72l-40-96-40 96z" fill="currentColor"/>
                        <path d="M280 288l32 72 32-72h48l-80 168-80-168z" fill="currentColor" opacity="0.8"/>
                      </svg>
                    </a>
                  </div>
              </div>

              {/* Footer Bottom */}
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 pt-8 border-t border-slate-200 dark:border-white/5">
                <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                  &copy; {new Date().getFullYear()} {siteData.personalInfo.name}. Built with React & Tailwind.
                </p>

                <div className="flex space-x-6 text-sm">
                  <button 
                    onClick={() => setShowPrivacy(true)}
                    className="text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Privacy
                  </button>
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Terms
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
      
      {/* Modals */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SiteDataProvider>
        <AppContent />
      </SiteDataProvider>
    </ThemeProvider>
  );
}

export default App;
