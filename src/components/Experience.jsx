import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="relative py-24 px-6 z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADING */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-10 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experie<span className="text-primary">nce</span>
        </motion.h2>

        {/* CARD */}
        <motion.div
          className="glass-card p-6 text-white/80 space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl font-semibold text-white">
              Frontend Developer Intern — React & Next.js
            </h3>

            <p className="text-primary mt-1">
              Ali Square, Islamabad | Dec 2025 – Feb 2026
            </p>
          </div>

          <ul className="space-y-3 text-white/70 list-disc pl-5">

            <li>
              Developed fully responsive web pages using React.js, Next.js, JavaScript, HTML & CSS,
              ensuring cross-browser compatibility.
            </li>

            <li>
              Built and maintained reusable UI components with Bootstrap and Ant Design,
              improving consistency and reducing redundant code.
            </li>

            <li>
              Integrated RESTful APIs and implemented routing using React Router & Next.js App Router
              for seamless navigation.
            </li>

            <li>
              Collaborated via Git & GitHub with pull requests, code reviews, and branching strategies
              in an agile team workflow.
            </li>

            <li>
              Designed and shipped 8+ production-grade web applications using React.js, Next.js,
              Redux Toolkit, Context API and REST API integrations.
            </li>

            <li>
              Integrated Prisma ORM with MySQL and MongoDB to build scalable, type-safe database layers
              across full-stack projects.
            </li>

            <li>
              Applied mobile-first responsive design using Tailwind CSS, Ant Design, and Bootstrap.
            </li>

          </ul>
        </motion.div>

      </div>
    </motion.section>
  );
}