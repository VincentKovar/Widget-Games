import React, { useState } from 'react';
import { ImagePrompt } from '../types/creative';
import { Sliders, Copy, Check, Camera, Image, Layers, Sparkles } from 'lucide-react';

interface PromptStudioProps {
  prompts: ImagePrompt[];
}

export const PromptStudio: React.FC<PromptStudioProps> = ({ prompts }) => {
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [copiedNegativeIndex, setCopiedNegativeIndex] = useState<number | null>(null);

  const handleCopyPrompt = (fullPrompt: string, index: number) => {
    navigator.clipboard.writeText(fullPrompt);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  const handleCopyNegative = (negativePrompt: string, index: number) => {
    navigator.clipboard.writeText(negativePrompt);
    setCopiedNegativeIndex(index);
    setTimeout(() => setCopiedNegativeIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              4. Asset Specification & Midjourney / Flux Prompts
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              Static Ad Visuals
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered prompts for high-converting Meta feed statics, Instagram carousel slides, and TikTok spark covers
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Calibrated for Midjourney v6.1 & Flux Schnell / Dev</span>
        </div>
      </div>

      {/* Prompts Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prompts.map((prompt, idx) => {
          const isCopiedPrompt = copiedPromptIndex === idx;
          const isCopiedNeg = copiedNegativeIndex === idx;
          const isParentChild = idx === 0;

          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Title & Aspect Ratio Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                      {isParentChild ? 'Concept 1: Lifestyle UGC & Relief' : 'Concept 2: Macro ASMR & Product Detail'}
                    </span>
                    <h4 className="text-base font-bold text-slate-100">
                      {prompt.promptName}
                    </h4>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 whitespace-nowrap">
                    {prompt.recommendedAspectRatio}
                  </span>
                </div>

                {/* Concept Description */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Creative Objective & Framing:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {prompt.conceptDescription}
                  </p>
                </div>

                {/* Visual Composition Card Mockup */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Image className="w-4 h-4 text-pink-400" />
                      Visual Color Palette & Tone
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Photorealistic 8K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isParentChild ? (
                      <>
                        <span className="h-6 flex-1 rounded-md bg-amber-200/90 border border-amber-300" title="Warm Golden Window Glow" />
                        <span className="h-6 flex-1 rounded-md bg-pink-400/90 border border-pink-400" title="The Fidget Game Pastel Pop" />
                        <span className="h-6 flex-1 rounded-md bg-stone-300/90 border border-stone-400" title="Natural Scandinavian Wood" />
                        <span className="h-6 flex-1 rounded-md bg-cyan-400/90 border border-cyan-400" title="Vibrant Phonics Card Accent" />
                      </>
                    ) : (
                      <>
                        <span className="h-6 flex-1 rounded-md bg-pink-500 border border-pink-400" title="Satisfying Silicone Pop Pink" />
                        <span className="h-6 flex-1 rounded-md bg-amber-400 border border-amber-300" title="Tactile Sensory Bubble" />
                        <span className="h-6 flex-1 rounded-md bg-cyan-400 border border-cyan-300" title="Educational Card Typography" />
                        <span className="h-6 flex-1 rounded-md bg-purple-500 border border-purple-400" title="Collectible Squishy Toy" />
                      </>
                    )}
                  </div>
                </div>

                {/* Full Midjourney Prompt */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1.5 text-pink-300">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      Ready-To-Use Generation Prompt:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(prompt.fullPrompt, idx)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-medium"
                    >
                      {isCopiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopiedPrompt ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      readOnly
                      rows={5}
                      value={prompt.fullPrompt}
                      className="w-full p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Camera & Lighting Specs */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Camera, Lens & Lighting Calibration:
                  </p>
                  <p className="text-xs text-slate-300 bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/20 leading-relaxed">
                    {prompt.cameraAndLightingDetails}
                  </p>
                </div>

                {/* Negative Prompt */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <span>Negative Prompt (--no):</span>
                    <button
                      type="button"
                      onClick={() => handleCopyNegative(prompt.negativePrompt, idx)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-medium"
                    >
                      {isCopiedNeg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopiedNeg ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-400">
                    {prompt.negativePrompt}
                  </div>
                </div>
              </div>

              {/* Bottom 1-Click Copy Full Action */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(prompt.fullPrompt, idx)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 hover:opacity-95 shadow-md shadow-pink-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  {isCopiedPrompt ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                  <span>{isCopiedPrompt ? 'Copied Prompt to Clipboard!' : 'Copy Full Midjourney / Flux Prompt'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
