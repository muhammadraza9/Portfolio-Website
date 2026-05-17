import { useRef, useEffect, useCallback } from 'react';

const THROTTLE_MS = 16;
const CURSOR_PARTICLE_COUNT = 70;
const CURSOR_LIFESPAN = 90;
const VELOCITY_MULTIPLIER = 0.22;
const MAX_VEL = 14;
const AMBIENT_ORB_COUNT = 10;
const AMBIENT_SIZE = 180;

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory;
  return cores <= 2 || (memory && memory <= 4);
}

export function useSmokeEffect() {
  const canvasRef = useRef(null);
  const mouseRef = useRef(null);
  const particlesRef = useRef([]);
  const ambientRef = useRef([]);
  const rafRef = useRef(null);
  const lastThrottleRef = useRef(0);
  const timeRef = useRef(0);
  const lowEnd = isLowEndDevice();
  const particleCount = lowEnd ? 35 : CURSOR_PARTICLE_COUNT;
  const orbCount = lowEnd ? 5 : AMBIENT_ORB_COUNT;

  const initParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, life: 0,
        maxLife: CURSOR_LIFESPAN + Math.random() * 40,
        size: 15 + Math.random() * 35,
        decay: 0.93 + Math.random() * 0.05,
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  const initAmbient = useCallback(() => {
    const orbs = [];
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        size: AMBIENT_SIZE * (0.5 + Math.random() * 0.5),
        amp: 30 + Math.random() * 40,
      });
    }
    ambientRef.current = orbs;
  }, [orbCount]);

  useEffect(() => { initParticles(); }, [initParticles]);
  useEffect(() => { initAmbient(); }, [initAmbient]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const updateMouse = (x, y) => {
      const now = performance.now();
      if (now - lastThrottleRef.current < THROTTLE_MS) return;
      lastThrottleRef.current = now;

      if (mouseRef.current === null) {
        mouseRef.current = { x, y, vx: 0, vy: 0, lastX: x, lastY: y };
      } else {
        mouseRef.current.vx = x - mouseRef.current.lastX;
        mouseRef.current.vy = y - mouseRef.current.lastY;
        mouseRef.current.lastX = mouseRef.current.x;
        mouseRef.current.lastY = mouseRef.current.y;
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      }
    };

    // Desktop
    const handleMove = (e) => updateMouse(e.clientX, e.clientY);

    // Mobile — window pe attach, velocity reset on touchstart
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = {
        x: t.clientX, y: t.clientY,
        vx: 0, vy: 0,
        lastX: t.clientX, lastY: t.clientY,
      };
    };

    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      updateMouse(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Ambient orbs
      const orbs = ambientRef.current;
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        const nx = (width / 2) + o.x + Math.sin(t * o.speed + o.phase) * o.amp;
        const drift = (t * 25 * o.speed + o.phase * 20) % (height + 400);
        const ny = (height / 2) + o.y - drift + 200;
        const alpha = 0.045 + 0.025 * Math.sin(t * 0.5 + o.phase);
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, o.size);
        g.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
        g.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.4})`);
        g.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(nx, ny, o.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor smoke
      if (mouseRef.current !== null) {
        const { x: mx, y: my, vx, vy } = mouseRef.current;
        const vxClamp = Math.max(-MAX_VEL, Math.min(MAX_VEL, vx));
        const vyClamp = Math.max(-MAX_VEL, Math.min(MAX_VEL, vy));

        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.life <= 0) {
            p.x = mx + (Math.random() - 0.5) * 70;
            p.y = my + (Math.random() - 0.5) * 70;
            p.vx = vxClamp * VELOCITY_MULTIPLIER + (Math.random() - 0.5) * 0.3;
            p.vy = vyClamp * VELOCITY_MULTIPLIER + (Math.random() - 0.5) * 0.3;
            p.life = p.maxLife;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.decay;
          p.vy *= p.decay;
          p.life--;

          const lifeT = p.life / p.maxLife;
          const alpha = (lifeT * lifeT) * 0.2;
          const len = Math.min(80, 20 + Math.hypot(p.vx, p.vy) * 2);
          const r = p.size * (0.4 + 0.6 * lifeT);
          const angle = Math.atan2(p.vy, p.vx);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          const eg = ctx.createRadialGradient(0, 0, 0, len * 0.5, 0, len);
          eg.addColorStop(0, `rgba(220, 220, 240, ${alpha})`);
          eg.addColorStop(0.6, `rgba(200, 200, 230, ${alpha * 0.4})`);
          eg.addColorStop(1, 'rgba(200, 200, 230, 0)');
          ctx.fillStyle = eg;
          ctx.beginPath();
          ctx.ellipse(0, 0, len, r, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { canvasRef, disabled: false };
}