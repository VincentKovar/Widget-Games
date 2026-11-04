import React from 'react';
import { CreativeMatrixAngle } from '../types/creative';
import { Layers, CheckCircle, ArrowRight, ShieldAlert, Sparkles, Smartphone, Eye } from 'lucide-react';

interface CreativeMatrixViewProps {
  angles: CreativeMatrixAngle[];
  selectedAngleId: string;
  onSelectAngle: (angleId: string) => void;
  onViewScript: (angleId: string) => void;
  onTestInSimulator: (angleId: string) => void;
}

export const CreativeMatrixView: React.FC<CreativeMatrixViewProps> = ({
  angles,
  selectedAngleId,
  onSelectAngle,
  onViewScript,
  onTestInSimulator,
}) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              1. Comprehensive Creative Matrix
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              3 Direct-Response Angles
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Systematically testing Pain-Agitate-Solve vs. Unboxing Joy vs. Screen-Free Contrast across buyer personas
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Click any angle card to inspect its full 4-column short-form script</span>
        </div>
      </div>

      {/* 3 Angles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {angles.map((angle, idx) => {
          const isSelected = angle.angleId === selectedAngleId;
          const isAngleA = idx === 0;
          const isAngleB = idx === 1;
          const isAngleC = idx === 2;

          let badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
          let borderHighlight = 'border-slate-800 hover:border-slate-700';
          let icon = <ShieldAlert className="w-4 h-4 text-cyan-400" />;

          if (isAngleA) {
            badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
            icon = <ShieldAlert className="w-4 h-4 text-cyan-400" />;
            if (isSelected) borderHighlight = 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-950/20';
          } else if (isAngleB) {
            badgeColor = 'bg-pink-500/20 text-pink-300 border-pink-500/40';
            icon = <Sparkles className="w-4 h-4 text-pink-400" />;
            if (isSelected) borderHighlight = 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-950/20';
          } else if (isAngleC) {
            badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            icon = <Smartphone className="w-4 h-4 text-amber-400" />;
            if (isSelected) borderHighlight = 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-950/20';
          }

          return (
            <div
              key={angle.angleId || idx}
              onClick={() => onSelectAngle(angle.angleId)}
              className={`rounded-2xl border bg-slate-900/90 p-5 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group shadow-lg ${borderHighlight}`}
            >
              {/* Active Badge */}
              {isSelected && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-md">
                  Active in Video Studio
                </div>
              )}

              <div className="space-y-4">
                {/* Angle Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="p-1 rounded-md bg-slate-800 border border-slate-700">
                      {icon}
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}>
                      {angle.angleName.split(':')[0] || `Angle ${String.fromCharCode(65 + idx)}`}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 group-hover:text-pink-300 transition-colors leading-snug">
                    {angle.angleName}
                  </h4>
                </div>

                {/* Target Audience / Voice */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Audience & Brand Voice:
                  </p>
                  <p className="text-xs font-semibold text-slate-200">
                    {angle.buyerFocus}
                  </p>
                </div>

                {/* Big Idea */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Big Idea:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{angle.bigIdea}"
                  </p>
                </div>

                {/* Hook Headline */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Direct-Response Hook Headline:
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-200 font-medium">
                    "{angle.hookHeadline}"
                  </div>
                </div>

                {/* Emotional Triggers */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Emotional Triggers:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {angle.emotionalTriggers.map((trig, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {trig}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Value Prop */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Core Value Proposition:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {angle.coreValueProp}
                  </p>
                </div>

                {/* Direct-Response CTA */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Conversion CTA:
                  </p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {angle.directResponseCta}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewScript(angle.angleId);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                  <span>Inspect Script</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTestInSimulator(angle.angleId);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/40 text-pink-300 flex items-center gap-1.5 transition-all"
                >
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
