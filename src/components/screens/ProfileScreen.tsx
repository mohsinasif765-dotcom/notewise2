
'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { User, Crown, TrendingUp, FileText, Calendar, Bell, Moon, Shield, Settings, HelpCircle, LogOut, ChevronRight, Sun, Sparkles, Camera, Gift } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

interface ProfileScreenProps {
  onSettings: () => void;
  onLogout: () => void;
  onSubscription: () => void;
  onCreditsUsage: () => void;
  onHelpCenter: () => void;
  onPrivacySecurity: () => void;
  onReferral: () => void;
}

export function ProfileScreen({ onSettings, onLogout, onSubscription, onCreditsUsage, onHelpCenter, onPrivacySecurity, onReferral }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = user ? doc(firestore!, "users", user.uid) : null;
  const { data: userData } = useDoc(userDocRef);
  
  const [profilePic, setProfilePic] = useState<string | null>(user?.photoURL || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.photoURL) {
      setProfilePic(user.photoURL);
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePic(result);
        // In a real app, you'd upload this to Firebase Storage and update the user's photoURL.
        // For now, we'll just keep it in local state.
      };
      reader.readAsDataURL(file);
    }
  };

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
              <div className="relative">
                <Avatar className={`w-16 h-16 sm:w-20 sm:h-20 border-2 ${
                  theme === 'dark' ? 'border-white/20' : 'border-gray-200/50'
                }`}
                  onClick={handleAvatarClick}
                >
                  {profilePic ? (
                    <AvatarImage src={profilePic} alt="Profile Picture" />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                 <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-gray-800/70 text-white p-1.5 rounded-full backdrop-blur-sm"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <h2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {user?.displayName || 'User'}
                </h2>
                <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>
                  {user?.email}
                </p>
              </div>
            </div>
            
            {/* Credits Status */}
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
                theme === 'dark'
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                : 'bg-gradient-to-r from-blue-400/30 to-cyan-400/30 border-blue-500/40'
            } mb-2`}>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-300" />
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Credits Remaining
                    </span>
                </div>
                <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{userData?.credits || 0}</span>
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
                onClick={onSubscription}
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

            <button onClick={onPrivacySecurity} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
                </div>
                <div>
                  <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-left`}>
                    Privacy & Security
                  </div>
                  <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>
                    Manage your data
                  </div>
                </div>
              </div>
               <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/50' : 'text-gray-400'}`} />
            </button>
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
              onClick={onCreditsUsage}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Credits Usage
                </span>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/50' : 'text-gray-400'}`} />
            </button>
            
            <button
              onClick={onReferral}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Gift className={`w-5 h-5 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Referrals
                </span>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/50' : 'text-gray-400'}`} />
            </button>

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

            <button onClick={onHelpCenter} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
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
          className="text-center text-sm text-white/40"
        >
          NoteWise AI v1.0.0
        </motion.div>
        
        {/* Footer Branding */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center pt-8"
        >
            
            <p className="text-sm text-white/50 mt-2">
                Powered by AlMohsin Developers
            </p>
        </motion.div>
      </div>
    </div>
  );
}
