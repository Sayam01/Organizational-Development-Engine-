import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  TrendingUp, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Users, 
  ShieldAlert, 
  RotateCcw,
  ArrowRight,
  Target
} from 'lucide-react';
import { ODAnalysisResult } from '../types/od';
import { simulateInterventions } from '../utils/odEngine';

interface InterventionSimulatorProps {
  analysis: ODAnalysisResult;
}

export const InterventionSimulator: React.FC<InterventionSimulatorProps> = ({ analysis }) => {
  const [interventions, setInterventions] = useState([
    {
      id: 'strat-1',
      name: 'Single Source of Truth (SSoT) Intake & Sync Engine',
      toolStack: 'Tally + Airtable + Make + Slack',
      archetype: 'Information Asymmetry & Silos',
      active: true,
      intensityPercent: 85
    },
    {
      id: 'strat-2',
      name: 'Continuous Real-Time Recognition & Kudos Loop',
      toolStack: 'Slack + Make + Looker Studio',
      archetype: 'Feedback Latency & Recognition Gap',
      active: true,
      intensityPercent: 80
    },
    {
      id: 'strat-3',
      name: 'Automated Human-in-the-Loop Approval & Nudge Bot',
      toolStack: 'Monday.com + Jotform + Slack Bot',
      archetype: 'Decision Paralysis & Process Friction',
      active: false,
      intensityPercent: 70
    },
    {
      id: 'strat-4',
      name: 'Sales-to-Product Strategic Intake & Feasibility Gate',
      toolStack: 'Coda + Notion + Zapier + Slack',
      archetype: 'Cross-Functional Roadmapping Intake',
      active: false,
      intensityPercent: 60
    }
  ]);

  const toggleIntervention = (id: string) => {
    setInterventions(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  const updateIntensity = (id: string, intensity: number) => {
    setInterventions(prev => prev.map(item => 
      item.id === id ? { ...item, intensityPercent: intensity } : item
    ));
  };

  const resetAll = () => {
    setInterventions(prev => prev.map(item => ({ ...item, active: false, intensityPercent: 75 })));
  };

  const enableAll = () => {
    setInterventions(prev => prev.map(item => ({ ...item, active: true, intensityPercent: 90 })));
  };

  const simulation = useMemo(() => {
    return simulateInterventions(analysis, interventions);
  }, [analysis, interventions]);

  const valenceDiff = Math.round((simulation.projectedSentimentValence - simulation.baselineSentimentValence) * 100) / 100;

  return (
    <div className="space-y-6">
      
      {/* Simulator Header */}
      <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                OD "What-If" Intervention & Causal Impact Simulator
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                Phase 3: Impact Modeling
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Simulate organizational sentiment valence shifts and operational latency reductions by activating specific No-Code levers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={enableAll}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold transition-all shadow-xs"
            >
              Activate All Levers
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-all shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Left Controls, Right Projected Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Lever Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Configurable Operational Levers ({interventions.filter(i => i.active).length} Active)</span>
            <span>Adoption Intensity</span>
          </div>

          <div className="space-y-3">
            {interventions.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-lg border transition-all ${
                  item.active
                    ? 'bg-blue-50/40 border-blue-300 shadow-xs'
                    : 'bg-white border-slate-200 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={`check-${item.id}`}
                      checked={item.active}
                      onChange={() => toggleIntervention(item.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <label 
                        htmlFor={`check-${item.id}`} 
                        className="text-xs font-bold text-slate-900 font-display cursor-pointer hover:text-blue-700"
                      >
                        {item.name}
                      </label>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.archetype} • <span className="font-mono text-blue-700 font-semibold">{item.toolStack}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-semibold text-slate-700">
                    {item.active ? `${item.intensityPercent}% Rollout` : 'Disabled'}
                  </span>
                </div>

                {item.active && (
                  <div className="mt-3 pt-3 border-t border-blue-100 flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 font-medium shrink-0">Intensity:</span>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={item.intensityPercent}
                      onChange={(e) => updateIntensity(item.id, parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-blue-700 font-bold w-10 text-right">
                      {item.intensityPercent}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Projected Real-Time Impact Analytics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Projected Organizational Outcomes
          </div>

          <div className="stat-card p-5 border border-slate-200 rounded-lg space-y-5 shadow-sm bg-white">
            
            {/* Valence Shift Comparison Bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span className="font-bold">Sentiment Valence Progression</span>
                <span className="font-mono font-bold text-emerald-700">
                  {valenceDiff > 0 ? `+${valenceDiff}` : '0.00'} Δ
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Baseline Diagnostic:</span>
                  <span className="font-mono font-bold text-red-700">
                    {simulation.baselineSentimentValence.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-blue-800 font-bold">Projected with Levers:</span>
                  <span className="font-mono text-emerald-700 font-bold text-sm">
                    {simulation.projectedSentimentValence > 0 ? `+${simulation.projectedSentimentValence.toFixed(2)}` : simulation.projectedSentimentValence.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Projected Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-blue-600" />
                  <span>Handoff Latency</span>
                </div>
                <p className="text-lg font-bold text-blue-800 font-display">
                  -{simulation.projectedHandoffLatencyReductionHours} hrs
                </p>
                <span className="text-[10px] text-slate-500">Per inter-team handoff</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <Users className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Meeting Savings</span>
                </div>
                <p className="text-lg font-bold text-indigo-800 font-display">
                  -{simulation.projectedMeetingOverheadReductionHoursWeekly} hrs/wk
                </p>
                <span className="text-[10px] text-slate-500">Status meeting reduction</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Retention Flight Risk</span>
                </div>
                <p className="text-lg font-bold text-emerald-700 font-display">
                  -{simulation.projectedRetentionRiskMitigationPercent}%
                </p>
                <span className="text-[10px] text-slate-500">Voluntary departure risk</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <Target className="h-3.5 w-3.5 text-amber-600" />
                  <span>Team Alignment</span>
                </div>
                <p className="text-lg font-bold text-amber-700 font-display">
                  {simulation.projectedTeamAlignmentScore}/100
                </p>
                <span className="text-[10px] text-slate-500">Predicted congruence score</span>
              </div>

            </div>

            {/* Causal Insights Log */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Behavioral Science Causal Predictions
              </span>
              <div className="space-y-1.5">
                {simulation.causalInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
