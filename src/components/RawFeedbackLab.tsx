import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Tag, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  Building2, 
  Compass, 
  ChevronDown,
  FileSpreadsheet
} from 'lucide-react';
import { FeedbackItem } from '../types/od';

interface RawFeedbackLabProps {
  feedbackItems: FeedbackItem[];
  onOpenIngestModal: () => void;
}

export const RawFeedbackLab: React.FC<RawFeedbackLabProps> = ({
  feedbackItems,
  onOpenIngestModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');

  const departments = ['all', 'Engineering', 'Product & Design', 'Sales & Marketing', 'Customer Support', 'Operations & HR', 'Cross-functional'];
  const sources = ['all', 'Slack / Teams Message', 'Quarterly Pulse Survey', '1-on-1 Notes', 'Glassdoor / Public Review', 'All-Hands Q&A', 'Exit Interview'];
  const emotions = ['all', 'Frustration', 'Exhaustion', 'Disengagement', 'Ambiguity', 'Cultural Erosion', 'Constructive Suggestion'];

  const filteredItems = feedbackItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dominantTheme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.extractedKeywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDept === 'all' || item.department === selectedDept;
    const matchesSource = selectedSource === 'all' || item.source === selectedSource;
    const matchesEmotion = selectedEmotion === 'all' || item.primaryEmotion === selectedEmotion;

    return matchesSearch && matchesDept && matchesSource && matchesEmotion;
  });

  const getEmotionBadge = (emotion: FeedbackItem['primaryEmotion']) => {
    switch (emotion) {
      case 'Frustration': return 'tag tag-high';
      case 'Exhaustion': return 'tag tag-mod';
      case 'Disengagement': return 'tag bg-purple-50 text-purple-700 border border-purple-200';
      case 'Cultural Erosion': return 'tag bg-rose-50 text-rose-700 border border-rose-200';
      case 'Ambiguity': return 'tag bg-blue-50 text-blue-700 border border-blue-200';
      default: return 'tag tag-low';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="stat-card p-6 shadow-sm border border-slate-200 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Workforce Human Signal Ingestion Lab
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {feedbackItems.length} Ingested Records
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Inspect, query, and verify individual raw employee feedback signals with real-time valence scores and framework mappings.
            </p>
          </div>

          <button
            onClick={onOpenIngestModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-all shrink-0"
          >
            + Ingest More Feedback
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search keyword or text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs py-2 pl-9 pr-3 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full appearance-none bg-white text-slate-800 text-xs py-2 pl-3 pr-8 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Source Filter */}
          <div className="relative">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full appearance-none bg-white text-slate-800 text-xs py-2 pl-3 pr-8 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600"
            >
              {sources.map((src) => (
                <option key={src} value={src}>
                  {src === 'all' ? 'All Feedback Sources' : src}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Emotion Filter */}
          <div className="relative">
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="w-full appearance-none bg-white text-slate-800 text-xs py-2 pl-3 pr-8 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600"
            >
              {emotions.map((emo) => (
                <option key={emo} value={emo}>
                  {emo === 'all' ? 'All Primary Emotions' : emo}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="stat-card border border-slate-200 rounded-lg p-8 text-center text-slate-500 text-xs bg-white">
            No feedback signals matching current filter criteria.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div 
              key={item.id}
              className="stat-card border border-slate-200 hover:border-slate-300 rounded-lg p-4 space-y-3 transition-all bg-white shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 font-display">
                    {item.department}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{item.source}</span>
                  <span className="text-slate-300">•</span>
                  <span className={getEmotionBadge(item.primaryEmotion)}>
                    {item.primaryEmotion} ({item.intensity})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Valence:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    item.sentimentValence < -0.6 ? 'bg-red-50 text-red-700 border border-red-200' :
                    item.sentimentValence < 0 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {item.sentimentValence > 0 ? `+${item.sentimentValence.toFixed(2)}` : item.sentimentValence.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quote Content */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                “{item.text}”
              </p>

              {/* Extracted Theme & OD Mapping Chips */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px]">
                <div className="flex flex-wrap items-center gap-2 text-slate-500 font-medium">
                  <span>Theme: <strong className="text-blue-700 font-semibold">{item.dominantTheme}</strong></span>
                  <span>•</span>
                  <span>McKinsey: <strong className="text-slate-800 font-semibold">{item.odFrameworkMapping.mckinsey7s}</strong></span>
                  <span>•</span>
                  <span>Burke-Litwin: <strong className="text-slate-800 font-semibold">{item.odFrameworkMapping.burkeLitwin}</strong></span>
                </div>

                <div className="flex items-center gap-1">
                  {item.extractedKeywords.map((kw, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600 border border-slate-200 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
