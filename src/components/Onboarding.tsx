import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileUp, Mic, Camera, ChevronRight } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: FileText,
    title: 'Manual Text Input',
    description: 'Type or paste your notes directly and let AI organize them for you.',
    color: 'from-purple-400 to-pink-400'
  },
  {
    icon: FileUp,
    title: 'PDF Upload',
    description: 'Upload documents and get instant AI-powered summaries and insights.',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    icon: Mic,
    title: 'Audio & Video',
    description: 'Record lectures or meetings and get automatic transcriptions.',
    color: 'from-green-400 to-teal-400'
  },
  {
    icon: Camera,
    title: 'Image Recognition',
    description: 'Capture photos of notes, whiteboards, or documents instantly.',
    color: 'from-orange-400 to-yellow-400'
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-40 flex flex-col">
      <AnimatedBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <GlassCard className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${slide.color} mb-6`}
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-white mb-4">{slide.title}</h2>
              <p className="text-white/80">{slide.description}</p>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="p-6 pb-8 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-white hover:bg-white/10"
        >
          Skip
        </Button>
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
