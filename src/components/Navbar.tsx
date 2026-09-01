import React from 'react';
import { 
  Layers, 
  Activity, 
  Workflow, 
  SlidersHorizontal, 
  Database, 
  Download, 
  PlusCircle, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { DATASET_PRESETS } from '../data/sampleDatasets';

interface NavbarProps {
  activeTab: 'diagnostics' | 'friction' | 'blueprint' | 'simulator' | 'signals';
  setActiveTab: (tab: 'diagnostics' | 'friction' | 'blueprint' | 'simulator' | 'signals') => void;
  currentDatasetId: string;
  onSelectDataset: (presetId: string) => void;
  onOpenIngestModal: () => void;
  onOpenExportModal: () => void;
  totalSignals: number;
  isAiProcessing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentDatasetId,
  onSelectDataset,
  onOpenIngestModal,
  onOpenExportModal,
  totalSignals,
  isAiProcessing
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-xs">
              <span className="text-base font-serif">Ω</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 font-display">
                  OD Intelligence
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <Sparkles className="h-2.5 w-2.5 text-blue-600" />
                  Gemini 3.7
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Workforce Sentiment • 7S & Burke-Litwin • No-Code Levers
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
            <button
              id="tab-btn-diagnostics"
              onClick={() => setActiveTab('diagnostics')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'diagnostics'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              Executive View
            </button>

            <button
              id="tab-btn-friction"
              onClick={() => setActiveTab('friction')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'friction'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
              }`}
            >
              <Workflow className="h-3.5 w-3.5" />
              Friction Mapping
            </button>

            <button
              id="tab-btn-blueprint"
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              Operational Levers
            </button>

            <button
              id="tab-btn-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'simulator'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              What-If Simulator
            </button>

            <button
              id="tab-btn-signals"
              onClick={() => setActiveTab('signals')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${
                activeTab === 'signals'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              Signals ({totalSignals})
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Dataset Dropdown */}
            <div className="relative group hidden lg:block">
              <select
                id="dataset-preset-select"
                value={currentDatasetId}
                onChange={(e) => onSelectDataset(e.target.value)}
                className="appearance-none bg-white text-slate-700 text-xs font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
              >
                {DATASET_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name.split('(')[0]}
                  </option>
                ))}
                <option value="custom">Custom Feedback Ingestion</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Ingest Feedback CTA */}
            <button
              id="btn-ingest-feedback"
              onClick={onOpenIngestModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5 text-blue-600" />
              <span className="hidden sm:inline">Ingest Signals</span>
              <span className="sm:hidden">Ingest</span>
            </button>

            {/* Export Report CTA */}
            <button
              id="btn-export-report"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-300" />
              <span className="hidden sm:inline">Generate Playbook</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Strip */}
        <div className="flex md:hidden items-center justify-between gap-1 py-2 overflow-x-auto border-t border-slate-200">
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'diagnostics' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Executive View
          </button>
          <button
            onClick={() => setActiveTab('friction')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'friction' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Friction
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'blueprint' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Levers
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Simulator
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'signals' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Signals ({totalSignals})
          </button>
        </div>

      </div>
    </header>
  );
};
