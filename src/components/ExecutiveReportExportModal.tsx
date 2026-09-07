import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { ODAnalysisResult } from '../types/od';

interface ExecutiveReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ODAnalysisResult;
  datasetName: string;
}

export const ExecutiveReportExportModal: React.FC<ExecutiveReportExportModalProps> = ({
  isOpen,
  onClose,
  analysis,
  datasetName
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = `# Executive Organizational Development (OD) Intelligence Brief
**Target Organization / Dataset:** ${datasetName}
**Generated Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Analyzed Signal Volume:** ${analysis.totalSignals} Unstructured Feedback Inputs
**Systemic Sentiment Valence:** ${analysis.overallSentimentScore.toFixed(2)} (Scale: -1.0 to +1.0)

---

## 1. Executive Summary & Diagnostic Synthesis
${analysis.executiveSummary}

**Emotion Distribution Breakdown:**
- Frustration & Bottlenecks: ${analysis.sentimentDistribution.frustration}%
- Exhaustion & Burnout Risk: ${analysis.sentimentDistribution.exhaustion}%
- Disengagement & Siloing: ${analysis.sentimentDistribution.disengagement}%
- Constructive Alignment: ${analysis.sentimentDistribution.positive}%

---

## 2. McKinsey 7S Framework Diagnostic Assessment
| Dimension | Health Score | Status | Primary Friction Gaps |
| :--- | :--- | :--- | :--- |
${analysis.mckinsey7s.map(d => `| **${d.dimension}** | ${d.healthScore}/100 | ${d.status} | ${d.dominantGaps.join(', ')} |`).join('\n')}

---

## 3. Prosci ADKAR® Change Management Readiness
- **Overall Adoption Readiness Index**: ${analysis.adkarOverallReadiness || 52}%
- **Primary Sequential Barrier Point**: **${analysis.adkarBarrierPoint || 'Awareness'}** *(Downstream adoption will stall until this stage is resolved)*

| Stage | Score | Status | Dimension | Suggested No-Code Intervention Lever |
| :--- | :--- | :--- | :--- | :--- |
${(analysis.adkar || []).map(a => `| **${a.stage}** (${a.fullName}) | ${a.score}/100 | ${a.status} | ${a.readinessDimension} | ${a.suggestedNoCodeTool} |`).join('\n')}

---

## 4. Burke-Litwin Causality Mapping
### Transformational Factors (Strategy, Culture, Leadership)
${analysis.burkeLitwin.filter(b => b.layer === 'Transformational').map(b => `- **${b.factor} (${b.status})**: ${b.identifiedIssue}`).join('\n')}

### Transactional Factors (Systems, Practices, Climate)
${analysis.burkeLitwin.filter(b => b.layer === 'Transactional').map(b => `- **${b.factor} (${b.status})**: ${b.identifiedIssue}`).join('\n')}

---

## 5. Workforce Friction Points & Actionable No-Code Operational Strategies

${analysis.frictionPoints.map(f => {
  const strat = analysis.strategies.find(s => s.id === f.strategyId || s.frictionPointId === f.id);
  return `### Friction Point: ${f.title} (${f.archetype})
- **Severity**: ${f.severity}
- **Affected Units**: ${f.affectedDepartments.join(', ')}
- **Root Cause**: ${f.rootCause}
- **OD Framework Context**: ${f.odContext}

#### Recommended No-Code Operational Strategy: ${strat ? strat.title : 'SSoT Automation Pipeline'}
${strat ? `
- **Complexity / Timeline**: ${strat.implementationComplexity} (${strat.timeline})
- **Target Tools Stack**: ${strat.targetTools.map(t => `${t.name} (${t.role})`).join(', ')}
- **Estimated Operational Impact**: ${strat.estimatedImpact}

**Step-by-Step Implementation Recipe:**
${strat.stepByStepPlaybook.map(s => `${s.stepNumber}. **${s.title}** [${s.tool}]: ${s.action} *(Tip: ${s.configurationTip})*`).join('\n')}

**RACI Matrix:**
- **Responsible**: ${strat.raciMatrix.responsible}
- **Accountable**: ${strat.raciMatrix.accountable}
- **Consulted**: ${strat.raciMatrix.consulted}
- **Informed**: ${strat.raciMatrix.informed}
` : ''}
---
`;
}).join('\n')}

## 5. Change Management & Adoption Protocol
1. Launch single-intake forms accompanied by 2-minute asynchronous Loom walkthroughs.
2. Configure automated bot reminders in team communication channels to eliminate manual follow-up friction.
3. Establish weekly 15-minute operational standups with the designated Accountable leads to audit throughput.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `OD_Diagnostic_Brief_${datasetName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-display">
                Executive OD Diagnostic & No-Code Strategy Brief
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Ready for executive review, stakeholder distribution, and operational kickoff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Formatted Markdown Preview */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed bg-slate-50/70 space-y-4 select-text">
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            {markdownContent}
          </pre>
        </div>

      </div>
    </div>
  );
};
