import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { pos, trail, isHover, visible } = useCursor();

  if (!visible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: Math.max(2, 5 - i * 0.5),
            height: Math.max(2, 5 - i * 0.5),
            borderRadius: '50%',
            background: `rgba(139, 92, 246, ${0.6 - (i / trail.length) * 0.55})`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}

      {/* Glow orb */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: isHover ? 44 : 24,
          height: isHover ? 44 : 24,
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1.5px solid rgba(99, 102, 241, 0.7)',
          boxShadow: '0 0 12px rgba(99,102,241,0.5)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.18s ease, height 0.18s ease',
        }}
      />

      {/* Inner dot */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'white',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  );
}