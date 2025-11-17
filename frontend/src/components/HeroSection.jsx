import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Blobs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ right: '10%', top: '50%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: '50%', bottom: '0' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-block px-4 py-2 rounded-full glass-effect">
                <span className="text-sm font-semibold gradient-text">
                  ✨ Welcome to Flippr
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="mb-6">
              <span className="text-5xl md:text-7xl font-bold tracking-tight">
                Transform Your{' '}
                <span className="gradient-text">Ideas</span>
                {' '}Into
              </span>
              <br />
              <span className="text-5xl md:text-7xl font-bold text-gray-900 mt-2 inline-block">
                Reality
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Discover our portfolio of exceptional projects crafted with precision and passion. 
              We transform visions into stunning digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.button
                className="btn-premium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Our Projects
              </motion.button>
              <motion.button
                className="px-8 py-3 rounded-xl font-semibold text-blue-600 border-2 border-blue-600 transition-all hover:bg-blue-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-gray-600 text-sm font-medium">Scroll to explore</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-lg opacity-20 blur-2xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default HeroSection;
