import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TITLE = 'Frontend Developer';
const TYPING_SPEED = 120;
const PAUSE_AT_END = 2000;

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, _setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) return;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < TITLE.length) {
            setDisplayText(TITLE.slice(0, displayText.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
          }
        }
      },
      isDeleting ? TYPING_SPEED / 2 : displayText.length === TITLE.length ? PAUSE_AT_END : TYPING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isDone]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">
        <motion.div
          className="flex-shrink-0 order-first md:order-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/profile.png"
            alt="Raza"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl object-cover object-top ring-2 ring-white/10 shadow-2xl"
          />
        </motion.div>
        <div className="text-center md:text-left">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I&apos;m <span className="text-primary"> Muhammad Raza</span>
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl text-white/80 mb-2 min-h-[2rem] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-secondary">{displayText}</span>
          <span className="animate-pulse">|</span>
        </motion.p>
        <motion.p
          className="text-white/60 text-sm sm:text-base mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Islamabad, Pakistan
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="/Muhammad Raza. Resume.pdf"
            download="Muhammad Raza. Resume.pdf"
            className="px-6 py-3 rounded-xl glass-card border border-white/20 hover:border-primary/50 text-white font-medium transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
