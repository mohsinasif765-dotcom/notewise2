
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, FileText, FileUp, Mic, Camera, TrendingUp, Calendar, FileStack, Lightbulb, ChevronRight, Star, Bell, Sun, Moon } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileDashboardProps {
  onCreateNote: (method: string) => void;
  onViewNote: (noteId: string) => void;
  onNotifications: () => void;
  onViewAllNotes: () => void;
}

const mockNotes = [
  {
    id: '1',
    title: 'Team Meeting Notes',
    preview: 'Discussed Q4 goals and project timelines...',
    type: 'audio',
    color: 'from-green-400 to-teal-400',
    timestamp: '2 hours ago',
    favorite: true,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Research Paper Summary',
    preview: 'Key findings from the AI research paper...',
    type: 'pdf',
    color: 'from-blue-400 to-cyan-400',
    timestamp: 'Yesterday',
    favorite: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: '3',
    title: 'Whiteboard Ideas',
    preview: 'Brainstorming session captured from whiteboard...',
    type: 'image',
    color: 'from-orange-400 to-yellow-400',
    timestamp: '3 days ago',
    favorite: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3))
  },
  {
    id: '4',
    title: 'Project Kickoff Notes',
    preview: 'Initial planning and requirements gathering...',
    type: 'text',
    color: 'from-purple-400 to-pink-400',
    timestamp: '1 week ago',
    favorite: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
  },
];


const features = [
    'Summarize your lectures instantly.',
    'Transcribe voice notes with AI.',
    'Generate quizzes from your notes.',
    'Create flashcards in seconds.',
    'Search your notes with smart AI.',
];

export function MobileDashboard({ onCreateNote, onViewNote, onNotifications, onViewAllNotes }: MobileDashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState('');
  const [animatedFeatureIndex, setAnimatedFeatureIndex] = useState(0);

  const [stats, setStats] = useState({ today: 0, streak: 0, total: 0 });

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };
    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setAnimatedFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000); // Change text every 3 seconds

    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const notesToday = mockNotes.filter(note => {
        const noteDate = new Date(note.createdAt);
        noteDate.setHours(0, 0, 0, 0);
        return noteDate.getTime() === today.getTime();
    }).length;

    const uniqueDates = [...new Set(mockNotes.map(note => new Date(note.createdAt).setHours(0,0,0,0)))].sort((a,b) => b - a);
    let currentStreak = 0;
    if (uniqueDates.length > 0) {
        const todayTime = new Date().setHours(0,0,0,0);
        const yesterdayTime = new Date(todayTime).setDate(new Date(todayTime).getDate() - 1);
        
        // Check if there is a note for today or yesterday to start the streak
        if (uniqueDates[0] === todayTime || uniqueDates[0] === yesterdayTime) {
            currentStreak = 1;
            for (let i = 0; i < uniqueDates.length - 1; i++) {
                const day = uniqueDates[i];
                const prevDay = uniqueDates[i+1];
                const expectedPrevDay = new Date(day).setDate(new Date(day).getDate() - 1);
                if (prevDay === expectedPrevDay) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }
    }

    setStats({
        today: notesToday,
        streak: currentStreak,
        total: mockNotes.length,
    });
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header with Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {greeting}! 👋
            </h1>
            <div className="relative h-12 mt-1">
                 <AnimatePresence mode="wait">
                    <motion.p
                        key={animatedFeatureIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}
                    >
                        {features[animatedFeatureIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {/* Notifications */}
            <button
              onClick={onNotifications}
              className={`relative p-2 sm:p-2.5 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
              }`}
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-2"
        >
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-white/50' : 'text-gray-400'
            }`} />
            <Input
              type="search"
              placeholder="Search notes..."
              className={`pl-10 backdrop-blur-md ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50'
                  : 'bg-white/60 border-gray-200/50 text-gray-900 placeholder:text-gray-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 sm:gap-3"
        >
          <GlassCard className="p-3 sm:p-4">
            <Calendar className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
            }`} />
            <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
              Today
            </div>
            <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.today}</div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`} />
            <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
              Streak
            </div>
            <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.streak} days</div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <FileStack className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${
              theme === 'dark' ? 'text-pink-300' : 'text-pink-600'
            }`} />
            <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
              Total
            </div>
            <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.total}</div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={`mb-3 sm:mb-4 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <GlassCard
              className="p-3 sm:p-4 cursor-pointer active:scale-95 transition-transform"
              onClick={() => onCreateNote('text')}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Text Note</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Type or paste</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              className="p-3 sm:p-4 cursor-pointer active:scale-95 transition-transform"
              onClick={() => onCreateNote('pdf')}
            >
               <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400">
                  <FileUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PDF Upload</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Upload docs</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              className="p-3 sm:p-4 cursor-pointer active:scale-95 transition-transform"
              onClick={() => onCreateNote('audio')}
            >
               <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-400">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Audio/Video</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Record or upload</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              className="p-3 sm:p-4 cursor-pointer active:scale-95 transition-transform"
              onClick={() => onCreateNote('image')}
            >
               <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Image</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>Capture or upload</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Notes</h2>
            <Button 
              variant="ghost" 
              onClick={onViewAllNotes}
              className={theme === 'dark' 
                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-900/10'
              }
            >
              View All
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {mockNotes.slice(0, 3).map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard
                  className="p-3 sm:p-4 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => onViewNote(note.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                      {note.type === 'audio' && <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {note.type === 'pdf' && <FileUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {note.type === 'image' && <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {note.type === 'text' && <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {note.title}
                        </h3>
                        {note.favorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                      </div>
                      <p className={`text-sm line-clamp-2 mb-2 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                        {note.preview}
                      </p>
                      <span className={`text-xs ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                        {note.timestamp}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard className={`p-3 sm:p-4 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' 
              : 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30'
          }`}>
            <div className="flex gap-3">
              <Lightbulb className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5 ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
              }`} />
              <div>
                <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Pro Tip
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>
                  Use voice recording for meetings to get automatic transcriptions and action items!
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

    