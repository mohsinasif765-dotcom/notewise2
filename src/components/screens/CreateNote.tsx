
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, FileUp, Mic, Camera, Upload, Play, Square, Image, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ProgressIndicator } from '../ProgressIndicator';
import { useTheme } from '../../contexts/ThemeContext';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

interface CreateNoteProps {
  initialMethod?: string;
  onBack: () => void;
  onNoteCreated: (noteId: string) => void;
}

const progressMessages = [
    "Analyzing content...",
    "Extracting key points...",
    "Generating AI summary...",
    "Finding relevant topics...",
    "Finalizing your note...",
];

export function CreateNote({ initialMethod, onBack, onNoteCreated }: CreateNoteProps) {
  const { theme } = useTheme();
  const [method, setMethod] = useState(initialMethod || '');
  const [textContent, setTextContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Stop any active streams when the component unmounts or method changes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [method]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
    }
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setHasMicPermission(true);
      // We can start recording right away if we want, or wait for another user action
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setHasMicPermission(false);
      return null;
    }
  };


  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      onNoteCreated('new-note-1');
    }, 4000);
  };

  return (
    <>
      <ProgressIndicator isVisible={isGenerating} messages={progressMessages} />
      {!method ? (
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={onBack}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-white">Create Note</h1>
            </div>

            <p className="text-white/80">Choose your input method</p>

            {/* Method Selection */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard
                  className="p-6 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => setMethod('text')}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">Manual Text Input</h3>
                      <p className="text-white/70">Type or paste your notes</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard
                  className="p-6 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => setMethod('pdf')}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400">
                      <FileUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">PDF Upload</h3>
                      <p className="text-white/70">Upload documents</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard
                  className="p-6 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => {
                      setMethod('audio');
                      requestMicPermission();
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-400">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">Audio & Video</h3>
                      <p className="text-white/70">Record or upload media</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard
                  className="p-6 cursor-pointer active:scale-98 transition-transform"
                  onClick={() => {
                      setMethod('image');
                      requestCameraPermission();
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">Image Recognition</h3>
                      <p className="text-white/70">Capture or upload images</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {method === 'text' && (
            <div className="flex-1 flex flex-col pb-24">
              <div className="p-6 space-y-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMethod('')}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-white">Text Note</h1>
                    <p className="text-white/70">Type or paste your content</p>
                  </div>
                </div>

                {/* Text Input */}
                <GlassCard className="p-4 flex-1 flex flex-col">
                  <Textarea
                    placeholder="Start typing your notes here..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-white placeholder:text-white/50 resize-none focus-visible:ring-0"
                  />
                </GlassCard>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!textContent || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-5 h-5" />
                      Generate Note
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          {method === 'pdf' && (
            <div className="flex-1 flex flex-col pb-24">
              <div className="p-6 space-y-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMethod('')}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-white">PDF Upload</h1>
                    <p className="text-white/70">Upload your documents</p>
                  </div>
                </div>

                {/* Upload Area */}
                <GlassCard className="p-8 flex-1 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/15 transition-colors">
                  <Upload className="w-16 h-16 text-white/70 mb-4" />
                  <h3 className="text-white mb-2">Tap to upload PDF</h3>
                  <p className="text-white/60 mb-4">Or drag and drop your file here</p>
                  <p className="text-white/40">Max file size: 10MB</p>
                </GlassCard>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Process Document
                </Button>
              </div>
            </div>
          )}
          {method === 'audio' && (
            <div className="flex-1 flex flex-col pb-24">
              <div className="p-6 space-y-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMethod('')}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-white">Audio/Video</h1>
                    <p className="text-white/70">Record or upload media</p>
                  </div>
                </div>

                {hasMicPermission === false && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Microphone Access Denied</AlertTitle>
                        <AlertDescription>
                            Please enable microphone permissions in your browser settings to record audio.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Recording Interface */}
                <GlassCard className="p-8 flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    animate={isRecording ? {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                      isRecording
                        ? 'bg-gradient-to-br from-red-500 to-pink-500'
                        : 'bg-gradient-to-br from-green-400 to-teal-400'
                    }`}
                  >
                    <Mic className="w-16 h-16 text-white" />
                  </motion.div>
                  
                  <h3 className="text-white mb-2">
                    {isRecording ? 'Recording...' : 'Ready to Record'}
                  </h3>
                  <p className="text-white/60 mb-6">
                    {isRecording ? '00:45' : 'Tap to start recording'}
                  </p>

                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    disabled={hasMicPermission === false}
                    className={`w-24 h-24 rounded-full ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </Button>
                </GlassCard>

                <div className="text-center text-white/60 mb-4">OR</div>

                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Upload className="mr-2 w-5 h-5" />
                  Upload Audio/Video File
                </Button>

                {isRecording && (
                  <Button
                    onClick={handleGenerate}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Stop & Generate Note
                  </Button>
                )}
              </div>
            </div>
          )}
          {method === 'image' && (
            <div className="flex-1 flex flex-col pb-24">
              <div className="p-6 space-y-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMethod('')}
                    className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-white">Image Recognition</h1>
                    <p className="text-white/70">Capture or upload images</p>
                  </div>
                </div>

                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Camera Access Denied</AlertTitle>
                        <AlertDescription>
                            Please enable camera permissions in your browser settings to use this feature.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Camera/Upload Interface */}
                <GlassCard className="p-2 flex-1 flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    {hasCameraPermission === null && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                            <Camera className="w-24 h-24 text-white/70 mb-6" />
                            <p className="text-white/80">Requesting camera access...</p>
                        </div>
                    )}
                  </div>
                </GlassCard>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    disabled={hasCameraPermission !== true}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
                  >
                    <Camera className="mr-2 w-5 h-5" />
                    Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Image className="mr-2 w-5 h-5" />
                    Choose Image
                  </Button>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || hasCameraPermission !== true}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Process Image
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

