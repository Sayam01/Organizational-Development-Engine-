import React from 'react';
import { 
  GitCommit, 
  Workflow, 
  Flame, 
  Building2, 
  Zap, 
  Compass, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { BurkeLitwinDiagnostic } from '../types/od';

interface BurkeLitwinMapProps {
  diagnostics: BurkeLitwinDiagnostic[];
}

export const BurkeLitwinMap: React.FC<BurkeLitwinMapProps> = ({ diagnostics }) => {
  const transformational = diagnostics.filter(d => d.layer === 'Transformational');
  const transactional = diagnostics.filter(d => d.layer === 'Transactional');

  const getStatusColor = (status: BurkeLitwinDiagnostic['status']) => {
    switch (status) {
      case 'Critical Friction':
        return 'border-red-200 bg-red-50/70 text-red-900';
      case 'Needs Attention':
        return 'border-amber-200 bg-amber-50/70 text-amber-900';
      case 'Stable':
        return 'border-blue-200 bg-blue-50/70 text-blue-900';
      case 'Healthy':
        return 'border-emerald-200 bg-emerald-50/70 text-emerald-900';
    }
  };

  const getStatusBadge = (status: BurkeLitwinDiagnostic['status']) => {
    switch (status) {
      case 'Critical Friction':
        return <span className="tag tag-high">Critical</span>;
      case 'Needs Attention':
        return <span className="tag tag-mod">Attention</span>;
      case 'Stable':
        return <span className="tag bg-blue-50 text-blue-700 border border-blue-200">Stable</span>;
      case 'Healthy':
        return <span className="tag tag-low">Healthy</span>;
    }
  };

  return (
    <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Burke-Litwin Causality Model
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 font-medium rounded-full border border-blue-200">
              Transformational vs. Transactional Layers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Separates deep systemic cultural forces (Transformational) from day-to-day operational execution workflows (Transactional).
          </p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Layer 1: Transformational Forces */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Compass className="h-4 w-4 text-purple-600" />
              <span>Transformational Layer (Strategy, Leadership & Culture)</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Deep Organizational DNA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {transformational.map((item) => (
              <div 
                key={item.factor}
                className={`p-3.5 rounded-lg border ${getStatusColor(item.status)} relative shadow-xs`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 font-display">
                    {item.factor}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {item.healthScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.identifiedIssue}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between font-medium">
                  {getStatusBadge(item.status)}
                  <span>{item.signalsCount} signal{item.signalsCount === 1 ? '' : 's'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Causal Downward Arrow Connector */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-1">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] uppercase font-bold tracking-wider text-slate-600">
            Causal Impact Feeds Downward into Daily Operations ↓
          </span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Layer 2: Transactional Forces */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Zap className="h-4 w-4 text-blue-600" />
              <span>Transactional Layer (Systems, Management Practices & Climate)</span>
            </div>
            <span className="text-[11px] text-blue-700 font-semibold">
              Directly addressable via No-Code Systems
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {transactional.map((item) => (
              <div 
                key={item.factor}
                className={`p-3.5 rounded-lg border ${getStatusColor(item.status)} relative shadow-xs`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 font-display">
                    {item.factor}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {item.healthScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.identifiedIssue}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between font-medium">
                  {getStatusBadge(item.status)}
                  <span>{item.signalsCount} signal{item.signalsCount === 1 ? '' : 's'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
