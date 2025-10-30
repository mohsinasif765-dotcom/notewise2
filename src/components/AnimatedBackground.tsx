import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export function AnimatedBackground() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`} />
      
      {/* Floating animated orbs */}
      <motion.div
        className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl transition-colors duration-500 ${
          theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-300/40'
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={`absolute top-40 right-10 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
          theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-300/40'
        }`}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={`absolute bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl transition-colors duration-500 ${
          theme === 'dark' ? 'bg-pink-500/30' : 'bg-pink-300/40'
        }`}
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
