import { FeedbackItem, ODAnalysisResult, ThemeCluster, McKinsey7SDiagnostic, BurkeLitwinDiagnostic, FrictionPoint, NoCodeStrategy, FrictionArchetype } from '../types/od';

export function parseRawFeedback(rawText: string): FeedbackItem[] {
  if (!rawText.trim()) return [];

  // If text is JSON array
  try {
    const parsed = JSON.parse(rawText);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => ({
        id: item.id || `custom-sig-${idx + 1}`,
        text: typeof item === 'string' ? item : item.text || JSON.stringify(item),
        source: item.source || 'Quarterly Pulse Survey',
        department: item.department || 'Cross-functional',
        sentimentValence: typeof item.sentimentValence === 'number' ? item.sentimentValence : analyzeValence(typeof item === 'string' ? item : item.text || ''),
        intensity: item.intensity || getIntensityFromValence(typeof item === 'string' ? item : item.text || ''),
        primaryEmotion: item.primaryEmotion || detectPrimaryEmotion(typeof item === 'string' ? item : item.text || ''),
        dominantTheme: item.dominantTheme || extractDominantThemeName(typeof item === 'string' ? item : item.text || ''),
        odFrameworkMapping: item.odFrameworkMapping || mapToFrameworks(typeof item === 'string' ? item : item.text || ''),
        extractedKeywords: item.extractedKeywords || extractKeywords(typeof item === 'string' ? item : item.text || '')
      }));
    }
  } catch {
    // Not JSON, continue to line-by-line / quote parsing
  }

  // Split by double newlines or bullet points or line breaks
  const rawLines = rawText
    .split(/\n\s*\n|\n(?=[-*•]|\d+\.)/)
    .map(s => s.replace(/^[-*•\d.]+\s*/, '').trim())
    .filter(s => s.length > 10);

  const lines = rawLines.length > 0 ? rawLines : [rawText.trim()];

  return lines.map((line, idx) => {
    const valence = analyzeValence(line);
    const primaryEmotion = detectPrimaryEmotion(line);
    const intensity = getIntensityFromValence(line);
    const keywords = extractKeywords(line);
    const mapping = mapToFrameworks(line);
    const dominantTheme = extractDominantThemeName(line);

    // Try detecting department from text keywords
    let department: FeedbackItem['department'] = 'Cross-functional';
    const lower = line.toLowerCase();
    if (lower.includes('code') || lower.includes('dev') || lower.includes('engineer') || lower.includes('bug') || lower.includes('deploy') || lower.includes('architecture') || lower.includes('git')) {
      department = 'Engineering';
    } else if (lower.includes('product') || lower.includes('design') || lower.includes('figma') || lower.includes('roadmap') || lower.includes('ux') || lower.includes('feature')) {
      department = 'Product & Design';
    } else if (lower.includes('sales') || lower.includes('deal') || lower.includes('client') || lower.includes('revenue') || lower.includes('customer') || lower.includes('lead')) {
      department = 'Sales & Marketing';
    } else if (lower.includes('ticket') || lower.includes('support') || lower.includes('on-call') || lower.includes('escalat') || lower.includes('patient') || lower.includes('shift')) {
      department = 'Customer Support';
    } else if (lower.includes('hr') || lower.includes('manager') || lower.includes('payroll') || lower.includes('interview') || lower.includes('hiring') || lower.includes('policy') || lower.includes('expense')) {
      department = 'Operations & HR';
    }

    // Try detecting source
    let source: FeedbackItem['source'] = 'Quarterly Pulse Survey';
    if (lower.includes('slack') || lower.includes('channel') || lower.includes('dm')) {
      source = 'Slack / Teams Message';
    } else if (lower.includes('1-on-1') || lower.includes('1:1') || lower.includes('manager talk')) {
      source = '1-on-1 Notes';
    } else if (lower.includes('exit') || lower.includes('leaving') || lower.includes('resigned')) {
      source = 'Exit Interview';
    } else if (lower.includes('all-hands') || lower.includes('town hall') || lower.includes('q&a')) {
      source = 'All-Hands Q&A';
    }

    return {
      id: `sig-${Date.now()}-${idx + 1}`,
      text: line,
      source,
      department,
      sentimentValence: valence,
      intensity,
      primaryEmotion,
      dominantTheme,
      odFrameworkMapping: mapping,
      extractedKeywords: keywords
    };
  });
}

export function analyzeValence(text: string): number {
  const lower = text.toLowerCase();
  
  const negativeWords = [
    'never', 'hate', 'frustrated', 'exhausted', 'impossible', 'broken', 'waste', 
    'brick wall', 'unnoticed', 'silo', 'bottleneck', 'paralysis', 'delay', 'confusing', 
    'nobody', 'terrible', 'stuck', 'unclear', 'bureaucracy', 'politics', 'fatigue',
    'disconnect', 'lost', 'fire drill', 'unanswered', 'isolation', 'burnout', 'wiped',
    'hours searching', 'reconcil', 'veto', 'blame', 'painful', 'slow', 'struggle'
  ];
  
  const positiveWords = [
    'love', 'great', 'fast', 'clear', 'helpful', 'efficient', 'camaraderie', 
    'thriving', 'transparent', 'streamlined', 'supportive', 'delighted', 'valuable',
    'empowered', 'celebrate', 'kudos', 'collaborative', 'alignment', 'productive'
  ];

  let score = 0;
  negativeWords.forEach(w => {
    if (lower.includes(w)) score -= 0.35;
  });
  positiveWords.forEach(w => {
    if (lower.includes(w)) score += 0.35;
  });

  // Clamp between -0.98 and +0.95
  return Math.max(-0.98, Math.min(0.95, score || -0.65));
}

export function getIntensityFromValence(text: string): FeedbackItem['intensity'] {
  const lower = text.toLowerCase();
  if (lower.includes('never') || lower.includes('severe') || lower.includes('disaster') || lower.includes('quit') || lower.includes('brick wall') || lower.includes('zero') || lower.includes('emergency')) {
    return 'Severe';
  }
  if (lower.includes('frustrated') || lower.includes('waste') || lower.includes('stuck') || lower.includes('hours') || lower.includes('bottleneck') || lower.includes('paralysis')) {
    return 'High';
  }
  if (lower.includes('could be better') || lower.includes('minor') || lower.includes('sometimes') || lower.includes('slight')) {
    return 'Low';
  }
  return 'Moderate';
}

export function detectPrimaryEmotion(text: string): FeedbackItem['primaryEmotion'] {
  const lower = text.toLowerCase();
  if (lower.includes('unnoticed') || lower.includes('culture') || lower.includes('values') || lower.includes('politics') || lower.includes('merit')) {
    return 'Cultural Erosion';
  }
  if (lower.includes('exhaust') || lower.includes('tired') || lower.includes('reconcil') || lower.includes('hours') || lower.includes('shift') || lower.includes('tool fatigue')) {
    return 'Exhaustion';
  }
  if (lower.includes('never know') || lower.includes('unclear') || lower.includes('who is') || lower.includes('source of truth') || lower.includes('ambiguity')) {
    return 'Ambiguity';
  }
  if (lower.includes('yearly review') || lower.includes('isolation') || lower.includes('freelancer') || lower.includes('disengaged') || lower.includes('ignore')) {
    return 'Disengagement';
  }
  if (lower.includes('love') || lower.includes('good') || lower.includes('suggest') || lower.includes('could automate') || lower.includes('spirit')) {
    return 'Constructive Suggestion';
  }
  return 'Frustration';
}

export function extractKeywords(text: string): string[] {
  const clean = text.replace(/[^a-zA-Z0-9\s]/g, ' ').toLowerCase();
  const words = clean.split(/\s+/).filter(w => w.length > 3);
  const stopWords = new Set(['this', 'that', 'with', 'from', 'have', 'been', 'they', 'what', 'when', 'where', 'which', 'their', 'there', 'about', 'would', 'could', 'should', 'because', 'every', 'other', 'after']);
  
  const filtered = words.filter(w => !stopWords.has(w));
  const unique = Array.from(new Set(filtered));
  return unique.slice(0, 5);
}

export function mapToFrameworks(text: string): FeedbackItem['odFrameworkMapping'] {
  const lower = text.toLowerCase();

  // McKinsey 7S
  let mckinsey: FeedbackItem['odFrameworkMapping']['mckinsey7s'] = 'Systems';
  let burkeLitwin: FeedbackItem['odFrameworkMapping']['burkeLitwin'] = 'Systems';

  if (lower.includes('responsible') || lower.includes('ownership') || lower.includes('approval') || lower.includes('signature') || lower.includes('hierarchy') || lower.includes('veto')) {
    mckinsey = 'Structure';
    burkeLitwin = 'Structure';
  } else if (lower.includes('manager') || lower.includes('1-on-1') || lower.includes('review') || lower.includes('coaching') || lower.includes('leadership')) {
    mckinsey = 'Style';
    burkeLitwin = 'Management Practices';
  } else if (lower.includes('unnoticed') || lower.includes('recognition') || lower.includes('kudos') || lower.includes('value') || lower.includes('merit') || lower.includes('climate')) {
    mckinsey = 'Shared Values';
    burkeLitwin = 'Work Unit Climate';
  } else if (lower.includes('sales') || lower.includes('roadmap') || lower.includes('strategy') || lower.includes('mission') || lower.includes('priority')) {
    mckinsey = 'Strategy';
    burkeLitwin = 'Mission/Strategy';
  } else if (lower.includes('skill') || lower.includes('training') || lower.includes('literacy')) {
    mckinsey = 'Skills';
    burkeLitwin = 'Individual Needs';
  }

  return { mckinsey7s: mckinsey, burkeLitwin };
}

export function extractDominantThemeName(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('tool') || lower.includes('jira') || lower.includes('linear') || lower.includes('spreadsheet')) {
    return 'Tool Fragmentation & Duplicate Tracking';
  }
  if (lower.includes('who is') || lower.includes('responsible') || lower.includes('ownership') || lower.includes('decision')) {
    return 'Decision Ambiguity & Ownership Void';
  }
  if (lower.includes('manager') || lower.includes('review') || lower.includes('feedback')) {
    return 'Feedback Latency & Manager Isolation';
  }
  if (lower.includes('unnoticed') || lower.includes('recognition') || lower.includes('praise')) {
    return 'Recognition Gap & Invisible Contributions';
  }
  if (lower.includes('approval') || lower.includes('signatures') || lower.includes('waiting')) {
    return 'Approval Bottlenecks & Bureaucracy';
  }
  if (lower.includes('handoff') || lower.includes('silo') || lower.includes('wall')) {
    return 'Cross-Functional Information Asymmetry';
  }
  return 'Operational Workflow Friction';
}

export function generateCompleteODAnalysis(feedbackItems: FeedbackItem[], customTitle?: string): ODAnalysisResult {
  const total = feedbackItems.length;
  if (total === 0) {
    throw new Error("No feedback items provided for analysis.");
  }

  // Calculate sentiment metrics
  let totalValence = 0;
  let frustrationCount = 0;
  let exhaustionCount = 0;
  let disengagementCount = 0;
  let positiveCount = 0;
  let neutralCount = 0;

  feedbackItems.forEach(item => {
    totalValence += item.sentimentValence;
    if (item.sentimentValence > 0.2) positiveCount++;
    else if (item.sentimentValence >= -0.2) neutralCount++;
    
    if (item.primaryEmotion === 'Frustration') frustrationCount++;
    else if (item.primaryEmotion === 'Exhaustion') exhaustionCount++;
    else if (item.primaryEmotion === 'Disengagement' || item.primaryEmotion === 'Cultural Erosion') disengagementCount++;
  });

  const avgValence = Math.round((totalValence / total) * 100) / 100;
  const posPct = Math.round((positiveCount / total) * 100);
  const neutPct = Math.round((neutralCount / total) * 100);
  const frustPct = Math.round((frustrationCount / total) * 100);
  const exhaustPct = Math.round((exhaustionCount / total) * 100);
  const disengPct = Math.round((disengagementCount / total) * 100);

  // Group into Theme Clusters (LDA Simulation)
  const themeMap = new Map<string, { quotes: string[]; keywords: Set<string>; valences: number[]; framework: string }>();
  
  feedbackItems.forEach(item => {
    const themeKey = item.dominantTheme;
    if (!themeMap.has(themeKey)) {
      themeMap.set(themeKey, { quotes: [], keywords: new Set<string>(), valences: [], framework: `McKinsey 7S: ${item.odFrameworkMapping.mckinsey7s}` });
    }
    const data = themeMap.get(themeKey)!;
    data.quotes.push(item.text);
    item.extractedKeywords.forEach(k => data.keywords.add(k));
    data.valences.push(item.sentimentValence);
  });

  const dominantThemes: ThemeCluster[] = Array.from(themeMap.entries()).map(([themeName, data], idx) => {
    const avgThemeValence = data.valences.reduce((a, b) => a + b, 0) / data.valences.length;
    let intensityLevel: ThemeCluster['intensityLevel'] = 'Moderate';
    if (avgThemeValence < -0.7) intensityLevel = 'Severe';
    else if (avgThemeValence < -0.5) intensityLevel = 'High';
    else if (avgThemeValence > 0) intensityLevel = 'Low';

    return {
      id: `theme-gen-${idx + 1}`,
      name: themeName,
      category: 'Organizational Systems & Flow',
      signalCount: data.quotes.length,
      avgValence: Math.round(avgThemeValence * 100) / 100,
      intensityLevel,
      keywords: Array.from(data.keywords).slice(0, 6),
      sampleQuotes: data.quotes.slice(0, 2),
      primaryFramework: data.framework
    };
  }).sort((a, b) => b.signalCount - a.signalCount);

  // Compute McKinsey 7S Scores
  const dimensions7S: ('Strategy' | 'Structure' | 'Systems' | 'Shared Values' | 'Style' | 'Staff' | 'Skills')[] = [
    'Structure', 'Systems', 'Style', 'Shared Values', 'Staff', 'Skills', 'Strategy'
  ];

  const mckinsey7s: McKinsey7SDiagnostic[] = dimensions7S.map(dim => {
    const matchingItems = feedbackItems.filter(f => f.odFrameworkMapping.mckinsey7s === dim);
    const count = matchingItems.length;
    let healthScore = 70; // baseline
    if (count > 0) {
      const avgVal = matchingItems.reduce((acc, curr) => acc + curr.sentimentValence, 0) / count;
      // score mapping: -1.0 -> 20, 0.0 -> 60, +1.0 -> 95
      healthScore = Math.max(15, Math.min(95, Math.round(60 + (avgVal * 40))));
    }

    let status: McKinsey7SDiagnostic['status'] = 'Stable';
    if (healthScore < 40) status = 'Critical Friction';
    else if (healthScore < 60) status = 'Needs Attention';
    else if (healthScore > 80) status = 'Healthy';

    const sampleEvidence = matchingItems.slice(0, 2).map(m => `"${m.text.substring(0, 120)}..."`);

    return {
      dimension: dim,
      healthScore,
      status,
      summary: get7SSummary(dim, healthScore),
      signalsCount: count,
      dominantGaps: get7SGaps(dim, matchingItems),
      evidenceQuotes: sampleEvidence.length > 0 ? sampleEvidence : ['No direct friction signals in current sample.']
    };
  });

  // Compute Burke-Litwin Scores
  const burkeFactors: BurkeLitwinDiagnostic['factor'][] = [
    'Structure', 'Systems', 'Management Practices', 'Work Unit Climate', 'Culture', 'Leadership', 'Motivation', 'Mission/Strategy', 'Individual Needs'
  ];

  const burkeLitwin: BurkeLitwinDiagnostic[] = burkeFactors.map(factor => {
    const matching = feedbackItems.filter(f => f.odFrameworkMapping.burkeLitwin === factor);
    const count = matching.length;
    let healthScore = 68;
    if (count > 0) {
      const avgVal = matching.reduce((acc, curr) => acc + curr.sentimentValence, 0) / count;
      healthScore = Math.max(15, Math.min(95, Math.round(60 + (avgVal * 40))));
    }

    const isTransformational = ['Leadership', 'Culture', 'Mission/Strategy'].includes(factor);
    let status: BurkeLitwinDiagnostic['status'] = 'Stable';
    if (healthScore < 40) status = 'Critical Friction';
    else if (healthScore < 60) status = 'Needs Attention';
    else if (healthScore > 80) status = 'Healthy';

    return {
      factor,
      layer: isTransformational ? 'Transformational' : 'Transactional',
      healthScore,
      status,
      summary: `${factor} reflects an overall alignment score of ${healthScore}/100 based on ${count} signals.`,
      signalsCount: count,
      identifiedIssue: matching.length > 0 ? matching[0].dominantTheme : 'Operating at baseline nominal state.'
    };
  });

  // Synthesize Friction Points & No-Code Strategies
  const frictionPoints: FrictionPoint[] = [];
  const strategies: NoCodeStrategy[] = [];

  // Check for Archetype A: Information Asymmetry & Silos
  const siloItems = feedbackItems.filter(f => f.odFrameworkMapping.mckinsey7s === 'Systems' || f.dominantTheme.includes('Tool') || f.dominantTheme.includes('Handoff') || f.dominantTheme.includes('Silo'));
  if (siloItems.length > 0) {
    const fId = 'fric-gen-1';
    const sId = 'strat-gen-1';
    frictionPoints.push({
      id: fId,
      title: 'Information Asymmetry & Tool Fragmentation',
      archetype: 'Archetype A: Information Asymmetry & Silos',
      severity: siloItems.some(i => i.intensity === 'Severe' || i.intensity === 'High') ? 'Critical' : 'Elevated',
      rootCause: 'Employees lose valuable focus time navigating disconnected tools and unstandardized handoff channels.',
      odContext: 'Severe breakdown in Organizational Systems and Cross-Team Communication Flow.',
      affectedDepartments: Array.from(new Set(siloItems.map(i => i.department))),
      signalsCount: siloItems.length,
      evidenceQuotes: siloItems.slice(0, 3).map(i => i.text),
      frameworkAttribution: {
        mckinsey: 'Systems & Structure',
        burkeLitwin: 'Systems (Transactional Layer)'
      },
      strategyId: sId
    });

    strategies.push({
      id: sId,
      frictionPointId: fId,
      title: 'Single Source of Truth (SSoT) Intake & Auto-Sync Engine',
      archetype: 'Archetype A: Information Asymmetry & Silos',
      summary: 'Centralize cross-departmental requests through Tally/Typeform, pipe into an Airtable/Notion SSoT base, and auto-dispatch status cards to Slack/Teams.',
      targetTools: [
        { name: 'Tally / Typeform', role: 'Standardized Intake Gate', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        { name: 'Airtable / Notion', role: 'Centralized Master Base', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        { name: 'Make.com / Zapier', role: 'Event-Driven Sync Router', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        { name: 'Slack / MS Teams', role: 'Real-Time Status Notifications', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
      ],
      implementationComplexity: 'Low (1-2 days)',
      timeline: '24-48 Hours to MVP Launch',
      estimatedImpact: 'Eliminates repetitive status meetings and reduces inter-departmental handoff delay by ~40%.',
      expectedMetricGains: [
        { metric: 'Handoff Latency', targetValue: '-42%', baselineValue: 'Baseline', direction: 'decrease' },
        { metric: 'Search & Sync Time Overhead', targetValue: '0.4 hrs/day', baselineValue: '2.1 hrs/day', direction: 'decrease' },
        { metric: 'Source-of-Truth Trust Score', targetValue: '92%', baselineValue: '35%', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'w-1',
          stepNumber: 1,
          type: 'trigger',
          title: 'Intake Submission Form',
          tool: 'Tally / Typeform',
          toolCategory: 'forms',
          description: 'Requester submits task urgency, specifications, and desired milestones.',
          configDetails: 'Trigger on form submit -> Validate required parameters.',
          iconName: 'FileText'
        },
        {
          id: 'w-2',
          stepNumber: 2,
          type: 'storage',
          title: 'Create Master Database Record',
          tool: 'Airtable',
          toolCategory: 'database',
          description: 'Auto-generates indexed ticket with dynamic SLA timestamp.',
          configDetails: 'Upsert record with initial Status = "In Review".',
          iconName: 'Database'
        },
        {
          id: 'w-3',
          stepNumber: 3,
          type: 'router',
          title: 'Conditional Webhook Routing',
          tool: 'Make.com',
          toolCategory: 'automation',
          description: 'Routes request to specific project boards and notifies department lead.',
          configDetails: 'If priority == "High", alert on-call lead in Slack.',
          iconName: 'GitBranch'
        },
        {
          id: 'w-4',
          stepNumber: 4,
          type: 'notification',
          title: 'Ephemeral Requester Confirmation',
          tool: 'Slack Bot',
          toolCategory: 'communication',
          description: 'Broadcasts tracking card with 1-click status lookup.',
          configDetails: 'Post interactive card with live Airtable URL.',
          iconName: 'Bell'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Publish Central Intake Form',
          tool: 'Tally / Typeform',
          action: 'Establish mandatory intake criteria to filter incomplete requests before they hit teams.',
          configurationTip: 'Use hidden fields to automatically capture user email and department.'
        },
        {
          stepNumber: 2,
          title: 'Configure Central Airtable Master Hub',
          tool: 'Airtable',
          action: 'Set up automated Kanban views for team leads and calendar views for executive roadmaps.',
          configurationTip: 'Lock down master field edits using Airtable Interface Designer.'
        },
        {
          stepNumber: 3,
          title: 'Activate Bi-Directional Zapier/Make Scenario',
          tool: 'Make.com',
          action: 'Sync status changes in Airtable directly back into the requester Slack thread.',
          configurationTip: 'Enforce a 48h SLA timer with automated nudges.'
        }
      ],
      raciMatrix: {
        responsible: 'Operations Lead & Systems Manager',
        accountable: 'Head of Product / VP Engineering',
        consulted: 'Cross-functional Department Leads',
        informed: 'All Team Members'
      },
      changeManagementGuide: [
        'Roll out the SSoT portal with a short 2-minute video walkthrough.',
        'Enforce a friendly "Ticket Link First" guideline across public Slack channels.'
      ]
    });
  }

  // Check for Archetype B: Feedback Latency & Recognition Gap
  const feedbackGapItems = feedbackItems.filter(f => f.odFrameworkMapping.mckinsey7s === 'Style' || f.odFrameworkMapping.mckinsey7s === 'Shared Values' || f.dominantTheme.includes('Recognition') || f.dominantTheme.includes('Review') || f.dominantTheme.includes('Isolation'));
  if (feedbackGapItems.length > 0) {
    const fId = 'fric-gen-2';
    const sId = 'strat-gen-2';
    frictionPoints.push({
      id: fId,
      title: 'Feedback Latency & Recognition Deficit',
      archetype: 'Archetype B: Feedback Latency & Recognition Gap',
      severity: feedbackGapItems.some(i => i.intensity === 'Severe') ? 'Critical' : 'Elevated',
      rootCause: 'Peer contributions and daily wins go unnoticed due to episodic annual review cycles and lack of real-time recognition mechanisms.',
      odContext: 'Disconnect in Management Practices, Work Unit Climate, and Intrinsic Motivation.',
      affectedDepartments: Array.from(new Set(feedbackGapItems.map(i => i.department))),
      signalsCount: feedbackGapItems.length,
      evidenceQuotes: feedbackGapItems.slice(0, 3).map(i => i.text),
      frameworkAttribution: {
        mckinsey: 'Style & Shared Values',
        burkeLitwin: 'Work Unit Climate & Motivation'
      },
      strategyId: sId
    });

    strategies.push({
      id: sId,
      frictionPointId: fId,
      title: 'Continuous Peer Recognition & Shared Value Loop',
      archetype: 'Archetype B: Feedback Latency & Recognition Gap',
      summary: 'Implement a Slack/Teams `/kudos` command tagging core organizational values, recorded in Google Sheets/Airtable, and summarized in monthly Looker Studio digests.',
      targetTools: [
        { name: 'Slack Custom Command', role: 'Frictionless Peer Capture', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { name: 'Make.com', role: 'Core Value Classifier', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        { name: 'Google Sheets / Airtable', role: 'Recognition Archive', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { name: 'Looker Studio', role: 'Cultural Health Dashboard', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
      ],
      implementationComplexity: 'Low (1-2 days)',
      timeline: '24 Hours to Deploy',
      estimatedImpact: 'Converts episodic annual reviews into continuous micro-validations, increasing retention by up to 27%.',
      expectedMetricGains: [
        { metric: 'Peer Recognition Frequency', targetValue: '15+ / person / quarter', baselineValue: '< 1 / quarter', direction: 'increase' },
        { metric: 'Voluntary Turnover Risk', targetValue: '-27%', baselineValue: 'Baseline', direction: 'decrease' },
        { metric: 'Work Unit Climate NPS', targetValue: '+52 NPS', baselineValue: '-8 NPS', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'w-21',
          stepNumber: 1,
          type: 'trigger',
          title: 'Slack Kudos Submission',
          tool: 'Slack',
          toolCategory: 'communication',
          description: 'Team member sends `/kudos @peer #CoreValue Great rescue on the API outage!`',
          configDetails: 'Trigger modal or slash command in any public or private channel.',
          iconName: 'Heart'
        },
        {
          id: 'w-22',
          stepNumber: 2,
          type: 'filter',
          title: 'Value Tag Extraction & Parsing',
          tool: 'Make.com',
          toolCategory: 'automation',
          description: 'Parses value hashtag, tags manager, and logs into spreadsheet.',
          configDetails: 'Regex extraction for core value hashtags.',
          iconName: 'Filter'
        },
        {
          id: 'w-23',
          stepNumber: 3,
          type: 'notification',
          title: 'Public #kudos Channel Broadcast',
          tool: 'Slack Channel',
          toolCategory: 'communication',
          description: 'Posts celebratory card and delivers direct congratulatory DM to recipient.',
          configDetails: 'Slack Webhook with animated celebration emoji.',
          iconName: 'Award'
        },
        {
          id: 'w-24',
          stepNumber: 4,
          type: 'storage',
          title: 'Update Looker Studio Cultural Matrix',
          tool: 'Google Sheets / Looker',
          toolCategory: 'bi_analytics',
          description: 'Records metric for quarterly talent reviews and culture champion spotlights.',
          configDetails: 'Live connection to Looker Studio report.',
          iconName: 'BarChart3'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Build Slack Kudos Workflow / Slash Command',
          tool: 'Slack Workflow Builder',
          action: 'Create a 30-second form with Recipient, Shared Value dropdown, and message.',
          configurationTip: 'Pin the workflow shortcut to top channels like #general and #announcements.'
        },
        {
          stepNumber: 2,
          title: 'Connect Make.com Scenario to Google Sheets',
          tool: 'Make.com + Google Sheets',
          action: 'Log timestamp, giver, receiver, value tag, and message.',
          configurationTip: 'Send a private copy to the direct manager so they can mention it in 1-on-1s.'
        },
        {
          stepNumber: 3,
          title: 'Publish Monthly Looker Studio Recognition Summary',
          tool: 'Looker Studio',
          action: 'Showcase top praised behaviors and cross-team collaboration bridges.',
          configurationTip: 'Incorporate these insights into quarterly performance calibrations.'
        }
      ],
      raciMatrix: {
        responsible: 'People Operations Specialist',
        accountable: 'Head of People / Chief Human Resources Officer',
        consulted: 'Department Heads & Team Leads',
        informed: 'All Employees'
      },
      changeManagementGuide: [
        'Seed early kudos from executives during the first week to set cultural precedent.',
        'Celebrate high-impact kudos during the monthly all-hands.'
      ]
    });
  }

  // Check for Archetype C: Decision Paralysis
  const decisionItems = feedbackItems.filter(f => f.odFrameworkMapping.mckinsey7s === 'Structure' || f.dominantTheme.includes('Approval') || f.dominantTheme.includes('Decision') || f.dominantTheme.includes('Bottleneck'));
  if (decisionItems.length > 0) {
    const fId = 'fric-gen-3';
    const sId = 'strat-gen-3';
    frictionPoints.push({
      id: fId,
      title: 'Decision Paralysis & Approval Hierarchy Friction',
      archetype: 'Archetype C: Decision Paralysis & Process Friction',
      severity: 'Elevated',
      rootCause: 'Complex multi-tiered manual approval chains cause project stagnation and owner disengagement.',
      odContext: 'Structural rigidity, excessive hierarchy, and risk-averse leadership style.',
      affectedDepartments: Array.from(new Set(decisionItems.map(i => i.department))),
      signalsCount: decisionItems.length,
      evidenceQuotes: decisionItems.slice(0, 3).map(i => i.text),
      frameworkAttribution: {
        mckinsey: 'Structure & Style',
        burkeLitwin: 'Structure & Management Practices'
      },
      strategyId: sId
    });

    strategies.push({
      id: sId,
      frictionPointId: fId,
      title: 'Automated Human-in-the-Loop Approval & Escalation Bot',
      archetype: 'Archetype C: Decision Paralysis & Process Friction',
      summary: 'Implement conditional approval pipelines in Monday.com/Airtable with 1-click Slack decision cards and 24-hour auto-escalation nudge bots.',
      targetTools: [
        { name: 'Monday.com / Airtable', role: 'Approval Matrix Board', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        { name: 'Jotform / Fillout', role: 'Standardized Signoff Intake', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        { name: 'Slack Bot', role: '1-Click Interactive Decision Card', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { name: 'Make.com', role: '24h Timer & Escalation Bot', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' }
      ],
      implementationComplexity: 'Medium (3-5 days)',
      timeline: '3-5 Days to Deployment',
      estimatedImpact: 'Democratizes decision rights, cutting approval cycle times from weeks to under 24 hours.',
      expectedMetricGains: [
        { metric: 'Approval Resolution Turnaround', targetValue: '< 18 hrs', baselineValue: '9.2 days', direction: 'decrease' },
        { metric: 'Stalled Project Escalations', targetValue: '-75%', baselineValue: 'Baseline', direction: 'decrease' },
        { metric: 'Employee Process Velocity Rating', targetValue: '86%', baselineValue: '32%', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'w-31',
          stepNumber: 1,
          type: 'trigger',
          title: 'Decision Request Ingestion',
          tool: 'Jotform / Fillout',
          toolCategory: 'forms',
          description: 'Requester fills decision scope, cost tier, and required timeline.',
          configDetails: 'Computes approval tier automatically based on delegation rules.',
          iconName: 'Send'
        },
        {
          id: 'w-32',
          stepNumber: 2,
          type: 'router',
          title: 'Signer Tier Dispatcher',
          tool: 'Monday.com / Airtable',
          toolCategory: 'database',
          description: 'Identifies sole designated approver; dispatches interactive Slack block.',
          configDetails: 'Assigns approval ticket with expiration countdown.',
          iconName: 'Sliders'
        },
        {
          id: 'w-33',
          stepNumber: 3,
          type: 'action',
          title: '1-Click Slack Decision',
          tool: 'Slack Interactive Card',
          toolCategory: 'communication',
          description: 'Approver taps [Approve] or [Decline with Note] directly from Slack.',
          configDetails: 'Button triggers instant webhook callback.',
          iconName: 'CheckCircle2'
        },
        {
          id: 'w-34',
          stepNumber: 4,
          type: 'notification',
          title: '24h Automated Nudge & Backup Escalation',
          tool: 'Make.com Cron',
          toolCategory: 'automation',
          description: 'Sends polite reminder at 24 hrs; routes to backup delegate at 48 hrs.',
          configDetails: 'Scheduled scenario checking pending approvals.',
          iconName: 'Clock'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Establish Clear Delegation of Authority (DoA)',
          tool: 'Notion / Coda Policy',
          action: 'Eliminate dual signoffs for expenses under $1,000 and routine architecture spikes.',
          configurationTip: 'Publish explicit criteria for when approvals are and are not required.'
        },
        {
          stepNumber: 2,
          title: 'Set up Monday.com / Airtable Pipeline with Slack Webhook',
          tool: 'Monday.com + Slack',
          action: 'Create the interactive card enabling instant 1-tap signoff on mobile or desktop.',
          configurationTip: 'Allow approvers to ask clarifying questions directly in the Slack thread.'
        },
        {
          stepNumber: 3,
          title: 'Activate Auto-Nudge & Escalation Schedule',
          tool: 'Make.com',
          action: 'Program an automated 24-hour reminder to keep cycle times under 1 day.',
          configurationTip: 'Log turnaround metrics on leadership scorecards.'
        }
      ],
      raciMatrix: {
        responsible: 'Business Operations Manager',
        accountable: 'VP of Operations / CFO',
        consulted: 'Department Directors',
        informed: 'All Team Members'
      },
      changeManagementGuide: [
        'Brief managers on mobile 1-tap approvals.',
        'Review quarterly approval latency charts to identify organizational bottlenecks.'
      ]
    });
  }

  // Generate Executive Summary Text
  const topArchetype = frictionPoints.length > 0 ? frictionPoints[0].archetype : 'Archetype A: Information Asymmetry & Silos';
  const execSummary = `Diagnostic of ${total} workforce feedback signals reveals dominant organizational friction centered in ${mckinsey7s.filter(m => m.status === 'Critical Friction').map(m => m.dimension).join(' and ') || 'Systems and Structure'}. Primary friction archetype identified is ${topArchetype}. Deploying targeted No-Code operational systems (SSoT Intake, Continuous Recognition, and Human-in-the-Loop Approval Automations) provides immediate remediation without engineering overhead, projected to lower handoff latency by 40% and improve employee sentiment valence from ${avgValence} to +0.35.`;

  return {
    id: `analysis-${Date.now()}`,
    title: customTitle || 'Organizational Development Diagnostic & No-Code Strategy Map',
    generatedAt: new Date().toISOString(),
    datasetType: customTitle || 'Custom Unstructured Feedback Ingestion',
    totalSignals: total,
    overallSentimentScore: avgValence,
    sentimentDistribution: {
      positive: posPct,
      neutral: neutPct,
      frustration: frustPct,
      exhaustion: exhaustPct,
      disengagement: disengPct
    },
    executiveSummary: execSummary,
    dominantThemes,
    mckinsey7s,
    burkeLitwin,
    frictionPoints,
    strategies,
    rawFeedbackItems: feedbackItems
  };
}

function get7SSummary(dimension: McKinsey7SDiagnostic['dimension'], score: number): string {
  if (score < 40) {
    if (dimension === 'Structure') return 'Severe decision ambiguity, redundant approval tiers, and blurred responsibility lines.';
    if (dimension === 'Systems') return 'Tool sprawl, unlinked databases, and manual data reconciliation causing acute cognitive fatigue.';
    if (dimension === 'Style') return 'Episodic top-down management with notable feedback latency and communication lag.';
    if (dimension === 'Shared Values') return 'Disconnect between stated corporate values and day-to-day peer recognition/promotion practices.';
    if (dimension === 'Strategy') return 'Roadmap destabilization from unvetted commitments and ad-hoc emergency requests.';
    if (dimension === 'Staff') return 'High burnout risk and disengagement vulnerability.';
    if (dimension === 'Skills') return 'Lack of automated process literacy creating manual execution bottlenecks.';
  }
  if (score < 60) {
    return `${dimension} operates with moderate friction; opportunities exist to standardize workflows and clarify expectations.`;
  }
  return `${dimension} demonstrates healthy operational stability and strong alignment with organizational objectives.`;
}

function get7SGaps(dimension: McKinsey7SDiagnostic['dimension'], items: FeedbackItem[]): string[] {
  if (items.length === 0) return ['No active gaps flagged in current dataset.'];
  const gaps: string[] = [];
  items.forEach(i => {
    if (i.extractedKeywords.length > 0) {
      gaps.push(`${i.extractedKeywords.slice(0, 2).join(' ')} friction`);
    }
  });
  return Array.from(new Set(gaps)).slice(0, 3);
}

export function simulateInterventions(
  baselineAnalysis: ODAnalysisResult,
  activeInterventions: { id: string; intensityPercent: number; active: boolean }[]
) {
  let valenceBoost = 0;
  let handoffHoursReduction = 0;
  let meetingHoursReduction = 0;
  let retentionMitigation = 0;
  let activeCount = 0;

  activeInterventions.forEach(item => {
    if (!item.active) return;
    activeCount++;
    const factor = (item.intensityPercent || 100) / 100;

    if (item.id === 'strat-1' || item.id === 'strat-gen-1') {
      valenceBoost += 0.38 * factor;
      handoffHoursReduction += 24.3 * factor;
      meetingHoursReduction += 2.7 * factor;
      retentionMitigation += 16.5 * factor;
    } else if (item.id === 'strat-2' || item.id === 'strat-gen-2') {
      valenceBoost += 0.42 * factor;
      retentionMitigation += 27.0 * factor;
      meetingHoursReduction += 0.8 * factor;
    } else if (item.id === 'strat-3' || item.id === 'strat-gen-3') {
      valenceBoost += 0.31 * factor;
      handoffHoursReduction += 12.0 * factor;
      meetingHoursReduction += 1.9 * factor;
      retentionMitigation += 12.0 * factor;
    } else {
      valenceBoost += 0.25 * factor;
      handoffHoursReduction += 8.0 * factor;
      meetingHoursReduction += 1.2 * factor;
      retentionMitigation += 10.0 * factor;
    }
  });

  const projectedValence = Math.min(0.85, Math.round((baselineAnalysis.overallSentimentScore + valenceBoost) * 100) / 100);
  const alignmentScore = Math.min(96, Math.round(52 + (valenceBoost * 50)));

  const insights: string[] = [];
  if (activeCount === 0) {
    insights.push("No active no-code interventions selected. Organization remains at baseline friction state.");
  } else {
    insights.push(`Activating ${activeCount} no-code operational lever(s) shifts organizational valence from ${baselineAnalysis.overallSentimentScore.toFixed(2)} to ${projectedValence.toFixed(2)}.`);
    if (handoffHoursReduction > 0) {
      insights.push(`Projected cross-team handoff latency reduction of ~${handoffHoursReduction.toFixed(1)} hours per workflow cycle.`);
    }
    if (meetingHoursReduction > 0) {
      insights.push(`Reclaims approximately ${meetingHoursReduction.toFixed(1)} hours of recurring meeting overhead per employee per week.`);
    }
    if (retentionMitigation > 0) {
      insights.push(`Reduces voluntary turnover and flight risk by an estimated ${retentionMitigation.toFixed(1)}%.`);
    }
  }

  return {
    baselineSentimentValence: baselineAnalysis.overallSentimentScore,
    projectedSentimentValence: projectedValence,
    projectedHandoffLatencyReductionHours: Math.round(handoffHoursReduction * 10) / 10,
    projectedMeetingOverheadReductionHoursWeekly: Math.round(meetingHoursReduction * 10) / 10,
    projectedRetentionRiskMitigationPercent: Math.round(retentionMitigation * 10) / 10,
    projectedTeamAlignmentScore: alignmentScore,
    activeInterventionsCount: activeCount,
    causalInsights: insights
  };
}
