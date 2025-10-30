
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { AnimatedBackground } from '../AnimatedBackground';

interface AcceptTermsScreenProps {
  onAccept: () => void;
}

export function AcceptTermsScreen({ onAccept }: AcceptTermsScreenProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col">
      <AnimatedBackground />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8">
            <div className="text-center mb-6">
              <ShieldCheck className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-white text-2xl font-bold mb-2">Terms & Conditions</h1>
              <p className="text-white/80">
                Please review and accept our terms to continue.
              </p>
            </div>

            <div className="text-sm text-white/70 bg-white/5 p-4 rounded-lg h-48 overflow-y-auto scrollbar-hide mb-6">
              <p className="mb-2">Last updated: July 26, 2024</p>
              <p className="mb-2">
                Welcome to NoteWise AI. By using our app, you agree to our Terms of Service and Privacy Policy.
              </p>
              <p className="mb-2">
                You retain ownership of all content you create. We use your data to provide AI features but do not use it for training models without your consent.
              </p>
              <p>
                You can manage your data, including exporting or deleting it, from the Privacy & Security settings. For more details, please read the full documents.
              </p>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <Checkbox 
                id="terms" 
                checked={isAccepted}
                onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-white/90">
                I have read and agree to the{' '}
                <a href="#" className="underline hover:text-white">Terms of Service</a> and{' '}
                <a href="#" className="underline hover:text-white">Privacy Policy</a>.
              </Label>
            </div>

            <Button
              onClick={onAccept}
              disabled={!isAccepted}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
            >
              Continue
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
