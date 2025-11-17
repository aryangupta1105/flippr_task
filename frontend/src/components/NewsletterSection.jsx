import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { subscribe } from '../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribe(email);
      setMessageType('success');
      setMessage('🎉 Successfully subscribed to our newsletter!');
      setEmail('');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessageType('error');
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
        setMessage('📧 This email is already subscribed.');
      } else {
        setMessage('❌ Error subscribing. Please try again.');
      }
      setTimeout(() => setMessage(''), 5000);
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section className="py-20 md:py-32 text-black relative overflow-hidden">
      {/* Background - Premium Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 -z-20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10"
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
          className="absolute w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Stay Updated
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-black/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Subscribe to our newsletter and get the latest news, updates, and exclusive 
            offers delivered directly to your inbox.
          </motion.p>

          {/* Message Alert */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}    
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg font-medium ${
                  messageType === 'success'
                    ? 'bg-white/20 text-black border border-white/30'
                    : 'bg-red-500/20 text-black border border-red-500/30'
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Subscribing...</span>
                </motion.div>
              ) : (
                <span>Subscribe</span>
              )}
            </motion.button>
          </motion.form>

          {/* Privacy Notice */}
          <motion.p
            className="text-sm text-black/80 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
