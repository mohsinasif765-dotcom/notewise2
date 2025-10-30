import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  const { theme } = useTheme();
  
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-md rounded-2xl shadow-xl transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 border border-white/20'
          : 'bg-white/60 border border-gray-200/50'
      } ${className}`}
    >
      {children}
    </div>
  );
}
