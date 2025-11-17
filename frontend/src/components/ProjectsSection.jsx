import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { getProjects } from '../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: '-5%', top: '10%' }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="section-title mb-4">Our Exceptional Projects</h2>
            <p className="section-subtitle">
              Explore our portfolio of innovative solutions that have transformed 
              businesses and delighted users worldwide.
            </p>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-96" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">No projects available yet.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
