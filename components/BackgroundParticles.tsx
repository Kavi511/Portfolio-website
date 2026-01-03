
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
    const connectionDistance = 140;

    // Observe theme changes on html element
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Adjust particle opacity based on theme - more visible in light mode
        ctx.fillStyle = isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.6)';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            // Connection line color based on theme - more visible in light mode
            const color = isDark ? 34 : 34;
            const opacity = isDark ? 0.12 : 0.25;
            ctx.strokeStyle = `rgba(${color}, 197, 94, ${opacity * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = isDark ? 0.5 : 0.8;
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

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none transition-colors duration-500 bg-slate-50 dark:bg-black">
      {/* Animated Aura Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${
          isDark ? 'bg-green-500/10' : 'bg-green-500/20'
        }`}
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-colors duration-700 ${
          isDark ? 'bg-indigo-600/10' : 'bg-green-400/15'
        }`}
      />
      
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default BackgroundParticles;
