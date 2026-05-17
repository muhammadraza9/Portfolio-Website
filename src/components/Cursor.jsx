import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    // FIX 1: Don't block on hybrid devices — wait for actual mouse input
    let hasMouse = false;
    let rafId = null;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mouse = { x: -500, y: -500 };
    const current = { x: -500, y: -500 };
    const trail = [];
    let visible = false;

    // FIX 2: Resize — update both canvas pixel size AND W/H
    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;   // resets canvas — must redraw next frame
      canvas.height = H;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMouse) {
        hasMouse = true;
        // Snap current to mouse on first move so cursor doesn't slide in from (-500, -500)
        current.x = e.clientX;
        current.y = e.clientY;
      }

      if (!visible) {
        visible = true;
        document.body.classList.add('custom-cursor-active');
      }
    };

    const handleMouseLeave = () => {
      visible = false;
      document.body.classList.remove('custom-cursor-active');
    };

    // FIX 3: Cancel previous RAF and store new ID each frame
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (visible && hasMouse) {
        current.x += (mouse.x - current.x) * 0.15;
        current.y += (mouse.y - current.y) * 0.15;

        trail.unshift({ x: current.x, y: current.y });
        if (trail.length > 8) trail.pop();

        // Trail dots
        trail.forEach((p, i) => {
          const size = Math.max(1, 5 - i * 0.5);
          const alpha = 0.6 - (i / trail.length) * 0.55;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.fill();
        });

        // Glow orb
        const gradient = ctx.createRadialGradient(
          current.x, current.y, 0,
          current.x, current.y, 20
        );
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.beginPath();
        ctx.arc(current.x, current.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(current.x, current.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw); // FIX 3: store ID
    };

    rafId = requestAnimationFrame(draw);

    // FIX 4: Use named functions so they can be properly removed
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      // FIX 3: Cancel animation loop on unmount
      if (rafId) cancelAnimationFrame(rafId);

      // FIX 4: Remove all listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);

      // Safe removal (canvas may already be gone in strict mode double-invoke)
      if (canvas.parentNode) {
        document.body.removeChild(canvas);
      }

      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return null;
}