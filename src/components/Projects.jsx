import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'CUVAS Admission System',
    description: 'University admission management system for CUVAS — handling applications, documents, and admissions workflow.',
    tags: ['Laravel', 'PHP', 'Xampp', 'CSS', 'JavaScript'],
    highlight: true,
  },
  {
    title: 'Development of E-Commerce Website',
    description: 'A fully functional e-commerce web application built with React.js for the frontend, featuring a seamless shopping experience with product browsing, cart management, and order processing capabilities.',
    tags: ['React', 'Tailwind CSS', 'CSS3 ', 'React Router v6 - Navigation', 'JavaScript', 'React Hooks'],
    highlight: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Proj<span className="text-primary">ects</span>
        </motion.h2>
        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              className={`glass-card p-8 overflow-hidden ${project.highlight ? 'ring-1 ring-primary/40' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
