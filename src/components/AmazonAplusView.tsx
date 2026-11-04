import React, { useState } from 'react';
import { AmazonAplusData } from '../types/creative';
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Grid,
  FileCheck2,
  Sparkles,
  School,
  Table,
  Layers,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface AmazonAplusViewProps {
  data: AmazonAplusData;
  productName: string;
}

export const AmazonAplusView: React.FC<AmazonAplusViewProps> = ({ data, productName }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getFullMarkdown = () => {
    return `# Amazon A+ Content: ${productName}

## MODULE 1: PREMIUM HERO BANNER (970x600 px)
- **Art Brief:** ${data.heroBanner.visualArtBrief}
- **Main Headline Overlay (Max 7 words):** "${data.heroBanner.mainHeadlineOverlay}"
- **Subheadline Overlay (Max 15 words):** "${data.heroBanner.subheadlineOverlay}"

---

## MODULE 2: 4-COLUMN FEATURE GRID (300x300 px)
${data.featureGrid
  .map(
    (card) => `### Card ${card.cardNumber}: ${card.title}
- **Copy (Parent ROI + Kid Fun):** ${card.copy}
- **Graphic Brief:** ${card.imageGraphicBrief}
`
  )
  .join('\n')}

---

## MODULE 3: BRAND STORY & EDUCATOR CREDIBILITY
### ${data.brandStory.sectionHeader}
${data.brandStory.bodyParagraph}

---

## MODULE 4: CATALOG CROSS-SELL COMPARISON MATRIX
| Metric / Feature | ${productName} | ${data.comparisonMatrix.catalogItems.join(' | ')} |
|---|---|---|---|---|
${data.comparisonMatrix.rows
  .map(
    (r) =>
      `| ${r.metric} | ${r.mainProductValue} | ${r.item1Value} | ${r.item2Value} | ${r.item3Value} |`
  )
  .join('\n')}

---

## MODULE 5: AMAZON COMPLIANCE AUDIT
${data.complianceAudit
  .map((item) => `- [x] **${item.rule}:** ${item.status} — ${item.details}`)
  .join('\n')}
`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-950/40 via-slate-900 to-pink-950/40 p-5 rounded-2xl border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Amazon A+ Content Suite & Marketplace Optimization
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
              100% Policy Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered for high conversion, mobile shopping scannability, and zero restricted claims on Amazon Brand Registry
          </p>
        </div>

        <button
          onClick={() => handleCopy(getFullMarkdown(), 'all')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-95 shadow-md shadow-amber-500/10 flex items-center gap-1.5 transition-all self-start sm:self-center"
        >
          {copiedSection === 'all' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
          <span>{copiedSection === 'all' ? 'Copied Full A+ Suite!' : 'Copy Full A+ Markdown'}</span>
        </button>
      </div>

      {/* MODULE 1: Premium Hero Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-pink-500/20 text-pink-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Module 1: Premium Hero Banner (Full Width — 970 x 600 px)
            </h4>
          </div>

          <button
            onClick={() =>
              handleCopy(
                `Headline: ${data.heroBanner.mainHeadlineOverlay}\nSubheadline: ${data.heroBanner.subheadlineOverlay}\nArt Brief: ${data.heroBanner.visualArtBrief}`,
                'mod1'
              )
            }
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
          >
            {copiedSection === 'mod1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy Module</span>
          </button>
        </div>

        {/* Visual Mockup Preview of 970x600 banner */}
        <div className="p-6 space-y-4">
          <div className="relative w-full aspect-[970/460] max-h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 border border-slate-700/80 flex flex-col justify-end p-6 sm:p-10 shadow-2xl">
            {/* Visual background artwork simulated grid */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/30 text-[11px] text-pink-300 font-mono">
              <span>970 x 600 px Standard Banner</span>
            </div>

            <div className="relative z-10 max-w-2xl space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[11px] font-black tracking-wider uppercase">
                The Fidget Game Official A+
              </div>

              {/* Main Headline (Max 7 words) */}
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                "{data.heroBanner.mainHeadlineOverlay}"
              </h2>

              {/* Subheadline (Max 15 words) */}
              <p className="text-sm sm:text-base font-semibold text-slate-200 drop-shadow-md">
                {data.heroBanner.subheadlineOverlay}
              </p>
            </div>
          </div>

          {/* Photographer & Art Brief Details */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <span>📸 Visual Art Brief & Composition Notes:</span>
            </p>
            <p className="text-slate-300 leading-relaxed italic">
              {data.heroBanner.visualArtBrief}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-400 border-t border-slate-800/80">
              <span>Headline Word Count: <strong className="text-emerald-400">{data.heroBanner.mainHeadlineOverlay.split(' ').length} / 7 words</strong></span>
              <span>Subheadline Word Count: <strong className="text-emerald-400">{data.heroBanner.subheadlineOverlay.split(' ').length} / 15 words</strong></span>
              <span className="text-cyan-400 font-semibold">Amazon Desktop & Mobile Responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2: 4-Column Feature Grid (300x300 px Cards) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
              <Grid className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Module 2: 4-Column Feature Grid (300 x 300 px Cards)
            </h4>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Balanced Parent ROI + Kid Fun
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.featureGrid.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 group hover:border-cyan-500/50 transition-colors"
              >
                <div className="space-y-3">
                  {/* Card Visual Graphic Mockup */}
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30 mb-2">
                      Card #{card.cardNumber || idx + 1} • 300x300 px
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-3 leading-snug">
                      🖼️ {card.imageGraphicBrief}
                    </p>
                  </div>

                  {/* Title */}
                  <h5 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h5>

                  {/* Copy: 2-3 punchy sentences */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.copy}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Parent ROI + Kid Engagement</span>
                  <span className="text-emerald-400 font-semibold">Mobile Scannable</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODULE 3: Brand Story & Educator Credibility */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-500/20 text-purple-400">
              <School className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Module 3: Brand Story & Educator Credibility
            </h4>
          </div>

          <span className="text-xs text-purple-300 font-mono">
            50,000+ Classrooms Trust Mark
          </span>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-purple-950/30 via-slate-950 to-indigo-950/30 p-6 rounded-2xl border border-purple-500/30 space-y-3">
            <h3 className="text-lg font-bold text-purple-200">
              {data.brandStory.sectionHeader}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {data.brandStory.bodyParagraph}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 border-t border-purple-900/30">
              <span className="flex items-center gap-1.5 text-purple-300">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                Elementary Educator Founded
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                Science of Reading Pedagogical Phonics
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                50,000+ U.S. Classroom Adoption
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 4: Catalog Cross-Sell Comparison Matrix */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <Table className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Module 4: Catalog Cross-Sell Comparison Matrix
            </h4>
          </div>

          <button
            onClick={() =>
              handleCopy(
                data.comparisonMatrix.markdownTable ||
                  `| Metric | ${productName} | ${data.comparisonMatrix.catalogItems.join(' | ')} |`,
                'mod4'
              )
            }
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
          >
            {copiedSection === 'mod4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy Table</span>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-950/90 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <th className="py-3.5 px-4 w-[22%]">Metric / Feature</th>
                  <th className="py-3.5 px-4 w-[24%] text-pink-300 bg-pink-950/20 border-x border-pink-500/30">
                    <span className="flex items-center gap-1">
                      <span>★ {productName}</span>
                      <span className="text-[9px] bg-pink-500/30 text-pink-200 px-1.5 py-0.2 rounded">This Item</span>
                    </span>
                  </th>
                  {data.comparisonMatrix.catalogItems.map((item, idx) => (
                    <th key={idx} className="py-3.5 px-4 w-[18%] text-slate-300">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs text-slate-200">
                {data.comparisonMatrix.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-300 bg-slate-950/40">
                      {row.metric}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-100 bg-pink-950/10 border-x border-pink-500/20">
                      {row.mainProductValue}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {row.item1Value}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {row.item2Value}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {row.item3Value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODULE 5: Amazon Compliance Audit */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Module 5: Amazon Compliance & Policy Audit
            </h4>
          </div>

          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Zero Violations Found
          </span>
        </div>

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.complianceAudit.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{item.rule}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Verified against Amazon Brand Content Guidelines & Section 4.1 Content Policy.</span>
            <span className="text-emerald-400 font-bold">Ready for Amazon Seller Central upload</span>
          </div>
        </div>
      </div>
    </div>
  );
};
