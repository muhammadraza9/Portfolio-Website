import { useEffect } from 'react';
import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { pos, trail, isHover, visible } = useCursor();

  useEffect(() => {
    if (visible) document.body.classList.add('custom-cursor-active');
    else document.body.classList.remove('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      {/* Trail dots */}
      {trail.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            width: Math.max(1, 6 - i * 0.5),
            height: Math.max(1, 6 - i * 0.5),
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
            opacity: 0.6 - (i / trail.length) * 0.55,
          }}
        />
      ))}

      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: isHover ? 56 : 24,
          height: isHover ? 56 : 24,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          boxShadow: isHover
            ? '0 0 40px 12px rgba(99,102,241,0.4), 0 0 80px 24px rgba(139,92,246,0.2)'
            : '0 0 20px 6px rgba(99,102,241,0.25)',
          transition: 'width 0.2s, height 0.2s, box-shadow 0.2s',
        }}
      />

      {/* Inner dot */}
      <div
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          width: isHover ? 6 : 4,
          height: isHover ? 6 : 4,
          borderRadius: '50%',
          backgroundColor: 'white',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </div>
  );
}