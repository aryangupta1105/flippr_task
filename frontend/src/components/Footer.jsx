import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: 'f', label: 'Facebook', href: '#' },
    { icon: 'in', label: 'LinkedIn', href: '#' },
    { icon: 'ig', label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold gradient-text mb-3">Flippr</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transform your ideas into reality with our innovative solutions 
                and exceptional service.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 hello@flippr.com</li>
                <li>📱 +1 (555) 000-0000</li>
                <li>📍 San Francisco, CA</li>
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center text-white text-sm font-bold transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 102, 255, 1)' }}
                    whileTap={{ scale: 0.95 }}
                    title={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
          >
            <p>&copy; {currentYear} Flippr. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
