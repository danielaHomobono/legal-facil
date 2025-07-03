import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale } from 'react-icons/fa';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center justify-start w-full max-w-5xl mx-auto pl-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-6xl mr-8"
        animate={{ 
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.05, 1, 1.05, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
        style={{
          color: '#808080',
          filter: 'drop-shadow(0 0 3px rgba(128, 128, 128, 0.5))'
        }}
      >
        <FaBalanceScale />
      </motion.div>
      <div>
        <motion.h1 
          className="text-4xl font-bold"
          whileHover={{ scale: 1.05 }}
          style={{
            background: 'linear-gradient(45deg, #a0a0a0, #e0e0e0, #7cb9e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 10px rgba(124, 185, 232, 0.3)',
            filter: 'drop-shadow(0 0 2px rgba(124, 185, 232, 0.5))'
          }}
        >
          LegalFácil
        </motion.h1>
        <motion.p 
          className="text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: '#7cb9e8',
            opacity: 0.9
          }}
        >
          Asistencia legal simplificada
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Logo;