import { motion } from 'motion/react';
import { User, Crown, TrendingUp, FileText, Calendar, Bell, Moon, Shield, Settings, HelpCircle, LogOut, ChevronRight, Sun } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useTheme } from '../../contexts/ThemeContext';

interface ProfileScreenProps {
  onSettings: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onSettings, onLogout }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Profile
          </h1>
        </motion.div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className={`w-16 h-16 sm:w-20 sm:h-20 border-2 ${
                theme === 'dark' ? 'border-white/20' : 'border-gray-200/50'
              }`}>
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  John Doe
                </h2>
                <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>
                  john.doe@example.com
                </p>
              </div>
            </div>

            {/* Subscription Status */}
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                : 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 border-yellow-500/40'
            }`}>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Free Plan
                </span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
              >
                Upgrade
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Your Stats
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <GlassCard className="p-3 sm:p-4 text-center">
              <FileText className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              }`} />
              <div className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                47
              </div>
              <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                Notes
              </div>
            </GlassCard>
            <GlassCard className="p-3 sm:p-4 text-center">
              <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`} />
              <div className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                12
              </div>
              <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                Day Streak
              </div>
            </GlassCard>
            <GlassCard className="p-3 sm:p-4 text-center">
              <Calendar className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                theme === 'dark' ? 'text-pink-300' : 'text-pink-600'
              }`} />
              <div className={`mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                30
              </div>
              <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                Days Active
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={`mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Quick Settings
          </h3>
          <GlassCard className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <div>
                  <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Notifications
                  </div>
                  <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                    Get reminded about your notes
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className={`h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300/50'}`} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-purple-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </div>
                  <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                    Toggle theme appearance
                  </div>
                </div>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>

            <div className={`h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300/50'}`} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
                </div>
                <div>
                  <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Privacy & Security
                  </div>
                  <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                    Manage your data
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-2">
            <button
              onClick={onSettings}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                  <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  All Settings
                </span>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/50' : 'text-gray-400'}`} />
            </button>

            <button className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Help & Support
                </span>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/50' : 'text-gray-400'}`} />
            </button>
          </GlassCard>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-red-400/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </Button>
        </motion.div>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/40"
        >
          NoteWise AI v1.0.0
        </motion.div>
      </div>
    </div>
  );
}
