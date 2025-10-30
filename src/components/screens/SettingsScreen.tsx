
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Moon, Globe, Database, Trash2, Lock, Mail, HelpCircle, LogOut, AlertTriangle, ChevronRight, Shield } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onPrivacySecurity: () => void;
}

export function SettingsScreen({ onBack, onLogout, onPrivacySecurity }: SettingsScreenProps) {
  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto px-6 space-y-6">
        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white mb-3">Preferences</h3>
          <GlassCard className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Push Notifications</div>
                  <div className="text-white/60">Receive app notifications</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-5 h-5 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Dark Mode</div>
                  <div className="text-white/60">Use dark theme</div>
                </div>
              </div>
              <Switch defaultChecked disabled />
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Language</div>
                  <div className="text-white/60">English (US)</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 flex-shrink-0"
              >
                Change
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Data & Storage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white mb-3">Data & Storage</h3>
          <GlassCard className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-orange-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Storage Used</div>
                  <div className="text-white/60">125 MB of 2 GB</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-red-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Clear Cache</div>
                  <div className="text-white/60">Free up space</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 flex-shrink-0"
              >
                Clear
              </Button>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Auto-sync</div>
                  <div className="text-white/60">Sync across devices</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>
        </motion.div>

        {/* Account & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white mb-3">Account & Security</h3>
          <GlassCard className="p-4 space-y-4">
             <button onClick={onPrivacySecurity} className="w-full flex items-center justify-between text-left">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Privacy Settings</div>
                  <div className="text-white/60">Manage your privacy</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50" />
            </button>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Change Password</div>
                  <div className="text-white/60">Update your password</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 flex-shrink-0"
              >
                Change
              </Button>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-white">Email Preferences</div>
                  <div className="text-white/60">Manage email notifications</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white mb-3">Support</h3>
          <GlassCard className="p-4 space-y-4">
            <button className="w-full flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-white">Help Center</div>
                  <div className="text-white/60">Get help and support</div>
                </div>
              </div>
            </button>

            <div className="h-px bg-white/10" />

            <button className="w-full flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <div className="text-white">Contact Us</div>
                  <div className="text-white/60">Send us a message</div>
                </div>
              </div>
            </button>

            <div className="h-px bg-white/10" />

            <button className="w-full flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <div className="text-white">About NoteWise AI</div>
                  <div className="text-white/60">Version 1.0.0</div>
                </div>
              </div>
            </button>
          </GlassCard>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-red-400 mb-3">Danger Zone</h3>
          <GlassCard className="p-4 space-y-3 border-red-400/30">
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-red-400/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="mr-2 w-5 h-5" />
              Logout
            </Button>

            <Button
              variant="outline"
              className="w-full border-red-400/50 text-red-400 hover:bg-red-500/10"
            >
              <AlertTriangle className="mr-2 w-5 h-5" />
              Delete Account
            </Button>
          </GlassCard>
        </motion.div>

        {/* Spacer for bottom padding */}
        <div className="h-8" />
      </div>
    </div>
  );
}
