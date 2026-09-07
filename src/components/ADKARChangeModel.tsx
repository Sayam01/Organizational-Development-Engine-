import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  Zap, 
  Clock, 
  Lightbulb, 
  TrendingUp, 
  Info,
  ChevronRight,
  BookOpen,
  Users,
  Target,
  Wrench,
  Award
} from 'lucide-react';
import { ADKARDiagnostic, ADKARStage, FeedbackItem } from '../types/od';

interface ADKARChangeModelProps {
  diagnostics: ADKARDiagnostic[];
  rawFeedback?: FeedbackItem[];
  overallReadiness?: number;
  barrierPoint?: ADKARStage;
}

export const ADKARChangeModel: React.FC<ADKARChangeModelProps> = ({
  diagnostics,
  rawFeedback = [],
  overallReadiness = 52,
  barrierPoint = 'Awareness'
}) => {
  // Default selected stage to barrier point if available, or first stage
  const [selectedStage, setSelectedStage] = useState<ADKARStage>(barrierPoint || 'Awareness');
  const [simulationIntensity, setSimulationIntensity] = useState<number>(50);
  const [showFrameworkTriangulation, setShowFrameworkTriangulation] = useState<boolean>(false);

  const activeDiag = diagnostics.find(d => d.stage === selectedStage) || diagnostics[0];

  const getStageColor = (stage: ADKARStage) => {
    switch (stage) {
      case 'Awareness': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', active: 'bg-blue-600 text-white' };
      case 'Desire': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', active: 'bg-amber-600 text-white' };
      case 'Knowledge': return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', active: 'bg-indigo-600 text-white' };
      case 'Ability': return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', active: 'bg-rose-600 text-white' };
      case 'Reinforcement': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', active: 'bg-emerald-600 text-white' };
    }
  };

  const getStatusBadge = (status: ADKARDiagnostic['status']) => {
    switch (status) {
      case 'Critical Barrier':
        return <span className="tag tag-high">Critical Barrier</span>;
      case 'Friction Gap':
        return <span className="tag tag-mod">Friction Gap</span>;
      case 'Progressing':
        return <span className="tag bg-blue-50 text-blue-700 border border-blue-200">Progressing</span>;
      case 'Empowered':
        return <span className="tag tag-low">Empowered</span>;
    }
  };

  // Quotes tagged to active stage
  const matchingQuotes = rawFeedback
    .filter(f => f.odFrameworkMapping?.adkar === selectedStage)
    .slice(0, 3);

  // Simulated lift calculation
  const baseScore = activeDiag ? activeDiag.score : 50;
  const simulatedLift = Math.round((100 - baseScore) * (simulationIntensity / 100) * 0.75);
  const projectedScore = Math.min(100, baseScore + simulatedLift);
  const projectedOverallReadiness = Math.min(95, overallReadiness + Math.round(simulatedLift / 5));

  return (
    <div id="adkar-framework-card" className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-6">
      
      {/* Top Header & Executive Summary Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Prosci ADKAR® Change Management Diagnostic
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 font-medium rounded-full border border-blue-200">
              Individual & Systemic Adoption Pipeline
            </span>
            <span className="text-xs px-2.5 py-0.5 bg-amber-50 text-amber-800 font-semibold rounded-full border border-amber-200 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-600" />
              Barrier Point: {barrierPoint}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            ADKAR tracks individual transformation through five cumulative stages. According to change science, 
            downstream capabilities cannot be activated until earlier barrier points are resolved.
          </p>
        </div>

        {/* Readiness Index Stat Pill */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 self-start lg:self-center shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Adoption Velocity
            </span>
            <span className="text-lg font-bold text-slate-900 font-display">
              {overallReadiness}% <span className="text-xs font-normal text-slate-500 font-sans">Readiness Index</span>
            </span>
          </div>
          <div className="h-9 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Stage Sequencing
            </span>
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Blocked at {barrierPoint}
            </span>
          </div>
        </div>
      </div>

      {/* 5-Stage Sequential Pipeline Visualizer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-blue-600" />
            Cumulative Change Flow (Left-to-Right Progression)
          </span>
          <span className="text-[11px]">Select any stage to inspect gaps & playbooks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {diagnostics.map((diag, index) => {
            const isSelected = diag.stage === selectedStage;
            const isCurrentBarrier = diag.isBarrierPoint || diag.stage === barrierPoint;
            const colors = getStageColor(diag.stage);

            return (
              <button
                key={diag.stage}
                id={`adkar-stage-${diag.stage.toLowerCase()}`}
                onClick={() => setSelectedStage(diag.stage)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/30 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {/* Top Badge & Letter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono shadow-xs ${
                      isSelected ? colors.active : `${colors.bg} ${colors.text} border ${colors.border}`
                    }`}>
                      {diag.stage[0]}
                    </span>

                    {isCurrentBarrier && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="h-2.5 w-2.5 text-amber-600" />
                        Barrier
                      </span>
                    )}

                    {!isCurrentBarrier && (
                      <span className="text-[11px] font-mono font-bold text-slate-600">
                        {diag.score}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-slate-900 font-display">
                      {diag.stage}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Stage {index + 1})
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {diag.fullName}
                  </p>
                </div>

                {/* Score Progress Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>Readiness</span>
                    <span className="font-semibold text-slate-700">{diag.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        diag.score < 50 ? 'bg-red-500' : diag.score < 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${diag.score}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {getStatusBadge(diag.status)}
                    <span className="text-[10px] text-slate-400">{diag.signalsCount} signals</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep Diagnostic Inspector */}
      {activeDiag && (
        <div className="border border-slate-200 rounded-xl bg-slate-50/60 p-5 space-y-6">
          
          {/* Active Stage Sub-Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Stage Diagnostic:
                </span>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {activeDiag.stage} — {activeDiag.fullName}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {activeDiag.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-slate-500 font-medium">Dimension:</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-md border border-slate-200 text-slate-700">
                {activeDiag.readinessDimension} Readiness
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-md border border-blue-200">
                Score: {activeDiag.score}/100
              </span>
            </div>
          </div>

          {/* 2-Column Inspector: Root Cause Frictions & No-Code Intervention Playbook */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Gaps & Workforce Evidence */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Friction Gaps */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Workforce Voice & Friction Symptoms</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {activeDiag.workforceVoiceGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real Evidence Quotes */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
                    Extracted Signal Evidence
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {matchingQuotes.length > 0 ? `${matchingQuotes.length} quotes` : 'Sample quotes'}
                  </span>
                </div>

                {matchingQuotes.length > 0 ? (
                  <div className="space-y-2.5">
                    {matchingQuotes.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded border border-slate-100 text-xs">
                        <p className="text-slate-700 italic">"{item.text}"</p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{item.department}</span>
                          <span className="font-mono text-red-600 font-semibold">
                            Valence: {item.sentimentValence}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeDiag.evidenceQuotes.slice(0, 2).map((quote, idx) => (
                      <p key={idx} className="text-xs italic text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                        {quote}
                      </p>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Prescribed OD & No-Code Intervention Playbook */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider font-display">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <span>Prescribed Operational OD Playbook</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200 flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    {activeDiag.suggestedNoCodeTool}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeDiag.prescribedTactics.map((tactic, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed">
                        {tactic}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Barrier-Breaker Simulation Slider */}
                <div className="mt-4 pt-4 border-t border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 rounded-lg border border-blue-100/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900 font-display flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Simulate ADKAR Barrier-Breaker Intervention
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Adjust intervention rollout intensity to evaluate projected adoption lift:
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white rounded border border-slate-200 text-blue-700 self-start sm:self-auto">
                      {simulationIntensity}% Rollout
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={simulationIntensity}
                    onChange={(e) => setSimulationIntensity(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />

                  {/* Reactive Projected Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div className="bg-white p-2 rounded border border-blue-100 shadow-2xs">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Stage Score</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {baseScore}% ➔ <strong className="text-emerald-600">{projectedScore}%</strong>
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded border border-blue-100 shadow-2xs">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">System Readiness</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {overallReadiness}% ➔ <strong className="text-emerald-600">{projectedOverallReadiness}%</strong>
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded border border-blue-100 shadow-2xs">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Adoption Velocity</span>
                      <span className="text-xs font-bold text-blue-700 flex items-center justify-center gap-0.5">
                        <TrendingUp className="h-3 w-3" />
                        +{Math.round(simulatedLift * 0.8)}% Drag Cut
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Cross-Framework Triangulation Accordion */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => setShowFrameworkTriangulation(!showFrameworkTriangulation)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            OD Framework Triangulation: How ADKAR aligns with McKinsey 7S & Burke-Litwin
          </span>
          <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${showFrameworkTriangulation ? 'rotate-90' : ''}`} />
        </button>

        {showFrameworkTriangulation && (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-3 animate-fade-in">
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Effective organizational transformation requires coordinating structural design (McKinsey 7S), 
              causal organizational climate (Burke-Litwin), and individual psychological readiness (Prosci ADKAR):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-[11px]">
              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="font-bold text-blue-700 block">1. Awareness</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">7S: Strategy</span>
                <span className="text-slate-500 text-[10px] block">Burke: Mission & Vision</span>
                <span className="text-slate-700 mt-1 block font-medium">Why the status quo must break</span>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="font-bold text-amber-700 block">2. Desire</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">7S: Shared Values</span>
                <span className="text-slate-500 text-[10px] block">Burke: Culture & Motivation</span>
                <span className="text-slate-700 mt-1 block font-medium">Personal buy-in & WIIFM</span>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="font-bold text-indigo-700 block">3. Knowledge</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">7S: Skills</span>
                <span className="text-slate-500 text-[10px] block">Burke: Individual Needs</span>
                <span className="text-slate-700 mt-1 block font-medium">SOPs, documentation, training</span>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="font-bold text-rose-700 block">4. Ability</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">7S: Systems & Structure</span>
                <span className="text-slate-500 text-[10px] block">Burke: Systems & Practices</span>
                <span className="text-slate-700 mt-1 block font-medium">Automations removing manual toil</span>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="font-bold text-emerald-700 block">5. Reinforcement</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">7S: Style & Values</span>
                <span className="text-slate-500 text-[10px] block">Burke: Work Unit Climate</span>
                <span className="text-slate-700 mt-1 block font-medium">Kudos bots & KPI celebrations</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
