import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, Edit, Trash2, Download, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface NoteDetailProps {
  noteId: string;
  onBack: () => void;
}

export function NoteDetail({ noteId, onBack }: NoteDetailProps) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: true
  });

  // Mock note data
  const note = {
    title: 'Team Meeting Notes',
    type: 'audio',
    timestamp: '2 hours ago',
    duration: '45 minutes',
    summary: 'Comprehensive discussion about Q4 goals, project timelines, and resource allocation. Team aligned on priorities and next steps.',
    keyPoints: [
      'Q4 revenue target increased by 15%',
      'New product launch scheduled for November',
      'Marketing campaign to start in 2 weeks',
      'Hiring 3 new team members by end of month',
      'Weekly sync meetings moved to Thursdays'
    ],
    actionItems: [
      'Send proposal to client by Friday',
      'Schedule follow-up meeting with design team',
      'Review budget allocation'
    ],
    transcript: `[00:00] John: Good morning everyone, thanks for joining today's meeting. Let's start with a quick review of our Q4 goals.\n\n[02:15] Sarah: Based on our current trajectory, I think we can push our revenue target up by 15%. The new product is showing great promise.\n\n[05:30] Mike: That sounds ambitious but achievable. What's our timeline for the product launch?\n\n[07:45] Sarah: We're targeting November 15th. The development team is on track, and we've already started preparing marketing materials.\n\n[10:20] John: Great. Let's talk about the marketing campaign. When can we kick that off?\n\n[12:00] Emma: We're planning to start the campaign in 2 weeks. We have the creative assets ready and ad budget approved.\n\n[15:30] John: Perfect. One more thing - we need to expand the team. I'd like to hire 3 new team members by the end of the month.\n\n[18:00] Mike: I'll work with HR to expedite the hiring process.\n\n[20:15] John: Also, moving forward, let's shift our weekly sync meetings to Thursdays. It works better with everyone's schedule.\n\n[22:30] All: Sounds good!`,
    tags: ['Meeting', 'Q4 Planning', 'Product Launch', 'Team']
  };

  const toggleActionItem = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-purple-900/30 border-b border-white/10">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-white">{note.title}</h2>
              <p className="text-white/60">{note.timestamp}</p>
            </div>
          </div>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <Star
              className={`w-6 h-6 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* AI Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white mb-2">AI Summary</h3>
                  <p className="text-white/90">{note.summary}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {note.tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-white/10 text-white border-white/20"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white mb-3">Key Points</h3>
            <GlassCard className="p-5">
              <div className="space-y-3">
                {note.keyPoints.map((point, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <p className="text-white/90 flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white mb-3">Action Items</h3>
            <GlassCard className="p-5">
              <div className="space-y-3">
                {note.actionItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => toggleActionItem(index)}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                        checkedItems[index]
                          ? 'text-green-400 fill-green-400'
                          : 'text-white/50 group-hover:text-white/70'
                      }`}
                    />
                    <p
                      className={`text-white/90 flex-1 transition-all ${
                        checkedItems[index] ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Full Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-white mb-3">Full Transcript</h3>
            <GlassCard className="p-5">
              <p className="text-white/80 whitespace-pre-line leading-relaxed">
                {note.transcript}
              </p>
            </GlassCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-3 pt-4"
          >
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Edit className="mr-2 w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="mr-2 w-4 h-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-red-400/50 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Delete
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
