import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ClientCard from './ClientCard';
import { getClients } from '../services/api';

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
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
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: '5%', top: '20%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ right: '5%', top: '60%' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Loved by Clients Worldwide
            </h2>
            <p className="text-gray-300 text-center text-lg max-w-2xl mx-auto">
              Hear from satisfied clients about their experience working with us. 
              Their success is our greatest achievement.
            </p>
          </motion.div>

          {/* Clients Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton h-80" />
              ))}
            </div>
          ) : clients.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              {clients.map((client, index) => (
                <ClientCard key={client._id} client={client} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg">No clients available yet.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
