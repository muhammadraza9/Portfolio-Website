import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5], [24, -24]);

  return (
    <motion.section ref={ref} id="about" style={{ y }} className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        <motion.div
          className="glass-card p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* <img
            src="/images/IMG_2706.JPG"
            alt="Raza"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover object-top ring-2 ring-white/10 flex-shrink-0"
          />   */}
          <div>
            <p className="text-white/80 leading-relaxed mb-6">
              Frontend Developer with  experience in building responsive and scalable web applications using React.js, Next.js, JavaScript, and TypeScript. Skilled in creating clean, reusable component-based architectures with modern UI frameworks and libraries. Focused on performance, user experience, and writing maintainable code. Passionate about building real-world projects and continuously improving development skills.

            </p>
            <div className="space-y-2 text-white/70">
              <p><span className="text-primary font-medium">Education:</span> BS Computer Science (2021–2025)</p>
              <p><span className="text-primary font-medium">Location:</span> Islamabad</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
