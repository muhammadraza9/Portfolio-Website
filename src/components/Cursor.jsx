import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { pos, trail, isHover, visible, isMobile } = useCursor();

  // Smooth spring zoom on hover
  const size = useSpring(24, { stiffness: 250, damping: 22 });

  useEffect(() => {
    size.set(isHover ? 64 : 24);
  }, [isHover]);

  useEffect(() => {
    if (visible) document.body.classList.add('custom-cursor-active');
    else document.body.classList.remove('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, [visible]);

  // Mobile pe cursor render mat karo
  if (isMobile || !visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      {/* Trail dots */}
      {trail.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary"
          style={{
            left: p.x,
            top: p.y,
            x: '-50%',
            y: '-50%',
            width: Math.max(2, 6 - i * 0.5),
            height: Math.max(2, 6 - i * 0.5),
            opacity: 0.6 - (i / trail.length) * 0.55,
          }}
        />
      ))}

      {/* Glow orb — spring zoom on hover */}
      <motion.div
        className="absolute rounded-full bg-primary"
        style={{
          left: pos.x,
          top: pos.y,
          x: '-50%',
          y: '-50%',
          width: size,
          height: size,
          opacity: isHover ? 0.85 : 0.6,
          boxShadow: isHover
            ? '0 0 40px 12px rgba(99, 102, 241, 0.4), 0 0 80px 24px rgba(139, 92, 246, 0.2)'
            : '0 0 20px 6px rgba(99, 102, 241, 0.25)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          left: pos.x,
          top: pos.y,
          x: '-50%',
          y: '-50%',
          width: isHover ? 6 : 4,
          height: isHover ? 6 : 4,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
    </div>
  );
}