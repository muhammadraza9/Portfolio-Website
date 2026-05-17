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
    const updatePosition = (x, y) => {
      if (target.current === null) {
        target.current = { x, y };
        current.current = { x, y };
        setPos({ x, y });
      } else {
        target.current = { x, y };
      }
      setVisible(true);
    };

    // Desktop
    const handleMove = (e) => updatePosition(e.clientX, e.clientY);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    // Mobile — touchend pe cursor NAHI hatao, last position pe rehne do
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      target.current = { x: t.clientX, y: t.clientY };
      current.current = { x: t.clientX, y: t.clientY };
      setPos({ x: t.clientX, y: t.clientY });
      setVisible(true);
    };

    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      updatePosition(t.clientX, t.clientY);
    };

    // touchend — cursor last position pe RUKE, gayab na ho
    const handleTouchEnd = () => {
      // visible true rakhein — cursor last position pe dikhta rahe
    };

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
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return { pos, trail, isHover, visible };
}