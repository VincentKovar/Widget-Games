import React, { useState, useEffect, useRef } from 'react';
import { ScriptRow } from '../types/creative';
import { playPopSound, speakVoiceover, stopVoiceover } from '../utils/audio';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Disc,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface UgcSimulatorProps {
  script: ScriptRow[];
  angleName: string;
}

export const UgcSimulator: React.FC<UgcSimulatorProps> = ({ script, angleName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 25 seconds
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState(true);
  const [poppedBubbles, setPoppedBubbles] = useState<boolean[]>(new Array(16).fill(false));
  const timerRef = useRef<number | null>(null);

  // Time boundaries in seconds
  // Scene 0: 0 to 3
  // Scene 1: 3 to 8
  // Scene 2: 8 to 18
  // Scene 3: 18 to 25
  const getSceneForTime = (time: number): number => {
    if (time < 3) return 0;
    if (time < 8) return 1;
    if (time < 18) return 2;
    return 3;
  };

  // Play voiceover when scene changes if enabled
  useEffect(() => {
    if (isPlaying && isVoiceoverEnabled && script[activeSceneIndex]) {
      speakVoiceover(script[activeSceneIndex].audioVo);
    }
  }, [activeSceneIndex, isPlaying, isVoiceoverEnabled, script]);

  // Main playback timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= 25) {
            setIsPlaying(false);
            stopVoiceover();
            return 25;
          }
          const scene = getSceneForTime(next);
          if (scene !== activeSceneIndex) {
            setActiveSceneIndex(scene);
          }
          return next;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeSceneIndex]);

  const handlePlayPause = () => {
    if (currentTime >= 25) {
      setCurrentTime(0);
      setActiveSceneIndex(0);
    }
    if (isPlaying) {
      stopVoiceover();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    stopVoiceover();
    setCurrentTime(0);
    setActiveSceneIndex(0);
    setPoppedBubbles(new Array(16).fill(false));
  };

  const handleSeekScene = (index: number) => {
    stopVoiceover();
    const targetTime = index === 0 ? 0 : index === 1 ? 3.1 : index === 2 ? 8.1 : 18.1;
    setCurrentTime(targetTime);
    setActiveSceneIndex(index);
    if (isPlaying && isVoiceoverEnabled && script[index]) {
      speakVoiceover(script[index].audioVo);
    }
  };

  const handleBubbleClick = (index: number) => {
    playPopSound(1 + (index % 4) * 0.1);
    setPoppedBubbles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const currentScene = script[activeSceneIndex] || script[0] || {
    timecode: '0:00 - 0:03',
    visualAction: 'Hook visual',
    audioVo: 'Voiceover line',
    textOverlay: 'On-Screen Overlay',
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Live UGC Short-Form Simulator</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
              9:16 Mobile View
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Preview the sound-on audio pacing, high-contrast overlay text, and multisensory gameplay in real time
          </p>
        </div>

        {/* Global Sound Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsVoiceoverEnabled(!isVoiceoverEnabled);
              if (isVoiceoverEnabled) stopVoiceover();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isVoiceoverEnabled
                ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {isVoiceoverEnabled ? <Volume2 className="w-3.5 h-3.5 text-pink-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isVoiceoverEnabled ? 'Speech VO: ON' : 'Speech VO: OFF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 9:16 Realistic Mobile Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[9/19] bg-black rounded-[42px] border-[6px] border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Phone Notch / Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-slate-800 inline-block mr-2" />
              <span className="w-2 h-2 rounded-full bg-slate-950 inline-block" />
            </div>

            {/* Video Stage Simulation Layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              {/* Dynamic Scene Visual Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className={`w-full h-full transition-all duration-700 ${
                  activeSceneIndex === 0 ? 'bg-gradient-to-br from-red-600 via-pink-600 to-purple-800' :
                  activeSceneIndex === 1 ? 'bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-800' :
                  activeSceneIndex === 2 ? 'bg-gradient-to-br from-cyan-600 via-emerald-600 to-blue-800' :
                  'bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-800'
                }`} />
              </div>

              {/* In-Video Interactive Sensory Pop-It Board */}
              <div className="relative z-10 w-full max-w-[240px] bg-slate-900/90 border-2 border-pink-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-sm mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black tracking-wider uppercase text-pink-400">
                      The Fidget Game
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                    Tap to Pop!
                  </span>
                </div>

                {/* 4x4 Silicone Bubble Grid */}
                <div className="grid grid-cols-4 gap-2 py-1">
                  {poppedBubbles.map((isPopped, bIdx) => {
                    const colors = [
                      'from-pink-500 to-rose-600',
                      'from-amber-400 to-orange-500',
                      'from-emerald-400 to-teal-500',
                      'from-cyan-400 to-blue-600',
                    ];
                    const rowColor = colors[Math.floor(bIdx / 4)];

                    return (
                      <button
                        key={bIdx}
                        type="button"
                        onClick={() => handleBubbleClick(bIdx)}
                        className={`w-10 h-10 rounded-full transition-all flex items-center justify-center font-bold text-[10px] shadow-md active:scale-90 ${
                          isPopped
                            ? 'bg-slate-950 border border-slate-700 text-slate-500 scale-95 shadow-inner'
                            : `bg-gradient-to-br ${rowColor} text-white shadow-lg scale-100 hover:brightness-110`
                        }`}
                      >
                        {isPopped ? 'POP' : '●'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic On-Screen High-Contrast Caption (Sound-Off Safe) */}
              <div className="relative z-10 w-full px-2">
                <div className="bg-black/85 backdrop-blur-md border border-amber-400/80 px-3 py-2 rounded-xl text-center shadow-2xl animate-in zoom-in-95 duration-200">
                  <p className="text-xs sm:text-sm font-black text-amber-300 tracking-tight leading-snug drop-shadow-md">
                    {currentScene.textOverlay}
                  </p>
                </div>
              </div>
            </div>

            {/* TikTok Right Side Engagement Action Icons */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-600 flex items-center justify-center text-xs font-bold shadow-lg">
                  FG
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white">
                  +
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Heart className="w-7 h-7 text-white fill-pink-500/80 drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-0.5">84.2K</span>
              </div>

              <div className="flex flex-col items-center">
                <MessageCircle className="w-7 h-7 text-white fill-white/20 drop-shadow-lg cursor-pointer" />
                <span className="text-[10px] font-bold mt-0.5">1,280</span>
              </div>

              <div className="flex flex-col items-center">
                <Bookmark className="w-7 h-7 text-white fill-yellow-400/80 drop-shadow-lg cursor-pointer" />
                <span className="text-[10px] font-bold mt-0.5">19.5K</span>
              </div>

              <div className="flex flex-col items-center">
                <Share2 className="w-7 h-7 text-white drop-shadow-lg cursor-pointer" />
                <span className="text-[10px] font-bold mt-0.5">Share</span>
              </div>

              <div className="mt-2 animate-spin-slow">
                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                  <Disc className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Bottom TikTok Sound & Caption Info */}
            <div className="relative z-20 p-4 pb-8 text-left text-white bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <p className="font-bold text-xs flex items-center gap-1.5 text-pink-300">
                <span>@TheFidgetGame</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/30 text-pink-200">
                  Official
                </span>
              </p>
              <p className="text-[11px] text-slate-200 mt-1 line-clamp-2 leading-tight">
                {currentScene.audioVo}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                <span className="truncate">Original Sound - Tear-Free Reading Breakthrough</span>
              </div>
            </div>

            {/* Bottom Progress Bar inside Phone */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 z-30">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-100"
                style={{ width: `${(currentTime / 25) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Controller, Timeline & Scene Inspector */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Controls Card */}
          <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reset to 0:00"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <div>
                  <div className="font-mono text-xl font-bold text-slate-100">
                    0:{currentTime.toFixed(1).padStart(4, '0')} <span className="text-xs text-slate-500">/ 0:25.0</span>
                  </div>
                  <p className="text-xs text-pink-400 font-semibold">
                    {activeSceneIndex === 0 ? '0:00 - 0:03 Hook & Thumbstop' :
                     activeSceneIndex === 1 ? '0:03 - 0:08 Problem Setup & Agitation' :
                     activeSceneIndex === 2 ? '0:08 - 0:18 Multisensory Gameplay Demo' :
                     '0:18 - 0:25 Social Proof & Direct CTA'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Angle</span>
                <span className="text-xs font-semibold text-slate-200">{angleName.split(':')[0]}</span>
              </div>
            </div>

            {/* Scrubber Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>0:00</span>
                <span>0:03 (Hook)</span>
                <span>0:08 (Problem)</span>
                <span>0:18 (Demo)</span>
                <span>0:25 (CTA)</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCurrentTime(val);
                  setActiveSceneIndex(getSceneForTime(val));
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>

          {/* Quick Scene Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {script.map((row, idx) => {
              const isSelected = activeSceneIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSeekScene(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-pink-500 text-pink-300 shadow-md shadow-pink-500/10'
                      : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase">{row.timecode}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-200 truncate">
                    {idx === 0 ? 'Hook & Action' : idx === 1 ? 'Agitate Problem' : idx === 2 ? 'Gameplay Pop' : 'Results & CTA'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Scene Breakdown Details */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Active Scene Staging Blueprint
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {currentScene.timecode}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Director's Visual & Staging Directions:
                </p>
                <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  {currentScene.visualAction}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-1">
                  Audio / Voiceover (Spoken Copy):
                </p>
                <p className="text-pink-100 font-medium leading-relaxed bg-pink-950/20 p-3 rounded-xl border border-pink-500/20">
                  {currentScene.audioVo}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  On-Screen High-Contrast Overlay (Sound-off):
                </p>
                <p className="text-amber-200 font-bold leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                  {currentScene.textOverlay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
