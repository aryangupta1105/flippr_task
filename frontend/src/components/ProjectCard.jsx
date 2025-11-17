import { motion } from 'framer-motion';
import { getImageUrl } from '../services/api';

const ProjectCard = ({ project, index }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group h-full"
    >
      <motion.div
        className="premium-card h-full flex flex-col overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <motion.img
            src={getImageUrl(project.image)}
            alt={project.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/450x350?text=Project';
            }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block w-fit mb-3"
          >
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700">
              Featured Project
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:gradient-text transition-all duration-300">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Footer */}
          <motion.button
            className="w-full py-3 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <span className="text-lg">→</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
