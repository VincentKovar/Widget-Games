import React from 'react';
import { ProductInput } from '../types/creative';
import { PRESET_PRODUCTS } from '../data/defaultCampaign';
import {
  Wand2,
  RefreshCw,
  Flame,
  Target,
  MessageSquare,
  ShoppingBag,
  Layers,
  Sparkles,
  GitCompare,
} from 'lucide-react';

interface InputStudioProps {
  input: ProductInput;
  setInput: React.Dispatch<React.SetStateAction<ProductInput>>;
  onGenerate: () => void;
  isLoading: boolean;
  onSelectPreset: (presetInput: ProductInput) => void;
}

export const InputStudio: React.FC<InputStudioProps> = ({
  input,
  setInput,
  onGenerate,
  isLoading,
  onSelectPreset,
}) => {
  const isMode2 = input.mode === 'mode_2';

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mode Selection Tabs */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              <span>Growth Architecture Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select output mode to architect high-converting ad scripts or compliance-checked Amazon A+ Content
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl self-start sm:self-center">
            <button
              type="button"
              onClick={() => setInput((prev) => ({ ...prev, mode: 'mode_1' }))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                !isMode2
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-pink-300" />
              <span>Mode 1: Ad Creative</span>
            </button>

            <button
              type="button"
              onClick={() => setInput((prev) => ({ ...prev, mode: 'mode_2' }))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isMode2
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Mode 2: Amazon A+</span>
            </button>
          </div>
        </div>

        {/* Quick Launch Presets */}
        <div className="pt-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Launch Preset:
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESET_PRODUCTS.map((preset) => {
              const isSelected =
                input.productName === preset.input.productName && input.mode === preset.input.mode;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset.input)}
                  className={`text-left p-2.5 rounded-xl border transition-all text-xs relative overflow-hidden group ${
                    isSelected
                      ? preset.input.mode === 'mode_2'
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-pink-950/40 border-pink-500/60 text-pink-200 shadow-md shadow-pink-500/10'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-semibold truncate">{preset.label}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-slate-300">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{preset.input.gradeAge}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="relative z-10 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name & Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-pink-400" />
                Product Name & Category
              </span>
              <span className="text-[10px] text-slate-500">e.g. "Sight Words Edition", "Squishyland"</span>
            </label>
            <input
              type="text"
              value={input.productName}
              onChange={(e) => setInput((prev) => ({ ...prev, productName: e.target.value }))}
              placeholder='e.g. The Fidget Game: Sight Words Edition'
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/40 transition-colors"
              required
            />
          </div>

          {/* Primary Target Grade/Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                Primary Target Grade / Age
              </span>
              <span className="text-[10px] text-slate-500">e.g. Pre-K, Grade 1</span>
            </label>
            <input
              type="text"
              value={input.gradeAge}
              onChange={(e) => setInput((prev) => ({ ...prev, gradeAge: e.target.value }))}
              placeholder="e.g. Kindergarten & Grade 1 (Ages 4-7)"
              className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/40 transition-colors"
              required
            />
          </div>
        </div>

        {/* Core Features / Value Proposition / Pain Point */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              {isMode2 ? 'Core Features / Value Proposition' : 'Core Pain Point / Creative Angle'}
            </span>
            <span className="text-[10px] text-slate-500">
              {isMode2 ? 'e.g. "Sight word recognition", "Pop fidget mechanics"' : 'e.g. "Kid struggles with sight word recognition"'}
            </span>
          </label>
          <textarea
            rows={2}
            value={input.coreFeatures || input.painPoint}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                painPoint: e.target.value,
                coreFeatures: e.target.value,
              }))
            }
            placeholder={
              isMode2
                ? 'e.g. Sight word recognition, pop fidget mechanics, 220 Dolch & Fry word cards, Science of Reading alignment'
                : 'e.g. Tears over flashcards, homework meltdowns, child refusing to read, falling behind peers'
            }
            className="w-full px-3.5 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/40 transition-colors resize-none"
            required
          />
        </div>

        {/* Mode-Specific Secondary Fields */}
        {isMode2 ? (
          /* Mode 2: Amazon A+ Comparison Items */
          <div className="space-y-1.5 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300">
                <GitCompare className="w-3.5 h-3.5 text-amber-400" />
                Comparison Catalog Items [For Mode 2 Only]
              </span>
              <span className="text-[10px] text-slate-500">e.g. "Word Pop!", "Math Ahoy", "Squishyland"</span>
            </label>
            <input
              type="text"
              value={input.comparisonCatalogItems || 'Word Pop!, Math Ahoy, Squishyland'}
              onChange={(e) => setInput((prev) => ({ ...prev, comparisonCatalogItems: e.target.value }))}
              placeholder='e.g. Word Pop!, Math Ahoy, Squishyland'
              className="w-full px-3.5 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/70"
            />
            <p className="text-[10px] text-slate-500">
              Populates the 5-row Amazon Cross-Sell Comparison Table across Grade Level, Learning Focus, Sensory Component, Play Style, and Best For.
            </p>
          </div>
        ) : (
          /* Mode 1: Paid Social Settings */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Platform & Channel Format
              </label>
              <select
                value={input.platform || 'TikTok & Meta Reels (9:16 UGC)'}
                onChange={(e) => setInput((prev) => ({ ...prev, platform: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-slate-700"
              >
                <option value="TikTok & Meta Reels (9:16 UGC)">TikTok & Meta Reels (9:16 UGC)</option>
                <option value="Meta Feed & Instagram (4:5 / 1:1)">Meta Feed & Instagram (4:5 / 1:1)</option>
                <option value="YouTube Shorts & Creator UGC">YouTube Shorts & Creator UGC</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Offer / Direct-Response CTA Hook
              </label>
              <input
                type="text"
                value={input.offerDiscount || ''}
                onChange={(e) => setInput((prev) => ({ ...prev, offerDiscount: e.target.value }))}
                placeholder='e.g. 30-Day "Tear-Free" Guarantee, Buy 2 Get 1 Free'
                className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {isMode2
                ? 'Architects 5 Amazon A+ Modules: 970x600 Banner, 4-Card Grid, Brand Story, Comparison Matrix, Compliance Audit'
                : 'Generates 3-Angle Matrix, 4-Column Script, 5 Batch Hooks, 2 Visual Prompts'}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-slate-950 shadow-lg hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              isMode2
                ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-amber-500/20'
                : 'bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 shadow-pink-500/20'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Architecting High-Converting Creative...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-slate-950" />
                <span>
                  {isMode2 ? 'Generate Amazon A+ Content Suite' : 'Generate High-Converting Campaign'}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
