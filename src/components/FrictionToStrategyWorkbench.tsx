import React, { useState } from 'react';
import { 
  Workflow, 
  Layers, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Wrench, 
  ChevronRight,
  Send,
  Building,
  Target
} from 'lucide-react';
import { FrictionPoint, NoCodeStrategy } from '../types/od';

interface FrictionToStrategyWorkbenchProps {
  frictionPoints: FrictionPoint[];
  strategies: NoCodeStrategy[];
  onSelectStrategy: (strategyId: string) => void;
  onRequestCustomPlaybook: (friction: FrictionPoint) => void;
}

export const FrictionToStrategyWorkbench: React.FC<FrictionToStrategyWorkbenchProps> = ({
  frictionPoints,
  strategies,
  onSelectStrategy,
  onRequestCustomPlaybook
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const archetypes = [
    'all',
    'Archetype A: Information Asymmetry & Silos',
    'Archetype B: Feedback Latency & Recognition Gap',
    'Archetype C: Decision Paralysis & Process Friction',
    'Archetype D: Cross-Functional Misalignment'
  ];

  const filteredFrictions = selectedFilter === 'all'
    ? frictionPoints
    : frictionPoints.filter(f => f.archetype === selectedFilter);

  const getSeverityBadge = (sev: FrictionPoint['severity']) => {
    switch (sev) {
      case 'Critical':
        return <span className="tag tag-high">Critical Friction</span>;
      case 'Elevated':
        return <span className="tag tag-mod">Elevated Friction</span>;
      default:
        return <span className="tag bg-blue-50 text-blue-700 border border-blue-200">Moderate Friction</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Archetype Filters */}
      <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Friction-to-Strategy Operational Workbench
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                Phase 2: Operational Mapping
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Translates systemic organizational friction into actionable no-code architectures without software engineering overhead.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-mono text-slate-700">{frictionPoints.length} Identified Friction Points</span>
            <span>•</span>
            <span className="font-mono text-blue-700 font-bold">{strategies.length} No-Code Levers Ready</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-slate-100">
          {archetypes.map((arch) => (
            <button
              key={arch}
              onClick={() => setSelectedFilter(arch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === arch
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {arch === 'all' ? 'All Archetypes' : arch.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Friction Point Cards */}
      <div className="space-y-4">
        {filteredFrictions.map((friction) => {
          const strategy = strategies.find(s => s.id === friction.strategyId || s.frictionPointId === friction.id) || strategies[0];

          return (
            <div 
              key={friction.id}
              className="stat-card p-6 shadow-sm border border-slate-200 hover:border-slate-300 rounded-lg bg-white transition-all space-y-5"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono font-semibold border border-slate-200">
                      {friction.archetype}
                    </span>
                    {getSeverityBadge(friction.severity)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display mt-1">
                    {friction.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Affected Units:</span>
                  <div className="flex flex-wrap gap-1">
                    {friction.affectedDepartments.map((dept, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2-Column Root Cause & Strategy Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: OD Diagnostic Root Cause */}
                <div className="lg:col-span-5 space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700">
                      Workforce Friction & Root Cause
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1">
                      {friction.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      OD Behavioral Science Context
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {friction.odContext}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>McKinsey: <strong className="text-slate-900 font-semibold">{friction.frameworkAttribution.mckinsey}</strong></span>
                    <span>Burke-Litwin: <strong className="text-slate-900 font-semibold">{friction.frameworkAttribution.burkeLitwin}</strong></span>
                  </div>
                </div>

                {/* Right: Actionable No-Code Strategy Lever (High-Contrast Navy Card) */}
                {strategy && (
                  <div className="lg:col-span-7 space-y-4 bg-slate-900 text-white p-5 rounded-lg border-0 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-blue-400" />
                          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider font-display">
                            No-Code Operational Strategy Lever
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 font-mono font-bold">
                          {strategy.implementationComplexity}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white font-display">
                        {strategy.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                        {strategy.summary}
                      </p>

                      {/* Tool Stack Badges */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {strategy.targetTools.map((t, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-200 border border-slate-700"
                          >
                            <strong className="text-blue-300 font-semibold">{t.name}</strong> • {t.role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact & CTA */}
                    <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                        <span>{strategy.estimatedImpact}</span>
                      </div>

                      <button
                        onClick={() => onSelectStrategy(strategy.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
                      >
                        Inspect Workflow Blueprint
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
