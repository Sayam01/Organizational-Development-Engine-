import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  FileText, 
  Layers, 
  Check, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { DATASET_PRESETS } from '../data/sampleDatasets';

interface FeedbackIngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngestCustom: (rawText: string, contextTitle: string, useAi: boolean) => Promise<void>;
  onSelectPreset: (presetId: string) => void;
  isProcessing: boolean;
}

export const FeedbackIngestModal: React.FC<FeedbackIngestModalProps> = ({
  isOpen,
  onClose,
  onIngestCustom,
  onSelectPreset,
  isProcessing
}) => {
  const [ingestMode, setIngestMode] = useState<'presets' | 'paste' | 'upload'>('paste');
  const [customText, setCustomText] = useState('');
  const [contextTitle, setContextTitle] = useState('Custom Organizational Feedback Intake');
  const [useAiAnalysis, setUseAiAnalysis] = useState(true);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCustomText(content);
      setContextTitle(`Uploaded: ${file.name}`);
      setIngestMode('paste');
    };
    reader.readAsText(file);
  };

  const handleIngestSubmit = async () => {
    if (!customText.trim()) return;
    await onIngestCustom(customText, contextTitle, useAiAnalysis);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Sparkles className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-display">
                Ingest Unstructured Feedback Signals
              </h3>
              <p className="text-xs text-slate-500">
                Phase 1: Ingestion, LDA Theme Extraction & Valence Scoring
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Ingest Mode Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-3 gap-2">
          <button
            onClick={() => setIngestMode('paste')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              ingestMode === 'paste'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Paste Raw Text / Quotes
          </button>
          <button
            onClick={() => setIngestMode('presets')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              ingestMode === 'presets'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Curated Industry Presets
          </button>
          <button
            onClick={() => setIngestMode('upload')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
              ingestMode === 'upload'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Upload File (.txt, .csv, .json)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
          
          {ingestMode === 'paste' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Context / Organization Dataset Name
                </label>
                <input
                  type="text"
                  value={contextTitle}
                  onChange={(e) => setContextTitle(e.target.value)}
                  placeholder="e.g. Q3 Engineering & Product Survey"
                  className="w-full bg-white text-slate-900 text-xs py-2 px-3 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Unstructured Employee Feedback (One feedback item per line or quote)
                </label>
                <textarea
                  rows={8}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={`Paste employee quotes, survey responses, or Slack messages here. E.g.:\n"I never know who is responsible for the checkout decisions..."\n"We use three different tools for the same project..."\n"My manager only talks to me during yearly reviews..."`}
                  className="w-full bg-white text-slate-900 text-xs p-3 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600 font-mono leading-relaxed"
                />
              </div>

              {/* AI Option Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 border border-blue-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Deep AI Sentiment & Playbook Generation
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Uses Gemini 3.7 Flash server-side with deterministic fallback.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useAiAnalysis}
                  onChange={(e) => setUseAiAnalysis(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {ingestMode === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Select a pre-built realistic organizational dataset to immediately test OD frameworks and no-code strategy generation:
              </p>

              <div className="space-y-2.5">
                {DATASET_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset.id);
                      onClose();
                    }}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 font-display">
                        {preset.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-blue-700 border border-slate-200 font-bold">
                        {preset.headcount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {preset.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-blue-700 pt-1 font-semibold">
                      <span>{preset.feedbackItems.length} curated human signals</span>
                      <span>•</span>
                      <span>{preset.industry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ingestMode === 'upload' && (
            <div className="space-y-4 text-center py-6">
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-8 transition-colors bg-slate-50">
                <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">
                  Drop your feedback export file here
                </p>
                <p className="text-[11px] text-slate-500 mt-1 mb-4 font-medium">
                  Supports .txt, .csv, and .json files
                </p>
                <label className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all shadow-xs">
                  Browse Files
                  <input
                    type="file"
                    accept=".txt,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        {ingestMode === 'paste' && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              onClick={handleIngestSubmit}
              disabled={isProcessing || !customText.trim()}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Clock className="h-3.5 w-3.5 animate-spin" />
                  Running OD Intelligence Extraction...
                </>
              ) : (
                <>
                  Analyze Human Signals
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
