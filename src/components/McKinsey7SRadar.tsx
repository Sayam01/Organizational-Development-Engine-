import React, { useState } from 'react';
import { 
  Network, 
  Settings, 
  Users, 
  Sparkles, 
  Target, 
  Briefcase, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { McKinsey7SDiagnostic } from '../types/od';

interface McKinsey7SRadarProps {
  diagnostics: McKinsey7SDiagnostic[];
}

export const McKinsey7SRadar: React.FC<McKinsey7SRadarProps> = ({ diagnostics }) => {
  const [selectedDimension, setSelectedDimension] = useState<McKinsey7SDiagnostic['dimension']>('Systems');

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case 'Structure': return <Network className="h-4 w-4 text-red-600" />;
      case 'Systems': return <Settings className="h-4 w-4 text-blue-600" />;
      case 'Style': return <Users className="h-4 w-4 text-purple-600" />;
      case 'Shared Values': return <Award className="h-4 w-4 text-pink-600" />;
      case 'Staff': return <Users className="h-4 w-4 text-indigo-600" />;
      case 'Skills': return <Sparkles className="h-4 w-4 text-emerald-600" />;
      case 'Strategy': return <Target className="h-4 w-4 text-blue-700" />;
      default: return <Briefcase className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: McKinsey7SDiagnostic['status']) => {
    switch (status) {
      case 'Critical Friction':
        return <span className="tag tag-high">Critical Friction</span>;
      case 'Needs Attention':
        return <span className="tag tag-mod">Needs Attention</span>;
      case 'Stable':
        return <span className="tag bg-blue-50 text-blue-700 border border-blue-200">Stable</span>;
      case 'Healthy':
        return <span className="tag tag-low">Healthy</span>;
    }
  };

  const activeDiag = diagnostics.find(d => d.dimension === selectedDimension) || diagnostics[0];

  return (
    <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              McKinsey 7S Framework Diagnostic
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-full border border-slate-200">
              Structural & Cultural Alignment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates hard elements (Strategy, Structure, Systems) and soft elements (Shared Values, Style, Staff, Skills).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Info className="h-3.5 w-3.5 text-blue-600" />
          <span>Click any 7S node to inspect evidence quotes</span>
        </div>
      </div>

      {/* Grid of 7 Dimensions Interactive Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {diagnostics.map((diag) => {
          const isSelected = diag.dimension === selectedDimension;
          const isHardElement = ['Strategy', 'Structure', 'Systems'].includes(diag.dimension);

          return (
            <button
              key={diag.dimension}
              id={`7s-btn-${diag.dimension.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedDimension(diag.dimension)}
              className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                {getDimensionIcon(diag.dimension)}
                <span className="text-[10px] font-mono font-bold text-slate-700">
                  {diag.healthScore}%
                </span>
              </div>
              
              <div className="font-bold text-xs text-slate-900 font-display truncate">
                {diag.dimension}
              </div>
              
              <div className="text-[10px] text-slate-500 mt-0.5 truncate font-medium">
                {diag.signalsCount} signal{diag.signalsCount === 1 ? '' : 's'}
              </div>

              {/* Hard vs Soft Badge */}
              <div className="mt-2 text-[9px] font-mono font-semibold uppercase text-slate-400">
                {isHardElement ? 'Hard Element' : 'Soft Element'}
              </div>

              {/* Indicator bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5 border border-slate-200">
                <div 
                  className={`h-full rounded-full ${
                    diag.healthScore < 40 ? 'bg-red-500' :
                    diag.healthScore < 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${diag.healthScore}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected 7S Dimension Deep Dive */}
      {activeDiag && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-xs">
                {getDimensionIcon(activeDiag.dimension)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {activeDiag.dimension} Dimension Diagnostic
                  </h3>
                  {getStatusBadge(activeDiag.status)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Health Index: <span className="font-mono text-slate-900 font-bold">{activeDiag.healthScore}/100</span> based on {activeDiag.signalsCount} workforce signals
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Framework Role</span>
              <p className="text-xs font-semibold text-blue-700">
                {['Strategy', 'Structure', 'Systems'].includes(activeDiag.dimension) ? 'Formal Organizational Architecture' : 'Behavioral & Relational Dynamic'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-1">
            
            {/* Summary & Gaps */}
            <div className="lg:col-span-1 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Diagnostic Evaluation
                </span>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  {activeDiag.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Identified Friction Gaps
                </span>
                <ul className="mt-1.5 space-y-1.5">
                  {activeDiag.dominantGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-red-700">
                      <AlertCircle className="h-3.5 w-3.5 text-red-600 mt-0.5 shrink-0" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Evidence Quotes */}
            <div className="lg:col-span-2 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Empirical Evidence Quotes (Human Signals)
              </span>
              <div className="space-y-2">
                {activeDiag.evidenceQuotes.map((quote, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 italic flex items-start gap-2 shadow-xs"
                  >
                    <span className="text-blue-600 font-serif text-lg leading-none select-none">“</span>
                    <span className="leading-relaxed">{quote.replace(/^"|"$/g, '')}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
