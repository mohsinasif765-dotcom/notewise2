import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Check, X, Sparkles, TrendingUp, Heart, MessageSquare } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';

interface NotificationsScreenProps {
  onBack: () => void;
}

const mockNotifications = [
  {
    id: '1',
    type: 'success',
    icon: Check,
    color: 'from-green-400 to-teal-400',
    title: 'Note Generated Successfully',
    message: 'Your audio recording has been transcribed and summarized.',
    time: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'info',
    icon: Sparkles,
    color: 'from-purple-400 to-pink-400',
    title: 'AI Tip: Organize Your Notes',
    message: 'Use tags to make your notes easier to find and categorize.',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'achievement',
    icon: TrendingUp,
    color: 'from-yellow-400 to-orange-400',
    title: '12 Day Streak! 🔥',
    message: "You're on fire! Keep up the great note-taking habit.",
    time: '2 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'reminder',
    icon: Bell,
    color: 'from-blue-400 to-cyan-400',
    title: 'Action Item Reminder',
    message: 'Don\'t forget: Send proposal to client by Friday',
    time: '3 hours ago',
    read: true
  },
  {
    id: '5',
    type: 'update',
    icon: Heart,
    color: 'from-pink-400 to-rose-400',
    title: 'New Feature Available',
    message: 'Try our new collaborative notes feature!',
    time: 'Yesterday',
    read: true
  },
  {
    id: '6',
    type: 'message',
    icon: MessageSquare,
    color: 'from-indigo-400 to-purple-400',
    title: 'Welcome to NoteWise AI',
    message: 'Thanks for joining! Check out our quick start guide.',
    time: '2 days ago',
    read: true
  }
];

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const { theme } = useTheme();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-900 hover:bg-gray-900/10'
              }`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                Notifications
              </h1>
              {unreadCount > 0 && (
                <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className={theme === 'dark' ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-900/10'}
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-3">
        {mockNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-white/30' : 'text-gray-400'
            }`} />
            <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              No notifications
            </h3>
            <p className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
              You're all caught up!
            </p>
          </motion.div>
        ) : (
          mockNotifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className={`p-4 ${!notification.read ? (theme === 'dark' ? 'bg-white/15' : 'bg-white/80') : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${notification.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className={`mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <span className={theme === 'dark' ? 'text-white/50' : 'text-gray-500'}>
                        {notification.time}
                      </span>
                    </div>
                    <button
                      className={`p-1 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-white/10 text-white/50 hover:text-white/70'
                          : 'hover:bg-gray-900/10 text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
        
        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
}
