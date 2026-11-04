import React, { useState } from 'react';
import { CampaignData, ProductInput, AmazonAplusData } from '../types/creative';
import {
  generateMarkdownReport,
  generateCsvExport,
  generateAmazonAplusMarkdown,
  generateAmazonCsvExport,
  downloadFile,
} from '../utils/export';
import { X, FileText, Table, Copy, Check, Download, Printer, ShoppingBag } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignData;
  product: ProductInput;
  aplusData: AmazonAplusData;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  campaign,
  product,
  aplusData,
}) => {
  const [copiedType, setCopiedType] = useState<'md' | 'csv' | null>(null);
  const isMode2 = product.mode === 'mode_2';

  if (!isOpen) return null;

  const markdownText = isMode2
    ? generateAmazonAplusMarkdown(aplusData, product)
    : generateMarkdownReport(campaign, product);

  const csvText = isMode2
    ? generateAmazonCsvExport(aplusData, product)
    : generateCsvExport(campaign, product);

  const handleCopy = (text: string, type: 'md' | 'csv') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadMd = () => {
    const prefix = isMode2 ? 'The-Fidget-Game-Amazon-Aplus' : 'The-Fidget-Game-Campaign';
    const filename = `${prefix}-${product.productName.replace(/[^a-zA-Z0-9]/g, '-')}.md`;
    downloadFile(markdownText, filename, 'text/markdown');
  };

  const handleDownloadCsv = () => {
    const prefix = isMode2 ? 'The-Fidget-Game-Amazon-Aplus' : 'The-Fidget-Game-Batch-Creative';
    const filename = `${prefix}-${product.productName.replace(/[^a-zA-Z0-9]/g, '-')}.csv`;
    downloadFile(csvText, filename, 'text/csv');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-slate-950 ${
              isMode2 ? 'bg-gradient-to-tr from-amber-400 to-yellow-300' : 'bg-gradient-to-tr from-pink-500 to-amber-400'
            }`}>
              {isMode2 ? <ShoppingBag className="w-5 h-5 font-bold" /> : <Download className="w-5 h-5 font-bold" />}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">
                {isMode2 ? 'Amazon A+ Content Export Suite' : 'Direct-Response Campaign Export Suite'}
              </h3>
              <p className="text-xs text-slate-400">
                {isMode2
                  ? 'Ready for Amazon Seller Central / Brand Registry upload'
                  : 'Export to Notion, Google Docs, Meta Ads Manager, or TikTok briefs'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Stats Summary */}
          {!isMode2 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Creative Angles</p>
                <p className="text-lg font-black text-pink-400">{campaign.creativeMatrix.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Script Rows</p>
                <p className="text-lg font-black text-cyan-400">{campaign.creativeMatrix[0]?.script?.length || 4}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Batch Hooks</p>
                <p className="text-lg font-black text-amber-400">{campaign.batchHooks.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Visual Prompts</p>
                <p className="text-lg font-black text-emerald-400">{campaign.imagePrompts.length}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Hero Banner</p>
                <p className="text-lg font-black text-amber-400">970 x 600</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Feature Cards</p>
                <p className="text-lg font-black text-cyan-400">{aplusData.featureGrid.length} Cards</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Cross-Sell Items</p>
                <p className="text-lg font-black text-purple-400">{aplusData.comparisonMatrix.catalogItems.length} Products</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Policy Audit</p>
                <p className="text-lg font-black text-emerald-400">100% Passed</p>
              </div>
            </div>
          )}

          {/* Export Options Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Notion / Markdown */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`p-2 rounded-xl border ${isMode2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-pink-500/20 text-pink-400 border-pink-500/30'}`}>
                    <FileText className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">
                      {isMode2 ? 'Amazon A+ Markdown Document' : 'Notion & Markdown Document'}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {isMode2 ? 'Formatted with all 5 A+ Modules' : 'Complete brief with 4-column script table'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isMode2
                    ? 'Structured with exact modules, character/word limits, and comparison table syntax.'
                    : 'Formatted with clean headers, bullet points, and markdown tables ready to paste directly into Notion or Docs.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleCopy(markdownText, 'md')}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedType === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'md' ? 'Copied!' : 'Copy Markdown'}</span>
                </button>
                <button
                  onClick={handleDownloadMd}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors ${
                    isMode2 ? 'bg-amber-600 hover:bg-amber-500' : 'bg-pink-600 hover:bg-pink-500'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            {/* CSV Format */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Table className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">
                      {isMode2 ? 'Amazon Seller Central CSV' : 'Meta & TikTok Ads CSV'}
                    </h4>
                    <p className="text-[11px] text-slate-400">Structured rows for media buyers & ops</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isMode2
                    ? 'Clean table mapping out image specs, headline text, copy blocks, and cross-sell rows.'
                    : 'Organized data file for media buyers, creative strategists, and agencies uploading creative variations.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleCopy(csvText, 'csv')}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedType === 'csv' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'csv' ? 'Copied!' : 'Copy CSV'}</span>
                </button>
                <button
                  onClick={handleDownloadCsv}
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .csv</span>
                </button>
              </div>
            </div>
          </div>

          {/* Raw Text Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-[11px]">Preview Export Text:</span>
              <span className="font-mono text-[10px] text-slate-500">{markdownText.length} characters</span>
            </div>
            <textarea
              readOnly
              rows={8}
              value={markdownText}
              className="w-full p-3.5 bg-slate-950 font-mono text-[11px] text-slate-300 rounded-2xl border border-slate-800 resize-none focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print View / PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
