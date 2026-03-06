
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 500, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Dynamic Outer Ring */}
      <motion.div
        className="absolute rounded-full border border-white/20"
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          opacity: isHovering ? 1 : 0.3,
          borderColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.2)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
      
      {/* Subtle Inner Glow */}
      <motion.div
        className="absolute rounded-full bg-white/5 blur-sm"
        animate={{
          width: isHovering ? 80 : 0,
          height: isHovering ? 80 : 0,
        }}
      />
      
      {/* Core Cursor Dot */}
      <motion.div
        className="rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        animate={{
          width: isHovering ? 4 : 8,
          height: isHovering ? 4 : 8,
          scale: isClicking ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
