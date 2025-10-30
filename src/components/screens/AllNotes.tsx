import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, FileUp, Mic, Camera, Star, Filter } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface AllNotesProps {
  onViewNote: (noteId: string) => void;
}

const mockNotes = [
  {
    id: '1',
    title: 'Team Meeting Notes',
    preview: 'Discussed Q4 goals and project timelines...',
    type: 'audio',
    icon: Mic,
    color: 'from-green-400 to-teal-400',
    timestamp: '2 hours ago',
    favorite: true
  },
  {
    id: '2',
    title: 'Research Paper Summary',
    preview: 'Key findings from the AI research paper...',
    type: 'pdf',
    icon: FileUp,
    color: 'from-blue-400 to-cyan-400',
    timestamp: 'Yesterday',
    favorite: false
  },
  {
    id: '3',
    title: 'Whiteboard Ideas',
    preview: 'Brainstorming session captured from whiteboard...',
    type: 'image',
    icon: Camera,
    color: 'from-orange-400 to-yellow-400',
    timestamp: '3 days ago',
    favorite: true
  },
  {
    id: '4',
    title: 'Project Kickoff Notes',
    preview: 'Initial planning and requirements gathering...',
    type: 'text',
    icon: FileText,
    color: 'from-purple-400 to-pink-400',
    timestamp: '1 week ago',
    favorite: false
  },
  {
    id: '5',
    title: 'Interview Recording',
    preview: 'Customer interview about product features...',
    type: 'audio',
    icon: Mic,
    color: 'from-green-400 to-teal-400',
    timestamp: '1 week ago',
    favorite: false
  },
  {
    id: '6',
    title: 'Contract Document',
    preview: 'Legal contract review and key terms...',
    type: 'pdf',
    icon: FileUp,
    color: 'from-blue-400 to-cyan-400',
    timestamp: '2 weeks ago',
    favorite: true
  },
  {
    id: '7',
    title: 'Design Mockups',
    preview: 'UI/UX design screenshots and annotations...',
    type: 'image',
    icon: Camera,
    color: 'from-orange-400 to-yellow-400',
    timestamp: '2 weeks ago',
    favorite: false
  },
  {
    id: '8',
    title: 'Daily Standup',
    preview: 'Quick team updates and blockers...',
    type: 'text',
    icon: FileText,
    color: 'from-purple-400 to-pink-400',
    timestamp: '3 weeks ago',
    favorite: false
  }
];

export function AllNotes({ onViewNote }: AllNotesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', count: mockNotes.length },
    { id: 'text', label: 'Text', count: mockNotes.filter(n => n.type === 'text').length },
    { id: 'pdf', label: 'PDF', count: mockNotes.filter(n => n.type === 'pdf').length },
    { id: 'audio', label: 'Audio', count: mockNotes.filter(n => n.type === 'audio').length },
    { id: 'image', label: 'Image', count: mockNotes.filter(n => n.type === 'image').length },
  ];

  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || note.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-white mb-6">All Notes</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            type="search"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant="outline"
              className={`flex-shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              {filter.label}
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/20">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-3">
        {filteredNotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white mb-2">No notes found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          filteredNotes.map((note, index) => {
            const Icon = note.icon;
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard
                  className="p-4 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => onViewNote(note.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white truncate">{note.title}</h3>
                        {note.favorite && (
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-white/60 line-clamp-2 mb-2">{note.preview}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50">{note.timestamp}</span>
                        <span className="text-white/50 capitalize">{note.type}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
