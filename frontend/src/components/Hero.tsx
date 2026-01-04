
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin } from 'lucide-react';
import { useSiteData } from "@/contexts/SiteDataContext";
import TypingText from './TypingText';
import TerminalTypingText from './TerminalTypingText';

const Hero: React.FC = () => {
  const { siteData } = useSiteData();
  const PERSONAL_INFO = siteData.personalInfo;
  const [showRole, setShowRole] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Determine the correct download URL
      let downloadUrl: string;
      
      // Check if we're accessing from network IP (not localhost)
      const isNetworkAccess = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      
      // Always use the standard endpoint path (ignore cvUrl from database for internal downloads)
      const endpointPath = '/api/upload/cv/download';
      
      if (PERSONAL_INFO.cvUrl?.startsWith('http')) {
        // External URL - use as is
        downloadUrl = PERSONAL_INFO.cvUrl;
      } else if (isNetworkAccess) {
        // For network access, construct full URL using current hostname and backend port
        const backendPort = '5000';
        downloadUrl = `http://${window.location.hostname}:${backendPort}${endpointPath}`;
      } else {
        // Use relative path - Vite proxy will handle it for localhost
        downloadUrl = endpointPath;
      }
      
      console.log('Downloading CV from:', downloadUrl);
      console.log('Current hostname:', window.location.hostname);
      console.log('Is network access:', isNetworkAccess);
      
      // Fetch the PDF file
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Download failed:', response.status, errorText);
        throw new Error(`Failed to download CV: ${response.status} ${response.statusText}`);
      }
      
      // Check if response is actually a PDF
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/pdf')) {
        console.warn('Unexpected content type:', contentType);
      }
      
      // Get the blob
      const blob = await response.blob();
      
      // Verify blob is not empty
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      console.log('Downloaded blob size:', blob.size, 'bytes');
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error: any) {
      console.error('Error downloading CV:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      alert(`Failed to download CV: ${errorMessage}\n\nPlease ensure:\n1. Backend server is running on port 5000\n2. CV file is uploaded to the database\n3. Check browser console for details`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="max-w-3xl lg:max-w-none">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 min-h-[1.2em]"
            >
              <TypingText 
                text="I'm "
                speed={80}
                className=""
                onComplete={() => {
                  setTimeout(() => setShowRole(true), 300);
                }}
              />
              {showRole && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500">
                  <TypingText 
                    text={PERSONAL_INFO.name}
                    speed={80}
                    onComplete={() => {
                      setTimeout(() => setShowTagline(true), 500);
                    }}
                  />
                </span>
              )}
            </motion.h1>

            {showRole && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-semibold mb-8 min-h-[1.5em]"
              >
                <TerminalTypingText 
                  text={PERSONAL_INFO.role}
                  speed={50}
                  prompt="$ "
                  className="text-slate-700 dark:text-slate-300"
                  showCursor={false}
                  showCursorAfterComplete={false}
                  onComplete={() => {
                    setTimeout(() => setShowTagline(true), 500);
                  }}
                />
              </motion.h2>
            )}

            {showTagline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg mb-6 leading-relaxed max-w-2xl min-h-[3em]"
              >
                <TerminalTypingText 
                  text={PERSONAL_INFO.tagline}
                  speed={30}
                  prompt="$ "
                  className="text-slate-600 dark:text-slate-400"
                  showCursor={false}
                  showCursorAfterComplete={true}
                />
              </motion.p>
            )}

            {showTagline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center gap-2 mb-12 text-slate-600 dark:text-slate-400"
              >
                <MapPin size={18} className="text-green-500 dark:text-green-400" />
                <span className="text-base">{PERSONAL_INFO.location}</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#footer"
                className="flex items-center justify-center px-8 py-4 bg-green-500 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:bg-green-600 dark:hover:bg-slate-200 transition-all group shadow-lg shadow-green-500/20 dark:shadow-none"
              >
                Contact Me
                <Mail className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={PERSONAL_INFO.cvUrl?.startsWith('http') 
                  ? PERSONAL_INFO.cvUrl 
                  : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${PERSONAL_INFO.cvUrl || "/api/upload/cv/download"}`}
                onClick={handleDownloadCV}
                className="flex items-center justify-center px-8 py-4 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/10 transition-all group cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    Download CV
                    <Download className="ml-2 w-4 h-4" />
                  </>
                )}
              </a>
            </motion.div>
          </div>

          {/* Right Side - Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div 
              className="relative w-full max-w-md"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="rounded-3xl overflow-hidden glass-card p-2 shadow-2xl">
                <img 
                  src="/profile.jpg" 
                  alt={PERSONAL_INFO.name}
                  className="w-full h-auto object-contain rounded-2xl"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/portrait/800/800";
                  }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/10 blur-[80px] rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase mb-4">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-green-500 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
