import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  GitBranch, 
  Bell, 
  Heart, 
  Filter, 
  Award, 
  BarChart3, 
  Send, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Layers, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NoCodeStrategy, WorkflowNode } from '../types/od';

interface WorkflowBlueprintVisualizerProps {
  strategies: NoCodeStrategy[];
  selectedStrategyId: string;
  onSelectStrategyId: (id: string) => void;
}

export const WorkflowBlueprintVisualizer: React.FC<WorkflowBlueprintVisualizerProps> = ({
  strategies,
  selectedStrategyId,
  onSelectStrategyId
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const activeStrategy = strategies.find(s => s.id === selectedStrategyId) || strategies[0];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStepCompleted = (stepKey: string) => {
    setCompletedSteps(prev => {
      const next = { ...prev, [stepKey]: !prev[stepKey] };
      const allDone = activeStrategy.stepByStepPlaybook.every(step => 
        next[`${activeStrategy.id}-step-${step.stepNumber}`]
      );
      if (allDone) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="h-4 w-4 text-amber-600" />;
      case 'Database': return <Database className="h-4 w-4 text-blue-600" />;
      case 'GitBranch': return <GitBranch className="h-4 w-4 text-orange-600" />;
      case 'Bell': return <Bell className="h-4 w-4 text-purple-600" />;
      case 'Heart': return <Heart className="h-4 w-4 text-red-600" />;
      case 'Filter': return <Filter className="h-4 w-4 text-blue-700" />;
      case 'Award': return <Award className="h-4 w-4 text-amber-500" />;
      case 'BarChart3': return <BarChart3 className="h-4 w-4 text-blue-600" />;
      case 'Send': return <Send className="h-4 w-4 text-emerald-600" />;
      case 'Sliders': return <Sliders className="h-4 w-4 text-blue-700" />;
      case 'CheckCircle2': return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'Clock': return <Clock className="h-4 w-4 text-red-600" />;
      default: return <Layers className="h-4 w-4 text-blue-600" />;
    }
  };

  if (!activeStrategy) {
    return <div className="text-slate-500 text-sm">No strategy blueprint available.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Strategy Switcher Pills */}
      <div className="stat-card p-4 shadow-sm border border-slate-200 bg-white">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {strategies.map((strat) => (
            <button
              key={strat.id}
              onClick={() => onSelectStrategyId(strat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                strat.id === activeStrategy.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{strat.title.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Blueprint Details Banner */}
      <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-6">
        
        {/* Header & Meta */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                {activeStrategy.archetype}
              </span>
              <span className="tag tag-low">
                {activeStrategy.timeline}
              </span>
              <span className="tag bg-blue-50 text-blue-700 border border-blue-200">
                Complexity: {activeStrategy.implementationComplexity}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display pt-1">
              {activeStrategy.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeStrategy.summary}
            </p>
          </div>

          {/* Target Tools Badge Cluster */}
          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-1.5 min-w-[200px]">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              Target Tool Stack
            </span>
            {activeStrategy.targetTools.map((tool, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 shadow-xs"
              >
                <strong className="text-blue-700 font-bold">{tool.name}</strong> • {tool.role}
              </span>
            ))}
          </div>
        </div>

        {/* Expected Metric Gains Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Target OD Metric Gains & Success KPIs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeStrategy.expectedMetricGains.map((gain, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                <span className="text-xs text-slate-600 font-medium">{gain.metric}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-emerald-700 font-display">
                    {gain.targetValue}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {gain.baselineValue}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {gain.direction === 'decrease' ? 'Target Reduction' : 'Target Expansion'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Node-Based Interactive Workflow Diagram */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Interactive No-Code Architecture Pipeline
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {activeStrategy.workflowNodes.length} Automated Logic Nodes
            </span>
          </div>

          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-[700px]">
              {activeStrategy.workflowNodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  {/* Step Node Card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4 space-y-2 relative shadow-xs min-w-[180px]">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-md">
                        {getNodeIcon(node.iconName)}
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        Node 0{node.stepNumber}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 font-display line-clamp-1">
                      {node.title}
                    </h4>

                    <span className="inline-block text-[11px] font-semibold text-blue-700">
                      {node.tool}
                    </span>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-600 truncate font-medium">
                      {node.configDetails}
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {idx < activeStrategy.workflowNodes.length - 1 && (
                    <div className="text-blue-600 shrink-0">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Implementation Recipe Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Step-by-Step Technical Recipe & Configuration Guide
          </h3>

          <div className="space-y-2.5">
            {activeStrategy.stepByStepPlaybook.map((step, idx) => {
              const stepKey = `${activeStrategy.id}-step-${step.stepNumber}`;
              const isChecked = !!completedSteps[stepKey];

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border transition-all ${
                    isChecked 
                      ? 'bg-emerald-50/80 border-emerald-300 text-slate-800' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStepCompleted(stepKey)}
                        className={`mt-0.5 h-5 w-5 rounded border flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 bg-white hover:border-slate-400 text-transparent'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 font-display">
                            Step {step.stepNumber}: {step.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-blue-700 font-semibold border border-slate-200">
                            {step.tool}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          {step.action}
                        </p>

                        <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded p-1.5 flex items-start gap-1 mt-1 font-medium">
                          <span className="font-bold shrink-0">💡 Configuration Tip:</span>
                          <span>{step.configurationTip}</span>
                        </div>

                        {step.samplePayload && (
                          <div className="mt-2 p-2 bg-white rounded-md border border-slate-200 font-mono text-[11px] text-slate-800 flex items-center justify-between shadow-xs">
                            <span className="truncate pr-2">{step.samplePayload}</span>
                            <button
                              onClick={() => handleCopy(step.samplePayload!, idx)}
                              className="text-xs text-slate-500 hover:text-slate-900 shrink-0 p-1 hover:bg-slate-100 rounded"
                            >
                              {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RACI Matrix & Change Management Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-slate-200">
          
          {/* RACI Matrix */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-blue-600" />
              RACI Governance Matrix
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex items-start justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-blue-800 w-28 shrink-0">Responsible (R):</span>
                <span className="text-slate-700 text-right font-medium">{activeStrategy.raciMatrix.responsible}</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-blue-600 w-28 shrink-0">Accountable (A):</span>
                <span className="text-slate-700 text-right font-medium">{activeStrategy.raciMatrix.accountable}</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-slate-200">
                <span className="font-bold text-amber-800 w-28 shrink-0">Consulted (C):</span>
                <span className="text-slate-700 text-right font-medium">{activeStrategy.raciMatrix.consulted}</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="font-bold text-emerald-800 w-28 shrink-0">Informed (I):</span>
                <span className="text-slate-700 text-right font-medium">{activeStrategy.raciMatrix.informed}</span>
              </div>
            </div>
          </div>

          {/* Change Management Guidance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Change Management & Adoption Playbook
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
              {activeStrategy.changeManagementGuide.map((guide, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{guide}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
