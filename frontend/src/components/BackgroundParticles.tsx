import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 80; // More particles for better visibility
    const connectionDistance = 180;

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 4 + 2; // Even larger particles for visibility
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const isDark = document.documentElement.classList.contains('dark');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Maximum visibility - fully opaque
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
        ctx.fill();
      }
    }

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // Reset particles
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      // Debug log (remove in production if needed)
      // console.log(`Canvas initialized: ${width}x${height}, Particles: ${particles.length}`);
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.classList.contains('dark');
      
      // Draw particles and connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const opacity = isDark ? 0.8 : 0.9;
            const lineOpacity = opacity * (1 - dist / connectionDistance);
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${lineOpacity})`
              : `rgba(0, 0, 0, ${lineOpacity})`;
            ctx.lineWidth = isDark ? 2 : 2.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    // Initialize and start animation
    init();
    animate();

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDark = typeof window !== 'undefined' 
    ? document.documentElement.classList.contains('dark')
    : true;

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ 
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Animated Aura Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${
          isDark ? 'bg-white/10' : 'bg-black/10'
        }`}
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-colors duration-700 ${
          isDark ? 'bg-white/8' : 'bg-black/8'
        }`}
      />
      
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          background: 'transparent',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default BackgroundParticles;
