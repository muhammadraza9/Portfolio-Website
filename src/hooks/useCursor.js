import { useState, useEffect, useRef } from 'react';

const LERP = 0.15;
const TRAIL_LENGTH = 8;
const MAGNET_STRENGTH = 0.35;
const MAGNET_RADIUS = 120;
const HOVER_SELECTORS = 'a[href], button, [role="button"], .glass-card';

export function useCursor() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [trail, setTrail] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const target = useRef(null);
  const current = useRef(null);
  const magnetTarget = useRef(null);
  const isHoverRef = useRef(false);
  const trailRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (target.current === null) {
        target.current = { x, y };
        current.current = { x, y };
        setPos({ x, y });
      } else {
        target.current = { x, y };
      }

      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    const handleOver = (e) => {
      const el = e.target.closest(HOVER_SELECTORS);
      if (el) {
        isHoverRef.current = true;
        setIsHover(true);
        const rect = el.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        isHoverRef.current = false;
        setIsHover(false);
        magnetTarget.current = null;
      }
    };

    const handleOut = () => {
      isHoverRef.current = false;
      setIsHover(false);
      magnetTarget.current = null;
    };

    const animate = () => {
      if (current.current !== null && target.current !== null) {
        const { x: tx, y: ty } = target.current;
        const c = current.current;
        let dx = tx - c.x;
        let dy = ty - c.y;

        const magnet = magnetTarget.current;
        if (magnet && isHoverRef.current) {
          const toCenterX = magnet.x - c.x;
          const toCenterY = magnet.y - c.y;
          const dist = Math.hypot(toCenterX, toCenterY);
          if (dist < MAGNET_RADIUS && dist > 0) {
            const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH;
            dx += toCenterX * pull;
            dy += toCenterY * pull;
          }
        }

        c.x += dx * LERP;
        c.y += dy * LERP;

        trailRef.current = [{ x: c.x, y: c.y }, ...trailRef.current].slice(0, TRAIL_LENGTH);
        setPos({ x: c.x, y: c.y });
        setTrail(trailRef.current.slice(1));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Hide native cursor via JS as backup to CSS
    document.documentElement.style.cursor = 'none';

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return { pos, trail, isHover, visible };
}