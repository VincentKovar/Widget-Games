import React, { useState } from 'react';
import { CampaignData, ProductInput, ScriptRow, AmazonAplusData } from './types/creative';
import {
  DEFAULT_CAMPAIGN_DATA,
  DEFAULT_PRODUCT_INPUT,
  DEFAULT_AMAZON_APLUS_DATA,
} from './data/defaultCampaign';
import { Header } from './components/Header';
import { InputStudio } from './components/InputStudio';
import { CreativeMatrixView } from './components/CreativeMatrixView';
import { ScriptStudio } from './components/ScriptStudio';
import { UgcSimulator } from './components/UgcSimulator';
import { BatchHooksStudio } from './components/BatchHooksStudio';
import { PromptStudio } from './components/PromptStudio';
import { AmazonAplusView } from './components/AmazonAplusView';
import { BrandDualityModal } from './components/BrandDualityModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { ExportModal } from './components/ExportModal';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Flame,
  HelpCircle,
  Layers,
  BookOpen,
  Sliders,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  const [productInput, setProductInput] = useState<ProductInput>(DEFAULT_PRODUCT_INPUT);
  const [campaign, setCampaign] = useState<CampaignData>(DEFAULT_CAMPAIGN_DATA);
  const [aplusData, setAplusData] = useState<AmazonAplusData>(DEFAULT_AMAZON_APLUS_DATA);
  const [selectedAngleId, setSelectedAngleId] = useState<string>('angle-a');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals
  const [isDualityOpen, setIsDualityOpen] = useState(false);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Active view tab (Mode 1): 'matrix' | 'script' | 'simulator' | 'hooks' | 'prompts'
  const [activeView, setActiveView] = useState<'matrix' | 'script' | 'simulator' | 'hooks' | 'prompts'>('matrix');

  const isMode2 = productInput.mode === 'mode_2';
  const activeAngle =
    campaign.creativeMatrix.find((a) => a.angleId === selectedAngleId) || campaign.creativeMatrix[0];

  const handleGenerateCampaign = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productInput),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate campaign creative');
      }

      if (productInput.mode === 'mode_2') {
        setAplusData(result.data);
      } else {
        setCampaign(result.data);
        if (result.data.creativeMatrix && result.data.creativeMatrix.length > 0) {
          setSelectedAngleId(result.data.creativeMatrix[0].angleId);
        }
      }
    } catch (err: any) {
      console.error('Campaign generation failed:', err);
      setErrorMsg(err.message || 'An error occurred while generating creative assets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateScriptRow = (
    angleId: string,
    rowIndex: number,
    field: keyof ScriptRow,
    value: string
  ) => {
    setCampaign((prev) => {
      const nextMatrix = prev.creativeMatrix.map((angle) => {
        if (angle.angleId !== angleId) return angle;
        const nextScript = [...angle.script];
        nextScript[rowIndex] = {
          ...nextScript[rowIndex],
          [field]: value,
        };
        return {
          ...angle,
          script: nextScript,
        };
      });
      return {
        ...prev,
        creativeMatrix: nextMatrix,
      };
    });
  };

  const handleSwapHookIntoScript = (spokenHook: string, textOverlay: string, visualAction: string) => {
    setCampaign((prev) => {
      const nextMatrix = prev.creativeMatrix.map((angle) => {
        if (angle.angleId !== selectedAngleId) return angle;
        const nextScript = [...angle.script];
        if (nextScript[0]) {
          nextScript[0] = {
            ...nextScript[0],
            audioVo: spokenHook,
            textOverlay,
            visualAction,
          };
        }
        return {
          ...angle,
          script: nextScript,
        };
      });
      return {
        ...prev,
        creativeMatrix: nextMatrix,
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white">
      {/* Studio Header */}
      <Header
        mode={productInput.mode}
        setMode={(newMode) => setProductInput((prev) => ({ ...prev, mode: newMode }))}
        onOpenDuality={() => setIsDualityOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onScrollToInputs={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Top Hero Positioning Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-amber-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DTC Educational Toy Growth Architecture</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-100 leading-tight">
              Scaling "The Fidget Game" to{' '}
              <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                $50M+ Through High-Converting Creative
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Harmonizing <strong className="text-cyan-300">The Rational Buyer</strong> (Parents & Teachers seeking Science of Reading & homework peace) with <strong className="text-pink-300">The Emotional Consumer</strong> (Children hooked on tactile bubble popping & squishy toys).
            </p>

            {/* Quick KPI stats */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>Active Mode: <strong className="text-pink-300">{isMode2 ? 'Mode 2 (Amazon A+)' : 'Mode 1 (Ad Creative Engine)'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Compliance: <strong>Zero Restricted Claims</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Audience: <strong>Parents, Teachers & Kids (3–11)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Studio Component */}
        <InputStudio
          input={productInput}
          setInput={setProductInput}
          onGenerate={handleGenerateCampaign}
          isLoading={isLoading}
          onSelectPreset={(preset) => {
            setProductInput(preset);
          }}
        />

        {/* Error notification */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/50 text-red-200 text-sm flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-xs px-3 py-1 rounded-lg bg-red-900/60 hover:bg-red-800 text-white font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Director Executive Strategy Brief (Mode 1) */}
        {!isMode2 && campaign.directorSummary && (
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Director's Scaling Recommendation:
                </p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {campaign.directorSummary.scalingAdvice}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDualityOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-pink-300 border border-pink-500/30 whitespace-nowrap flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Audience Duality Guide</span>
            </button>
          </div>
        )}

        {/* OUTPUT RENDERING BASED ON ACTIVE MODE */}
        {isMode2 ? (
          /* MODE 2: Amazon A+ Content & Marketplace Optimization */
          <section id="aplus-section" className="space-y-8">
            <AmazonAplusView data={aplusData} productName={productInput.productName} />
          </section>
        ) : (
          /* MODE 1: Paid Social & UGC Engine */
          <div className="space-y-12">
            {/* Section 1: Comprehensive Creative Matrix */}
            <section id="matrix-section">
              <CreativeMatrixView
                angles={campaign.creativeMatrix}
                selectedAngleId={selectedAngleId}
                onSelectAngle={(id) => setSelectedAngleId(id)}
                onViewScript={(id) => {
                  setSelectedAngleId(id);
                  setActiveView('script');
                  const el = document.getElementById('script-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onTestInSimulator={(id) => {
                  setSelectedAngleId(id);
                  setActiveView('simulator');
                  const el = document.getElementById('simulator-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </section>

            {/* Section 2: Meta & TikTok Short-Form Video Script */}
            <section id="script-section" className="pt-4">
              <ScriptStudio
                angles={campaign.creativeMatrix}
                selectedAngleId={selectedAngleId}
                onSelectAngle={(id) => setSelectedAngleId(id)}
                onUpdateScriptRow={handleUpdateScriptRow}
                onOpenSimulator={() => {
                  setActiveView('simulator');
                  const el = document.getElementById('simulator-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
              />
            </section>

            {/* Interactive UGC Simulator */}
            <section id="simulator-section" className="pt-4">
              <UgcSimulator
                script={activeAngle?.script || []}
                angleName={activeAngle?.angleName || 'Angle A'}
              />
            </section>

            {/* Section 3: Batch Hook Variations */}
            <section id="hooks-section" className="pt-4">
              <BatchHooksStudio
                hooks={campaign.batchHooks}
                onSwapHookIntoScript={handleSwapHookIntoScript}
              />
            </section>

            {/* Section 4: Asset Specification & Midjourney / Flux Prompts */}
            <section id="prompts-section" className="pt-4">
              <PromptStudio prompts={campaign.imagePrompts} />
            </section>
          </div>
        )}
      </main>

      {/* Modals */}
      <BrandDualityModal
        isOpen={isDualityOpen}
        onClose={() => setIsDualityOpen(false)}
      />

      <TeleprompterModal
        isOpen={isTeleprompterOpen}
        onClose={() => setIsTeleprompterOpen(false)}
        script={activeAngle?.script || []}
        angleName={activeAngle?.angleName || 'Selected Angle'}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        campaign={campaign}
        product={productInput}
        aplusData={aplusData}
      />
    </div>
  );
}
