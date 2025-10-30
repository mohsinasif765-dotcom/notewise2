
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressIndicatorProps {
  isVisible: boolean;
  messages: string[];
}

export function ProgressIndicator({ isVisible, messages }: ProgressIndicatorProps) {
  const { theme } = useTheme();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible, messages.length]);
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="text-center p-8 rounded-2xl"
      >
        <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
        <div className="relative h-6 w-64 mx-auto overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 text-white text-lg"
                >
                    {messages[currentMessageIndex]}
                </motion.p>
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
