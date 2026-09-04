import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SentimentOverview } from './components/SentimentOverview';
import { McKinsey7SRadar } from './components/McKinsey7SRadar';
import { BurkeLitwinMap } from './components/BurkeLitwinMap';
import { DominantThemesMatrix } from './components/DominantThemesMatrix';
import { FrictionToStrategyWorkbench } from './components/FrictionToStrategyWorkbench';
import { WorkflowBlueprintVisualizer } from './components/WorkflowBlueprintVisualizer';
import { InterventionSimulator } from './components/InterventionSimulator';
import { RawFeedbackLab } from './components/RawFeedbackLab';
import { FeedbackIngestModal } from './components/FeedbackIngestModal';
import { ExecutiveReportExportModal } from './components/ExecutiveReportExportModal';

import { DATASET_PRESETS, INITIAL_OD_ANALYSIS } from './data/sampleDatasets';
import { ODAnalysisResult, FeedbackItem, FrictionPoint } from './types/od';
import { parseRawFeedback, generateCompleteODAnalysis } from './utils/odEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'friction' | 'blueprint' | 'simulator' | 'signals'>('diagnostics');
  const [currentDatasetId, setCurrentDatasetId] = useState<string>('dataset-tech');
  const [analysis, setAnalysis] = useState<ODAnalysisResult>(INITIAL_OD_ANALYSIS);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(DATASET_PRESETS[0].feedbackItems);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(INITIAL_OD_ANALYSIS.strategies[0]?.id || 'strat-1');
  
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Switch between sample datasets
  const handleSelectDataset = (presetId: string) => {
    setCurrentDatasetId(presetId);
    const preset = DATASET_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setFeedbackItems(preset.feedbackItems);
      const generated = generateCompleteODAnalysis(preset.feedbackItems, preset.name);
      setAnalysis(generated);
      if (generated.strategies.length > 0) {
        setSelectedStrategyId(generated.strategies[0].id);
      }
    }
  };

  // Custom feedback ingestion (API + fallback)
  const handleIngestCustom = async (rawText: string, contextTitle: string, useAi: boolean) => {
    setIsAiProcessing(true);
    setCurrentDatasetId('custom');

    try {
      if (useAi) {
        const response = await fetch('/api/analyze-od', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            feedbackText: rawText,
            context: contextTitle,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.analysis && !data.fallback) {
            const aiAnalysis = data.analysis;
            const parsedSignals = parseRawFeedback(rawText);
            setFeedbackItems(parsedSignals);
            
            // Merge AI generated output with schema defaults
            const fullAnalysis: ODAnalysisResult = {
              ...generateCompleteODAnalysis(parsedSignals, contextTitle),
              executiveSummary: aiAnalysis.executiveSummary || "Systemic diagnostic completed.",
              overallSentimentScore: typeof aiAnalysis.overallSentimentScore === 'number' ? aiAnalysis.overallSentimentScore : -0.55,
              sentimentDistribution: aiAnalysis.sentimentDistribution || {
                positive: 10,
                neutral: 15,
                frustration: 45,
                exhaustion: 20,
                disengagement: 10,
              },
              dominantThemes: aiAnalysis.dominantThemes?.length ? aiAnalysis.dominantThemes : analysis.dominantThemes,
              frictionPoints: aiAnalysis.frictionPoints?.length ? aiAnalysis.frictionPoints : analysis.frictionPoints,
              strategies: aiAnalysis.strategies?.length ? aiAnalysis.strategies : analysis.strategies,
            };

            setAnalysis(fullAnalysis);
            if (fullAnalysis.strategies[0]) {
              setSelectedStrategyId(fullAnalysis.strategies[0].id);
            }
            setIsAiProcessing(false);
            return;
          }
        }
      }

      // Fallback to client-side deterministic analysis engine
      const parsedItems = parseRawFeedback(rawText);
      setFeedbackItems(parsedItems);
      const localAnalysis = generateCompleteODAnalysis(parsedItems, contextTitle);
      setAnalysis(localAnalysis);
      if (localAnalysis.strategies[0]) {
        setSelectedStrategyId(localAnalysis.strategies[0].id);
      }
    } catch (err) {
      console.warn("Using deterministic fallback engine due to error:", err);
      const parsedItems = parseRawFeedback(rawText);
      setFeedbackItems(parsedItems);
      const localAnalysis = generateCompleteODAnalysis(parsedItems, contextTitle);
      setAnalysis(localAnalysis);
      if (localAnalysis.strategies[0]) {
        setSelectedStrategyId(localAnalysis.strategies[0].id);
      }
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleSelectStrategyFromWorkbench = (stratId: string) => {
    setSelectedStrategyId(stratId);
    setActiveTab('blueprint');
  };

  const handleRequestCustomPlaybook = (friction: FrictionPoint) => {
    if (friction.strategyId) {
      setSelectedStrategyId(friction.strategyId);
    }
    setActiveTab('blueprint');
  };

  const currentDatasetName = DATASET_PRESETS.find(p => p.id === currentDatasetId)?.name || "Custom Feedback Ingestion";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans border-t-4 border-blue-600 selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* Top Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDatasetId={currentDatasetId}
        onSelectDataset={handleSelectDataset}
        onOpenIngestModal={() => setIsIngestModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        totalSignals={feedbackItems.length}
        isAiProcessing={isAiProcessing}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* TAB 1: OD Diagnostics & Frameworks */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-8 animate-fade-in">
            <SentimentOverview 
              analysis={analysis} 
              onNavigateToFriction={() => setActiveTab('friction')}
            />

            <McKinsey7SRadar diagnostics={analysis.mckinsey7s} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BurkeLitwinMap diagnostics={analysis.burkeLitwin} />
              <DominantThemesMatrix themes={analysis.dominantThemes} />
            </div>
          </div>
        )}

        {/* TAB 2: Friction Points & Strategy Workbench */}
        {activeTab === 'friction' && (
          <div className="animate-fade-in">
            <FrictionToStrategyWorkbench
              frictionPoints={analysis.frictionPoints}
              strategies={analysis.strategies}
              onSelectStrategy={handleSelectStrategyFromWorkbench}
              onRequestCustomPlaybook={handleRequestCustomPlaybook}
            />
          </div>
        )}

        {/* TAB 3: No-Code Workflow Blueprint Visualizer */}
        {activeTab === 'blueprint' && (
          <div className="animate-fade-in">
            <WorkflowBlueprintVisualizer
              strategies={analysis.strategies}
              selectedStrategyId={selectedStrategyId}
              onSelectStrategyId={setSelectedStrategyId}
            />
          </div>
        )}

        {/* TAB 4: What-If Intervention Simulator */}
        {activeTab === 'simulator' && (
          <div className="animate-fade-in">
            <InterventionSimulator analysis={analysis} />
          </div>
        )}

        {/* TAB 5: Raw Ingested Signal Lab */}
        {activeTab === 'signals' && (
          <div className="animate-fade-in">
            <RawFeedbackLab
              feedbackItems={feedbackItems}
              onOpenIngestModal={() => setIsIngestModalOpen(true)}
            />
          </div>
        )}

      </main>

      {/* Ingestion Wizard Modal */}
      <FeedbackIngestModal
        isOpen={isIngestModalOpen}
        onClose={() => setIsIngestModalOpen(false)}
        onIngestCustom={handleIngestCustom}
        onSelectPreset={handleSelectDataset}
        isProcessing={isAiProcessing}
      />

      {/* Executive Brief Export Modal */}
      <ExecutiveReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        analysis={analysis}
        datasetName={currentDatasetName}
      />

      {/* Global Footer */}
      <footer id="app-footer" className="border-t border-slate-200 bg-white mt-16 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Branding & Mission */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold shadow-xs shrink-0">
                <span className="text-sm font-serif">Ω</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 font-display">
                  Organizational Development Intelligence Engine
                </p>
                <p className="text-[11px] text-slate-500">
                  Translating workforce sentiment into structural OD frameworks & actionable no-code architectures.
                </p>
              </div>
            </div>

            {/* Attribution Credits */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <span className="text-slate-500 font-medium">Developed & Designed</span>
                <a
                  href="https://github.com/sayamray"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  Sayam Ray
                </a>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <span className="text-slate-500 font-medium">Thought framework</span>
                <a
                  href="https://github.com/saikatchakrabarti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                >
                  Saikat Chakrabarti
                </a>
              </div>
            </div>

          </div>

          {/* Sub-bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>McKinsey 7S Framework • Burke-Litwin Causal Model • LDA Semantic Clustering • No-Code Levers</span>
            <span>Enterprise Organizational Development & Operational Intelligence</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
