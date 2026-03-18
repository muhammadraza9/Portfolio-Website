import { motion } from 'framer-motion';

const SKILLS = [
  'HTML',
  'CSS',
  'Bootstrap',
  'JavaScript',
  'React',
  'PHP',
  'Laravel',
  'Node.js',
  'Problem Solving',
  'Git & GitHub',
  'VS Code',
  'Cursor',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Skil<span className="text-primary">ls</span>
        </motion.h2>
        <motion.ul
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SKILLS.map((skill) => (
            <motion.li key={skill} variants={item}>
              <motion.div
                className="glass-card px-6 py-4 text-center font-medium text-white/90 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {skill}
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
