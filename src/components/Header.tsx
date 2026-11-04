import React from 'react';
import {
  Sparkles,
  BookOpen,
  Download,
  Flame,
  HelpCircle,
  Layers,
  Sliders,
  ShoppingBag,
  ShieldCheck,
  Table,
} from 'lucide-react';

interface HeaderProps {
  mode: 'mode_1' | 'mode_2';
  setMode: (mode: 'mode_1' | 'mode_2') => void;
  onOpenDuality: () => void;
  onOpenExport: () => void;
  onScrollToInputs: () => void;
  activeView: 'matrix' | 'script' | 'simulator' | 'hooks' | 'prompts';
  setActiveView: (view: 'matrix' | 'script' | 'simulator' | 'hooks' | 'prompts') => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  onOpenDuality,
  onOpenExport,
  onScrollToInputs,
  activeView,
  setActiveView,
}) => {
  const isMode2 = mode === 'mode_2';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer" onClick={onScrollToInputs}>
              {/* Rainbow popping silicone bubble effect */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-yellow-400 to-cyan-400 p-0.5 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20" />
                  {/* Silicone Pop-It grid mini icon */}
                  <div className="grid grid-cols-2 gap-1 relative z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                  THE FIDGET GAME
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300">
                  Scaling $50M+
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <span>AI Creative Director & Marketplace Strategist</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {isMode2 ? 'Amazon A+ Compliance Verified' : 'Science of Reading Aligned'}
                </span>
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          {!isMode2 ? (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveView('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'matrix'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                1. Matrix
              </button>
              <button
                onClick={() => setActiveView('script')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'script'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                2. 4-Col Script
              </button>
              <button
                onClick={() => setActiveView('simulator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'simulator'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                UGC Sim
              </button>
              <button
                onClick={() => setActiveView('hooks')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'hooks'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                3. Hooks
              </button>
              <button
                onClick={() => setActiveView('prompts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'prompts'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-pink-400" />
                4. Prompts
              </button>
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2 bg-amber-950/40 border border-amber-500/30 px-3.5 py-1.5 rounded-xl text-xs text-amber-300 font-semibold">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Amazon A+ Content Suite Active (Modules 1–5)</span>
            </div>
          )}

          {/* Mode Switcher & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Mode Toggle Button */}
            <button
              onClick={() => setMode(isMode2 ? 'mode_1' : 'mode_2')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all ${
                isMode2
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                  : 'bg-pink-500/20 text-pink-300 border-pink-500/50 hover:bg-pink-500/30'
              }`}
            >
              {isMode2 ? <ShoppingBag className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
              <span>{isMode2 ? 'Mode 2: Amazon A+' : 'Mode 1: Ad Creative'}</span>
            </button>

            <button
              onClick={onOpenDuality}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl flex items-center gap-1.5 transition-colors hidden sm:flex"
              title="Brand Positioning Duality Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
              <span>Duality</span>
            </button>

            <button
              onClick={onOpenExport}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 hover:opacity-95 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-400/10 transition-transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
