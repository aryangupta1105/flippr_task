import { motion } from 'framer-motion';
import { getImageUrl } from '../services/api';

const ClientCard = ({ client, index }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
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
      className="group"
    >
      <motion.div
        className="premium-card text-center p-8 h-full flex flex-col items-center"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Avatar */}
        <motion.div
          className="relative w-32 h-32 mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-cyan-200 border-4 border-white shadow-lg">
            <img
              src={getImageUrl(client.image)}
              alt={client.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Client';
              }}
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            ★
          </div>
        </motion.div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {client.name}
        </h3>

        {/* Designation */}
        <p className="text-sm font-semibold gradient-text mb-4">
          {client.designation}
        </p>

        {/* Divider */}
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4" />

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {client.description}
        </p>

        {/* Rating Stars */}
        <div className="flex gap-1 mt-6 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-yellow-400 text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              ★
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClientCard;
