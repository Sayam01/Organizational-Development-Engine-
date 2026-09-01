import React from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  HeartCrack, 
  BatteryLow, 
  Users, 
  HelpCircle, 
  CheckCircle,
  Sparkles,
  ArrowDownRight,
  Clock,
  Compass
} from 'lucide-react';
import { ODAnalysisResult } from '../types/od';

interface SentimentOverviewProps {
  analysis: ODAnalysisResult;
  onNavigateToFriction: () => void;
}

export const SentimentOverview: React.FC<SentimentOverviewProps> = ({
  analysis,
  onNavigateToFriction
}) => {
  const { overallSentimentScore, sentimentDistribution, totalSignals, executiveSummary, frictionPoints } = analysis;

  // Derive valence percentage for visual needle (-1.0 => 0%, 0.0 => 50%, +1.0 => 100%)
  const valencePercent = Math.max(0, Math.min(100, Math.round(((overallSentimentScore + 1) / 2) * 100)));
  
  const getValenceTone = (score: number) => {
    if (score < -0.6) return { label: 'Severe Workforce Friction', color: 'text-red-700', badgeClass: 'tag-high' };
    if (score < -0.2) return { label: 'Latent Friction & Discontent', color: 'text-amber-800', badgeClass: 'tag-mod' };
    if (score <= 0.2) return { label: 'Mixed Sentiment Equilibrium', color: 'text-slate-700', badgeClass: 'tag bg-slate-100 text-slate-700 border border-slate-300' };
    return { label: 'High Organizational Alignment', color: 'text-emerald-800', badgeClass: 'tag-low' };
  };

  const tone = getValenceTone(overallSentimentScore);

  return (
    <div className="space-y-6">
      {/* Top Header & Executive Summary Callout */}
      <div className="stat-card p-6 shadow-sm border border-slate-200 relative overflow-hidden bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                <Compass className="h-3.5 w-3.5 text-blue-600" />
                Organizational Diagnostic Synthesis
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {totalSignals} Unstructured Signals Processed
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
              Workforce Sentiment & Behavioral Science Diagnostic
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed pt-1">
              {executiveSummary}
            </p>
          </div>

          <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6 gap-3 min-w-[220px]">
            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-500 font-medium">Target Strategy Levers</p>
              <p className="text-2xl font-bold text-blue-600 font-display">
                {analysis.strategies.length} No-Code Playbooks
              </p>
            </div>
            <button
              onClick={onNavigateToFriction}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-all shadow-xs flex items-center gap-1.5"
            >
              View Friction Levers
              <ArrowDownRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Diagnostic Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Valence Diagnostic Card */}
        <div className="stat-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Valence Analysis</span>
              <span className={`tag ${tone.badgeClass}`}>
                {overallSentimentScore > 0 ? `+${overallSentimentScore.toFixed(2)}` : overallSentimentScore.toFixed(2)}
              </span>
            </div>
            <p className={`text-sm font-bold ${tone.color} mt-1`}>
              {tone.label}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full"
                style={{ width: '100%' }}
              />
              <div 
                className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-sm -translate-x-1 border border-white"
                style={{ left: `${valencePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono font-medium">
              <span>-1.0 (Critical)</span>
              <span>0.0 (Neutral)</span>
              <span>+1.0 (Optimal)</span>
            </div>
          </div>
        </div>

        {/* Emotion Breakdown Card */}
        <div className="stat-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Dominant Emotions</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <HeartCrack className="h-3 w-3 text-red-500" />
                  Frustration
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {sentimentDistribution.frustration}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: `${sentimentDistribution.frustration}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <BatteryLow className="h-3 w-3 text-amber-500" />
                  Exhaustion & Fatigue
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {sentimentDistribution.exhaustion}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${sentimentDistribution.exhaustion}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Users className="h-3 w-3 text-purple-600" />
                  Disengagement / Silos
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {sentimentDistribution.disengagement}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${sentimentDistribution.disengagement}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Systemic Friction Hotspots */}
        <div className="stat-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Friction Hotspots</span>
              <span className="tag tag-high">
                {frictionPoints.length} Active
              </span>
            </div>
            <p className="text-xl font-bold text-slate-900 font-display mt-1">
              {frictionPoints.filter(f => f.severity === 'Critical').length} Critical Points
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Concentrated in Systems, Structure, and Feedback Latency.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Affected Departments</span>
            <span className="text-slate-800 font-bold font-mono">4 Core Units</span>
          </div>
        </div>

        {/* Operational Delay Metric */}
        <div className="stat-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Handoff Delay</span>
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-slate-900 font-display mt-1">
              ~28.5 hrs
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Avg cycle latency caused by multi-tool search & manual approvals.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target Reduction</span>
            <span className="text-emerald-700 font-bold font-mono">-40% to 4.2 hrs</span>
          </div>
        </div>

      </div>
    </div>
  );
};
