import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, User, FileText } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { MobileDashboard } from './screens/MobileDashboard';
import { CreateNote } from './screens/CreateNote';
import { NoteDetail } from './screens/NoteDetail';
import { AllNotes } from './screens/AllNotes';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { useTheme } from '../contexts/ThemeContext';

interface MobileAppProps {
  onLogout: () => void;
}

type Screen = 
  | { type: 'dashboard' }
  | { type: 'create'; method?: string }
  | { type: 'note-detail'; noteId: string }
  | { type: 'all-notes' }
  | { type: 'profile' }
  | { type: 'settings' }
  | { type: 'notifications' };

export function MobileApp({ onLogout }: MobileAppProps) {
  const [screen, setScreen] = useState<Screen>({ type: 'dashboard' });
  const [activeTab, setActiveTab] = useState<'home' | 'notes' | 'profile'>('home');
  const { theme } = useTheme();

  const handleCreateNote = (method?: string) => {
    setScreen({ type: 'create', method });
  };

  const handleViewNote = (noteId: string) => {
    setScreen({ type: 'note-detail', noteId });
  };

  const handleNoteCreated = (noteId: string) => {
    setScreen({ type: 'note-detail', noteId });
  };

  const handleNotifications = () => {
    setScreen({ type: 'notifications' });
  };

  const handleBack = () => {
    switch (activeTab) {
      case 'home':
        setScreen({ type: 'dashboard' });
        break;
      case 'notes':
        setScreen({ type: 'all-notes' });
        break;
      case 'profile':
        setScreen({ type: 'profile' });
        break;
    }
  };

  const handleTabChange = (tab: 'home' | 'notes' | 'profile') => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setScreen({ type: 'dashboard' });
        break;
      case 'notes':
        setScreen({ type: 'all-notes' });
        break;
      case 'profile':
        setScreen({ type: 'profile' });
        break;
    }
  };

  const handleSettings = () => {
    setScreen({ type: 'settings' });
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen.type + (screen.type === 'note-detail' ? screen.noteId : '')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {screen.type === 'dashboard' && (
              <MobileDashboard
                onCreateNote={handleCreateNote}
                onViewNote={handleViewNote}
                onNotifications={handleNotifications}
              />
            )}
            {screen.type === 'create' && (
              <CreateNote
                initialMethod={screen.method}
                onBack={handleBack}
                onNoteCreated={handleNoteCreated}
              />
            )}
            {screen.type === 'note-detail' && (
              <NoteDetail
                noteId={screen.noteId}
                onBack={handleBack}
              />
            )}
            {screen.type === 'all-notes' && (
              <AllNotes onViewNote={handleViewNote} />
            )}
            {screen.type === 'profile' && (
              <ProfileScreen
                onSettings={handleSettings}
                onLogout={onLogout}
              />
            )}
            {screen.type === 'settings' && (
              <SettingsScreen
                onBack={handleBack}
                onLogout={onLogout}
              />
            )}
            {screen.type === 'notifications' && (
              <NotificationsScreen onBack={handleBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {screen.type !== 'settings' && screen.type !== 'create' && screen.type !== 'note-detail' && screen.type !== 'notifications' && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <div className={`backdrop-blur-xl border-t ${
            theme === 'dark'
              ? 'bg-purple-900/50 border-white/10'
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-around px-6 py-3 relative">
              {/* Home Tab */}
              <button
                onClick={() => handleTabChange('home')}
                className={`flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'home'
                    ? theme === 'dark'
                      ? 'text-white bg-white/10'
                      : 'text-gray-900 bg-gray-900/10'
                    : theme === 'dark'
                      ? 'text-white/60 hover:text-white/80'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs">Home</span>
              </button>

              {/* Notes Tab */}
              <button
                onClick={() => handleTabChange('notes')}
                className={`flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'notes'
                    ? theme === 'dark'
                      ? 'text-white bg-white/10'
                      : 'text-gray-900 bg-gray-900/10'
                    : theme === 'dark'
                      ? 'text-white/60 hover:text-white/80'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs">Notes</span>
              </button>

              {/* Profile Tab */}
              <button
                onClick={() => handleTabChange('profile')}
                className={`flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'profile'
                    ? theme === 'dark'
                      ? 'text-white bg-white/10'
                      : 'text-gray-900 bg-gray-900/10'
                    : theme === 'dark'
                      ? 'text-white/60 hover:text-white/80'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs">Profile</span>
              </button>
            </div>
          </div>

          {/* Floating Action Button */}
          <motion.button
            onClick={() => handleCreateNote()}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
