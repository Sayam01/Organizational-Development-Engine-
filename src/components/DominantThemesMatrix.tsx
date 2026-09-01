import React from 'react';
import { 
  Sparkles, 
  Tag, 
  MessageSquareQuote, 
  TrendingDown, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { ThemeCluster } from '../types/od';

interface DominantThemesMatrixProps {
  themes: ThemeCluster[];
  onSelectTheme?: (themeName: string) => void;
}

export const DominantThemesMatrix: React.FC<DominantThemesMatrixProps> = ({ themes }) => {
  const getIntensityBadge = (level: ThemeCluster['intensityLevel']) => {
    switch (level) {
      case 'Severe':
        return <span className="tag tag-high">Severe</span>;
      case 'High':
        return <span className="tag tag-mod">High</span>;
      case 'Moderate':
        return <span className="tag bg-blue-50 text-blue-700 border border-blue-200">Moderate</span>;
      case 'Low':
        return <span className="tag tag-low">Low</span>;
    }
  };

  return (
    <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Dominant Feedback Themes (LDA Semantic Clusters)
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 font-medium rounded-full border border-slate-200">
              Cluster Extraction
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Latent Dirichlet Allocation extracts high-salience semantic clusters from unstructured feedback.
          </p>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div 
            key={theme.id}
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-slate-900 font-display">
                    {theme.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-blue-700">{theme.primaryFramework}</span>
                  </div>
                </div>
                {getIntensityBadge(theme.intensityLevel)}
              </div>

              {/* Sample Quote Snippets */}
              <div className="mt-3 space-y-1.5">
                {theme.sampleQuotes.map((quote, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <MessageSquareQuote className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">“{quote.replace(/^"|"$/g, '')}”</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta & Keywords */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {theme.keywords.map((kw, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-white text-slate-700 rounded text-[10px] font-mono border border-slate-200 font-medium"
                  >
                    <Tag className="h-2.5 w-2.5 text-slate-400" />
                    {kw}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
                <span>Signal Frequency: <strong className="text-slate-900 font-bold">{theme.signalCount} mentions</strong></span>
                <span>Avg Valence: <strong className="font-mono text-red-700 font-bold">{theme.avgValence}</strong></span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
