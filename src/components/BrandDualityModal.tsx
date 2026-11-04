import React from 'react';
import { X, CheckCircle2, ShieldCheck, Heart, Sparkles, Brain, Award } from 'lucide-react';

interface BrandDualityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandDualityModal: React.FC<BrandDualityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Brand Positioning Duality Architecture
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
                  $50M+ Playbook
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct-response psychology for "The Fidget Game" educational toy scaling
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-100">The 8-Figure Formula:</span> Every successful ad for The Fidget Game resolves a tension between <span className="text-cyan-300 font-semibold">The Rational Buyer</span> (who holds the credit card and worries about development) and <span className="text-pink-300 font-semibold">The Emotional Consumer</span> (who must actually engage with the toy for it not to collect dust).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* The Rational Buyer */}
            <div className="bg-gradient-to-b from-cyan-950/30 to-slate-950/70 p-5 rounded-xl border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-cyan-300">1. THE RATIONAL BUYER</h4>
                  <p className="text-xs text-slate-400">Parents, Teachers, Homeschoolers</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90 mb-2">
                  Primary Motivations:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Science of Reading:</strong> Phonics, phonemic awareness, orthographic mapping.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Stopping Homework Tears:</strong> Ending the 6:30 PM kitchen table screaming match.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Screen Detox:</strong> Replacing tablet zombie trance with tactile engagement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Educator Validation:</strong> Recommended by 50,000+ certified reading specialists.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-cyan-900/40">
                <p className="text-xs font-semibold text-slate-400 mb-1">Tone & Delivery:</p>
                <p className="text-xs text-cyan-200/90 italic">
                  Empathetic, credible, solution-oriented, relieving, authoritative yet warm.
                </p>
              </div>
            </div>

            {/* The Emotional Consumer */}
            <div className="bg-gradient-to-b from-pink-950/30 to-slate-950/70 p-5 rounded-xl border border-pink-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-pink-300">2. THE EMOTIONAL CONSUMER</h4>
                  <p className="text-xs text-slate-400">Children, Ages 3-11</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-400/90 mb-2">
                  Primary Motivations:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Tactile Fidget Popping:</strong> The visceral physical joy of crisp silicone pops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Squishy Collection:</strong> Adorable collectible squishy creatures & rewards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Unboxing Excitement:</strong> Tearing open mystery boxes and vibrant cards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Playful Competition:</strong> Racing siblings/parents, scoring points, winning tokens.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-pink-900/40">
                <p className="text-xs font-semibold text-slate-400 mb-1">Tone & Delivery:</p>
                <p className="text-xs text-pink-200/90 italic">
                  High-energy, colorful, joyous, infectious giggles, addictive playability.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Hook Rule */}
          <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-200 leading-normal">
              <strong>Creative Director Rule:</strong> Always pair an audible sensory action (loud pop, squishy squeeze, unboxing rip) in the first 1.5 seconds to capture the child or parent's thumb, followed by an empathetic problem agitating line within 3 seconds.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Got It, Let's Scale
          </button>
        </div>
      </div>
    </div>
  );
};
