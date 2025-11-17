import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { submitContact } from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData);
      setMessageType('success');
      setMessage('🎉 Thank you! Your message has been sent successfully.');
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: '',
      });
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessageType('error');
      setMessage('❌ Error sending message. Please try again.');
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

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const inputFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      icon: '👤',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your@email.com',
      icon: '✉️',
    },
    {
      name: 'mobileNumber',
      label: 'Mobile Number',
      type: 'tel',
      placeholder: '+1 (555) 000-0000',
      icon: '📱',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'New York',
      icon: '🏙️',
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: '10%', bottom: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ right: '10%', top: '20%' }}
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
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="section-title mb-4">Get In Touch</h2>
            <p className="section-subtitle">
              Have questions? We'd love to hear from you. Send us a message 
              and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form Card */}
          <motion.div
            className="max-w-2xl mx-auto premium-card p-8 md:p-12"
            whileHover={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg font-medium ${
                    messageType === 'success'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                      : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {inputFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    variants={inputVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    className={`${field.name === 'city' ? 'md:col-span-2' : ''}`}
                  >
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <span className="mr-2">{field.icon}</span>
                      {field.label}
                    </label>
                    <motion.input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={field.placeholder}
                      className="input-premium"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full btn-premium py-4 font-semibold text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Sending...</span>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <span className="text-lg">→</span>
                  </span>
                )}
              </motion.button>
            </form>

            {/* Info Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-600 text-sm mt-6"
            >
              We typically respond within 24 hours
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
