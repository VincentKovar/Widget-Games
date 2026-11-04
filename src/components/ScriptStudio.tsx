import React, { useState } from 'react';
import { CreativeMatrixAngle, ScriptRow } from '../types/creative';
import { speakVoiceover, stopVoiceover } from '../utils/audio';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Smartphone,
  PlayCircle,
  Eye,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

interface ScriptStudioProps {
  angles: CreativeMatrixAngle[];
  selectedAngleId: string;
  onSelectAngle: (angleId: string) => void;
  onUpdateScriptRow: (angleId: string, rowIndex: number, field: keyof ScriptRow, value: string) => void;
  onOpenSimulator: () => void;
  onOpenTeleprompter: () => void;
}

export const ScriptStudio: React.FC<ScriptStudioProps> = ({
  angles,
  selectedAngleId,
  onSelectAngle,
  onUpdateScriptRow,
  onOpenSimulator,
  onOpenTeleprompter,
}) => {
  const [playingRowIndex, setPlayingRowIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const activeAngle = angles.find((a) => a.angleId === selectedAngleId) || angles[0];
  const scriptRows = activeAngle?.script || [];

  const handlePlayVo = (text: string, rowIndex: number) => {
    if (playingRowIndex === rowIndex) {
      stopVoiceover();
      setPlayingRowIndex(null);
      return;
    }

    setPlayingRowIndex(rowIndex);
    speakVoiceover(text, () => {
      setPlayingRowIndex(null);
    });
  };

  const handleCopyMarkdown = () => {
    let md = `### ${activeAngle.angleName} — Short-Form Video Script\n\n`;
    md += `| Timecode | Visual / On-Screen Action | Audio / Voiceover (VO) | On-Screen Text (Overlay) |\n`;
    md += `|---|---|---|---|\n`;
    scriptRows.forEach((row) => {
      md += `| ${row.timecode} | ${row.visualAction.replace(/\|/g, '\\|')} | ${row.audioVo.replace(/\|/g, '\\|')} | ${row.textOverlay.replace(/\|/g, '\\|')} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTimecodeStage = (timecode: string) => {
    if (timecode.includes('0:00') || timecode.includes('0:03')) return { label: 'Hook & Thumbstop', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
    if (timecode.includes('0:08')) return { label: 'Problem & Agitate', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    if (timecode.includes('0:18')) return { label: 'Multisensory Demo', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
    return { label: 'Proof & CTA', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">
              2. Meta & TikTok Short-Form Video Script
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono font-bold">
              4-Column Matrix
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engineered for 9:16 vertical video with sound-on voiceover and sound-off high-contrast overlay text
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenTeleprompter}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Teleprompter</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>UGC Phone Simulator</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied Table!' : 'Copy Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Angle Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
          Select Angle:
        </span>
        {angles.map((angle) => {
          const isSelected = angle.angleId === activeAngle.angleId;
          return (
            <button
              key={angle.angleId}
              onClick={() => onSelectAngle(angle.angleId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{angle.angleName.split(':')[0]}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>
          );
        })}
      </div>

      {/* Script Meta Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              {activeAngle.angleName}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400 font-medium">{activeAngle.buyerFocus}</span>
          </div>
          <p className="text-xs text-slate-300 italic">
            Big Idea: "{activeAngle.bigIdea}"
          </p>
        </div>

        <div className="text-[11px] text-slate-400 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/80">
          <span className="text-emerald-400 font-bold">Goal:</span> 3-Sec Hook &gt; 40%, 25s Total Duration, Direct Link Click
        </div>
      </div>

      {/* 4-Column Structured Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="py-3 px-4 w-[16%]">Timecode</th>
                <th className="py-3 px-4 w-[30%]">Visual / On-Screen Action</th>
                <th className="py-3 px-4 w-[30%]">Audio / Voiceover (VO)</th>
                <th className="py-3 px-4 w-[24%]">On-Screen Text (Overlay)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs text-slate-200">
              {scriptRows.map((row, index) => {
                const stage = getTimecodeStage(row.timecode);
                const isPlaying = playingRowIndex === index;

                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Column 1: Timecode & Stage */}
                    <td className="py-4 px-4 align-top space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-100 text-sm bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block shadow-inner">
                          {row.timecode}
                        </span>
                      </div>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stage.color}`}>
                        {stage.label}
                      </span>
                      <div className="text-[10px] text-slate-500">
                        Scene #{index + 1}
                      </div>
                    </td>

                    {/* Column 2: Visual / On-Screen Action */}
                    <td className="py-4 px-4 align-top space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>Director / Camera Staging:</span>
                      </div>
                      <textarea
                        rows={3}
                        value={row.visualAction}
                        onChange={(e) =>
                          onUpdateScriptRow(activeAngle.angleId, index, 'visualAction', e.target.value)
                        }
                        className="w-full p-2 bg-slate-950/50 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800/80 focus:border-cyan-500/60 rounded-xl text-xs text-slate-300 focus:outline-none transition-colors resize-none leading-relaxed"
                      />
                    </td>

                    {/* Column 3: Audio / Voiceover (VO) */}
                    <td className="py-4 px-4 align-top space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Spoken Voiceover (VO):</span>
                        <button
                          type="button"
                          onClick={() => handlePlayVo(row.audioVo, index)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                            isPlaying
                              ? 'bg-pink-500 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                          title="Listen to VO with text-to-speech"
                        >
                          {isPlaying ? (
                            <>
                              <VolumeX className="w-3 h-3 animate-pulse" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-pink-400" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={row.audioVo}
                        onChange={(e) =>
                          onUpdateScriptRow(activeAngle.angleId, index, 'audioVo', e.target.value)
                        }
                        className="w-full p-2 bg-slate-950/50 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800/80 focus:border-pink-500/60 rounded-xl text-xs text-pink-100 font-medium focus:outline-none transition-colors resize-none leading-relaxed"
                      />
                    </td>

                    {/* Column 4: On-Screen Text (Overlay) */}
                    <td className="py-4 px-4 align-top space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>High-Contrast Overlay:</span>
                      </div>
                      <textarea
                        rows={3}
                        value={row.textOverlay}
                        onChange={(e) =>
                          onUpdateScriptRow(activeAngle.angleId, index, 'textOverlay', e.target.value)
                        }
                        className="w-full p-2 bg-slate-950/50 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800/80 focus:border-amber-500/60 rounded-xl text-xs text-amber-200 font-bold focus:outline-none transition-colors resize-none leading-relaxed"
                      />
                      <div className="text-[10px] text-slate-500 italic flex items-center gap-1">
                        <span>📱 Sound-off caption safe zone</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
