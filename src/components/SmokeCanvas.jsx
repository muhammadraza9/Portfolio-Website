import { useSmokeEffect } from '../hooks/useSmokeEffect';

export default function SmokeCanvas() {
  const { canvasRef, disabled } = useSmokeEffect();

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}