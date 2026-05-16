import { useEffect, useRef } from 'react';

export default function Cursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch()) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
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

    window.addEventListener('resize', () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        current.x = e.clientX;
        current.y = e.clientY;
        visible = true;
        document.body.classList.add('custom-cursor-active');
      }
    });

    document.addEventListener('mouseleave', () => {
      visible = false;
      document.body.classList.remove('custom-cursor-active');
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (visible) {
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
        const gradient = ctx.createRadialGradient(current.x, current.y, 0, current.x, current.y, 20);
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

      requestAnimationFrame(draw);
    };
    draw();

    return () => {
      document.body.removeChild(canvas);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return null;
}