import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: '🏡 Easy Homes',
    description: `A real estate platform with advanced property search and filtering features.Users can easily browse and explore properties based on location, price, and preferences.It provides a clean and responsive user interface for all screen sizes.Built with reusable components to ensure scalability and maintainable code structure.`,
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'Ant Design'],
    highlight: true,
    image: '/images/easy-home.png',
  },
  {
    title: '📰 News App',
    description: `A dynamic news application that fetches real-time data from a public News API.
Users can explore the latest news across multiple categories like technology, sports, and business.
It includes smooth navigation and fast loading for better user experience.
Designed with a clean and responsive UI for all devices.`,
    tags: ['React.js', 'Bootstrap', 'REST API'],
    highlight: true,
    image: '/images/news-app.png',
  },
  {
    title: '📝 iNotebook',
    description: `A full-stack CRUD note-taking application with secure data storage using   MongoDB.
    Users can create, update, delete, and organize notes efficiently in one place.
    It includes authentication for secure access and personalized note management.
    Built for fast performance with a clean and user-friendly interface.`,
    tags: ['React.js', 'Node.js', 'MongoDB'],
    highlight: true,
    image: '/images/inotebook.png',
  },
  {
    title: '🛒 ReduxApp',
    description: `A shopping cart application built using Redux Toolkit for efficient state management.
    It allows users to add, remove, and update products with real-time price calculations.
    The app demonstrates scalable architecture with centralized state handling.
    Designed with a responsive and user-friendly interface for smooth shopping experience.`,
    tags: ['React.js', 'Redux Toolkit'],
    highlight: true,
    image: '/images/redux.png',
  },
  {
    title: '🎓 CUVAS Admission System',
    description: `A student admission management system designed to handle application records efficiently.
    It allows users to submit, track, and manage admission data in a structured way.
    The system includes validation and organized workflows for smooth processing.
    Built with backend integration and database support for reliable data handling.`,
    tags: ['Laravel', 'MySQL'],
    highlight: true,
    image: '/images/admission.png',
  },
  {
    title: '📝 TextUtils',
    description:  `A simple and efficient text utility tool for formatting and analyzing text.
    It provides features like uppercase, lowercase conversion, and word/character counting.
    Users can quickly manipulate text with instant results in a clean interface.
    Built for fast performance with a lightweight and responsive design.`,
    tags: ['React.js'],
    highlight: true,
    image: '/images/textutils.png',
  },
  {
    title: '📚 Book Hub',
    description: `A personal book management application for organizing and storing book collections.
    Users can add, edit, and delete books to keep their library well organized.
    It uses local storage to persist data without requiring a backend server.
    Designed with a simple and clean interface for easy and fast usage.`,
    tags: ['React.js'],
    highlight: true,
    image: '/images/bookhub.png',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <motion.h2
          className="text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Proj<span className="text-primary">ects</span>
        </motion.h2>

        {/* GRID CARDS */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className={`rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-[1.03] transition duration-300 ${
                project.highlight ? 'ring-1 ring-primary/40' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >

              {/* IMAGE */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-44 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-white/70 text-sm mb-4">
                  {project.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}