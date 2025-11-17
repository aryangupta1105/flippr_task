import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Clients', href: '#clients' },
    { label: 'Contact', href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Flippr
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              custom={i}
              variants={navItemVariants}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Admin Button */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/admin"
            className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg transition-all"
          >
            Admin
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-700 font-bold text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-gray-700 font-medium hover:text-blue-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin"
            className="block w-full px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
