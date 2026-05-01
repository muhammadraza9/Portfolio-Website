import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="relative py-8 px-6 border-t border-white/10 z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center text-white/50 text-sm">
        © {year} Muhammad Raza. All rights reserved.
      </div>
    </motion.footer>
  );
}
