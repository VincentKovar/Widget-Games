import React, { useState, useEffect, useRef } from 'react';
import { ScriptRow } from '../types/creative';
import { X, Play, Pause, RotateCcw, Type, FlipHorizontal, Eye } from 'lucide-react';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: ScriptRow[];
  angleName: string;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  script,
  angleName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState<number>(24);
  const [isMirrored, setIsMirrored] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Timer loop
  useEffect(() => {
    if (isPlaying) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying]);

  // Auto scroll loop
  useEffect(() => {
    let animId: number;
    if (isPlaying && containerRef.current) {
      const scrollStep = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop += 1.2;
        }
        animId = requestAnimationFrame(scrollStep);
      };
      animId = requestAnimationFrame(scrollStep);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  if (!isOpen) return null;

  const handleReset = () => {
    setIsPlaying(false);
    setTimerSeconds(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                UGC Creator Teleprompter
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {angleName.split(':')[0]}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Position near your phone lens for natural eye contact</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size controls */}
            <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
              <Type className="w-3.5 h-3.5 text-slate-400 mr-1" />
              <button
                onClick={() => setFontSize((s) => Math.max(16, s - 3))}
                className="px-1.5 text-xs font-bold hover:text-pink-400"
              >
                A-
              </button>
              <span className="text-xs text-slate-400 font-mono px-1">{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(42, s + 3))}
                className="px-1.5 text-xs font-bold hover:text-pink-400"
              >
                A+
              </button>
            </div>

            {/* Mirror Toggle */}
            <button
              onClick={() => setIsMirrored(!isMirrored)}
              className={`p-2 rounded-xl border transition-colors ${
                isMirrored ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="Mirror Mode (for teleprompter glass)"
            >
              <FlipHorizontal className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prompt Screen Body */}
        <div
          ref={containerRef}
          className={`flex-1 overflow-y-auto px-8 sm:px-16 py-12 space-y-12 select-none scroll-smooth transition-transform ${
            isMirrored ? 'scale-x-[-1]' : ''
          }`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
        >
          {script.map((scene, idx) => (
            <div key={idx} className="space-y-4 border-b border-slate-800/60 pb-10">
              {/* Scene Badge & Visual Cue */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm px-3 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                  {scene.timecode}
                </span>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                  Scene #{idx + 1}
                </span>
              </div>

              {/* Visual Cue for talent */}
              <div className="text-xs text-slate-400 italic bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                🎥 <strong>Visual Cue:</strong> {scene.visualAction}
              </div>

              {/* Spoken Voiceover Line */}
              <div className="font-semibold text-slate-100 tracking-wide">
                {scene.audioVo}
              </div>

              {/* On-Screen Text Cue */}
              <div className="text-sm font-bold text-amber-300/90 flex items-center gap-2">
                <span>📱 Overlay Text:</span>
                <span className="bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                  {scene.textOverlay}
                </span>
              </div>
            </div>
          ))}

          <div className="py-24 text-center text-slate-600 text-sm">
            --- END OF SCRIPT (25 SECONDS) ---
          </div>
        </div>

        {/* Bottom Playback & Timer Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 text-white flex items-center gap-2 shadow-lg shadow-pink-500/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Scroll' : 'Start Scroll'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-lg font-bold text-slate-200">
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              <span className="text-xs text-slate-500 ml-1.5 font-sans">Elapsed (Goal: ~0:25)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
