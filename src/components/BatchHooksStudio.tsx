import React, { useState } from 'react';
import { BatchHook } from '../types/creative';
import { Sparkles, Copy, Check, TrendingUp, AlertCircle, Users, HelpCircle, ArrowUpRight } from 'lucide-react';

interface BatchHooksStudioProps {
  hooks: BatchHook[];
  onSwapHookIntoScript: (spokenHook: string, textOverlay: string, visualAction: string) => void;
}

export const BatchHooksStudio: React.FC<BatchHooksStudioProps> = ({
  hooks,
  onSwapHookIntoScript,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [swappedIndex, setSwappedIndex] = useState<number | null>(null);

  const handleCopy = (hook: BatchHook, index: number) => {
    const text = `HOOK #${hook.hookNumber} [${hook.category}] — ${hook.estimatedHookRate}\nSpoken: ${hook.spokenHook}\nOn-Screen Text: ${hook.textOverlay}\nVisual Action: ${hook.visualAction}\nWhy It Converts: ${hook.whyItWorks}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSwap = (hook: BatchHook, index: number) => {
    onSwapHookIntoScript(hook.spokenHook, hook.textOverlay, hook.visualAction);
    setSwappedIndex(index);
    setTimeout(() => setSwappedIndex(null), 2500);
  };

  const getCategoryBadge = (category: string) => {
    if (category.toLowerCase().includes('problem')) {
      return {
        icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />,
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        title: 'Problem-Based Pattern Interrupt',
      };
    }
    if (category.toLowerCase().includes('social') || category.toLowerCase().includes('educator')) {
      return {
        icon: <Users className="w-3.5 h-3.5 text-emerald-400" />,
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        title: 'Social Proof / Educator Credibility',
      };
    }
    return {
      icon: <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />,
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: 'Curiosity & Sensory Visual Hook',
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              3. Batch Hook Variations (Rapid Creative Testing)
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              5 High-Converting Variations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered to smash 40%+ 3-second thumbstop hook rates on Meta & TikTok by testing 3 distinct psychological angles
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>2x Problem • 2x Social Proof • 1x Visual Curiosity</span>
        </div>
      </div>

      {/* Hooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hooks.map((hook, idx) => {
          const catInfo = getCategoryBadge(hook.category);
          const isCopied = copiedIndex === idx;
          const isSwapped = swappedIndex === idx;

          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group relative overflow-hidden"
            >
              {/* Top Meta info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      #{hook.hookNumber || idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${catInfo.badge}`}>
                      {catInfo.icon}
                      <span>{hook.category}</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{hook.estimatedHookRate}</span>
                  </span>
                </div>

                {/* Spoken Audio Hook */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-1">
                    Spoken Auditory Hook:
                  </p>
                  <p className="text-xs text-slate-100 font-semibold leading-relaxed bg-pink-950/20 p-3 rounded-xl border border-pink-500/20">
                    {hook.spokenHook}
                  </p>
                </div>

                {/* On-Screen Text Overlay */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                    High-Contrast On-Screen Text:
                  </p>
                  <p className="text-xs text-amber-200 font-bold leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20 font-mono">
                    {hook.textOverlay}
                  </p>
                </div>

                {/* Visual Hook Action */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                    Visual Hook Action (0 - 3s):
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    {hook.visualAction}
                  </p>
                </div>

                {/* Why It Converts */}
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Direct-Response Psychology:
                  </p>
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">
                    "{hook.whyItWorks}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(hook, idx)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Hook'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSwap(hook, idx)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/40 text-pink-300 flex items-center gap-1.5 transition-all"
                  title="Swap this hook into Scene 1 of the video script"
                >
                  {isSwapped ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Swapped!</span>
                    </>
                  ) : (
                    <>
                      <span>Apply to Script</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
