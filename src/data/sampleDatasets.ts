import { 
  ODAnalysisResult, 
  FeedbackItem, 
  FrictionPoint, 
  NoCodeStrategy, 
  ThemeCluster, 
  McKinsey7SDiagnostic, 
  BurkeLitwinDiagnostic,
  ADKARDiagnostic,
  DatasetPreset
} from '../types/od';

export const TECH_SCALEUP_FEEDBACK: FeedbackItem[] = [
  {
    id: 'ts-1',
    text: "I never know who is truly responsible for the checkout service architecture decision. We spent 3 weeks in debate because Product thought Tech Lead owned it, but Engineering VP had veto power.",
    source: 'Quarterly Pulse Survey',
    department: 'Engineering',
    sentimentValence: -0.78,
    intensity: 'High',
    primaryEmotion: 'Frustration',
    dominantTheme: 'Decision Ambiguity & Ownership',
    odFrameworkMapping: {
      mckinsey7s: 'Structure',
      burkeLitwin: 'Structure',
      adkar: 'Awareness'
    },
    extractedKeywords: ['decision', 'architecture', 'ownership', 'veto', 'debate']
  },
  {
    id: 'ts-2',
    text: "We use three different tools (Jira, Linear, and a Google Spreadsheet) to track the exact same mobile initiative. Every Monday I spend 2 hours reconciling tickets.",
    source: 'Quarterly Pulse Survey',
    department: 'Product & Design',
    sentimentValence: -0.65,
    intensity: 'Moderate',
    primaryEmotion: 'Exhaustion',
    dominantTheme: 'Tool Fatigue & Redundant Tracking',
    odFrameworkMapping: {
      mckinsey7s: 'Systems',
      burkeLitwin: 'Systems',
      adkar: 'Ability'
    },
    extractedKeywords: ['tool fatigue', 'Jira', 'Linear', 'reconciling', 'inefficiency']
  },
  {
    id: 'ts-3',
    text: "My manager only talks to me during my yearly performance review. I have no idea if my sprint contributions are on track or where my career progression stands.",
    source: '1-on-1 Notes',
    department: 'Customer Support',
    sentimentValence: -0.82,
    intensity: 'High',
    primaryEmotion: 'Disengagement',
    dominantTheme: 'Feedback Latency & Manager Isolation',
    odFrameworkMapping: {
      mckinsey7s: 'Style',
      burkeLitwin: 'Management Practices',
      adkar: 'Desire'
    },
    extractedKeywords: ['manager', 'yearly review', 'career progression', 'isolation', 'feedback latency']
  },
  {
    id: 'ts-4',
    text: "I see my peers doing incredible midnight troubleshooting and customer saves, but it goes completely unnoticed because leadership only reads revenue metrics.",
    source: 'Slack / Teams Message',
    department: 'Customer Support',
    sentimentValence: -0.71,
    intensity: 'Moderate',
    primaryEmotion: 'Cultural Erosion',
    dominantTheme: 'Recognition Gap & Invisible Impact',
    odFrameworkMapping: {
      mckinsey7s: 'Shared Values',
      burkeLitwin: 'Work Unit Climate',
      adkar: 'Reinforcement'
    },
    extractedKeywords: ['unnoticed', 'recognition', 'troubleshooting', 'morale', 'leadership disconnect']
  },
  {
    id: 'ts-5',
    text: "Sales promises features to enterprise leads that are not on our roadmap. Then Engineering gets pulled into emergency fire drills without prior intake validation.",
    source: 'All-Hands Q&A',
    department: 'Engineering',
    sentimentValence: -0.74,
    intensity: 'High',
    primaryEmotion: 'Frustration',
    dominantTheme: 'Cross-functional Siloing & Intake Chaos',
    odFrameworkMapping: {
      mckinsey7s: 'Strategy',
      burkeLitwin: 'Mission/Strategy',
      adkar: 'Awareness'
    },
    extractedKeywords: ['roadmap', 'sales promises', 'emergency fire drills', 'intake', 'silo']
  },
  {
    id: 'ts-6',
    text: "Getting a $500 software subscription approved takes 5 signatures across 3 departments and over 14 days of waiting in an email thread.",
    source: 'Quarterly Pulse Survey',
    department: 'Operations & HR',
    sentimentValence: -0.69,
    intensity: 'Moderate',
    primaryEmotion: 'Ambiguity',
    dominantTheme: 'Approval Bottlenecks & Bureaucracy',
    odFrameworkMapping: {
      mckinsey7s: 'Structure',
      burkeLitwin: 'Structure',
      adkar: 'Ability'
    },
    extractedKeywords: ['approval', 'signatures', 'waiting', 'email thread', 'bottleneck']
  },
  {
    id: 'ts-7',
    text: "Cross-team handoffs between Design and Front-End feel like throwing assets over a brick wall. Figma comments get lost and specifications change without notifications.",
    source: '1-on-1 Notes',
    department: 'Product & Design',
    sentimentValence: -0.62,
    intensity: 'Moderate',
    primaryEmotion: 'Frustration',
    dominantTheme: 'Handoff Information Asymmetry',
    odFrameworkMapping: {
      mckinsey7s: 'Systems',
      burkeLitwin: 'Systems',
      adkar: 'Knowledge'
    },
    extractedKeywords: ['handoff', 'Figma', 'brick wall', 'specifications', 'notifications']
  },
  {
    id: 'ts-8',
    text: "Our core values are plastered on the website, but promotions always go to loud political voices rather than consistent quiet deliverers.",
    source: 'Exit Interview',
    department: 'Engineering',
    sentimentValence: -0.85,
    intensity: 'Severe',
    primaryEmotion: 'Cultural Erosion',
    dominantTheme: 'Values Incongruence & Merit Disconnect',
    odFrameworkMapping: {
      mckinsey7s: 'Shared Values',
      burkeLitwin: 'Culture',
      adkar: 'Desire'
    },
    extractedKeywords: ['core values', 'promotions', 'politics', 'merit', 'erosion']
  },
  {
    id: 'ts-9',
    text: "Love the team spirit and camaraderie within our pod, but our velocity is bottlenecked by manual spreadsheet deployments and lack of automated alerts.",
    source: 'Quarterly Pulse Survey',
    department: 'Engineering',
    sentimentValence: 0.15,
    intensity: 'Low',
    primaryEmotion: 'Constructive Suggestion',
    dominantTheme: 'Manual Tooling Friction',
    odFrameworkMapping: {
      mckinsey7s: 'Systems',
      burkeLitwin: 'Systems',
      adkar: 'Ability'
    },
    extractedKeywords: ['team spirit', 'velocity', 'spreadsheet', 'automation', 'alerts']
  },
  {
    id: 'ts-10',
    text: "When a customer escalates a critical bug, it takes 4 hours just to find who is on-call because PagerDuty isn't synced with our team roster in Slack.",
    source: 'Quarterly Pulse Survey',
    department: 'Customer Support',
    sentimentValence: -0.73,
    intensity: 'High',
    primaryEmotion: 'Exhaustion',
    dominantTheme: 'Context Silos & Incident Escalation',
    odFrameworkMapping: {
      mckinsey7s: 'Systems',
      burkeLitwin: 'Systems',
      adkar: 'Knowledge'
    },
    extractedKeywords: ['escalation', 'on-call', 'PagerDuty', 'sync', 'incident']
  }
];

export const DATASET_PRESETS: DatasetPreset[] = [
  {
    id: 'tech_scaleup',
    name: 'Tech Scale-Up (Hypergrowth & Process Friction)',
    industry: 'Software & Technology',
    headcount: '250-500 employees',
    description: 'Rapid hiring resulting in blurred ownership, tool fragmentation across Product/Eng, and feedback latency.',
    feedbackItems: TECH_SCALEUP_FEEDBACK
  },
  {
    id: 'remote_first',
    name: 'Remote-First Distributed Network (Async Silos)',
    industry: 'Digital Agency & Consulting',
    headcount: '120 employees',
    description: 'Timezone isolation, async document fragmentation, invisible contributions, and delayed project sign-offs.',
    feedbackItems: [
      {
        id: 'rf-1',
        text: "Because we work across 7 timezones, questions asked in Slack sit unanswered for 14 hours. We need a standardized async decision log.",
        source: 'Quarterly Pulse Survey',
        department: 'Product & Design',
        sentimentValence: -0.68,
        intensity: 'Moderate',
        primaryEmotion: 'Frustration',
        dominantTheme: 'Async Decision Latency',
        odFrameworkMapping: { mckinsey7s: 'Systems', burkeLitwin: 'Systems', adkar: 'Ability' },
        extractedKeywords: ['timezones', 'Slack', 'async', 'decision log']
      },
      {
        id: 'rf-2',
        text: "Working remotely makes me feel like a freelancer punching keys in isolation. There is zero peer recognition or shared wins celebration.",
        source: 'Quarterly Pulse Survey',
        department: 'Engineering',
        sentimentValence: -0.81,
        intensity: 'High',
        primaryEmotion: 'Disengagement',
        dominantTheme: 'Recognition Invisibility & Isolation',
        odFrameworkMapping: { mckinsey7s: 'Shared Values', burkeLitwin: 'Work Unit Climate', adkar: 'Reinforcement' },
        extractedKeywords: ['remote', 'isolation', 'peer recognition', 'shared wins']
      },
      {
        id: 'rf-3',
        text: "Client project scopes live in Google Docs, tasks are in Asana, and budget hours are in Harvest. Nobody knows which is the real source of truth.",
        source: '1-on-1 Notes',
        department: 'Operations & HR',
        sentimentValence: -0.75,
        intensity: 'High',
        primaryEmotion: 'Ambiguity',
        dominantTheme: 'Multi-tool Truth Disconnect',
        odFrameworkMapping: { mckinsey7s: 'Systems', burkeLitwin: 'Systems', adkar: 'Knowledge' },
        extractedKeywords: ['source of truth', 'Google Docs', 'Asana', 'Harvest', 'budget']
      },
      {
        id: 'rf-4',
        text: "Our async retrospectives in Miro are great, but the action items always evaporate into thin air because they are never auto-assigned to boards.",
        source: 'Quarterly Pulse Survey',
        department: 'Engineering',
        sentimentValence: -0.42,
        intensity: 'Moderate',
        primaryEmotion: 'Constructive Suggestion',
        dominantTheme: 'Action Item Follow-through Gap',
        odFrameworkMapping: { mckinsey7s: 'Systems', burkeLitwin: 'Management Practices', adkar: 'Reinforcement' },
        extractedKeywords: ['retrospectives', 'action items', 'Miro', 'follow-through']
      }
    ]
  },
  {
    id: 'healthcare_ops',
    name: 'Healthcare Network & Clinical Ops (Frontline Handover)',
    industry: 'Healthcare Operations',
    headcount: '800 staff',
    description: 'Clinical shift handover information loss, manual paper scheduling bottlenecks, and managerial burnout.',
    feedbackItems: [
      {
        id: 'hc-1',
        text: "Shift handoffs between morning and night nurses rely on handwritten dry-erase boards. Critical patient status updates get wiped accidentally.",
        source: 'Quarterly Pulse Survey',
        department: 'Operations & HR',
        sentimentValence: -0.92,
        intensity: 'Severe',
        primaryEmotion: 'Frustration',
        dominantTheme: 'Handover Information Asymmetry',
        odFrameworkMapping: { mckinsey7s: 'Systems', burkeLitwin: 'Systems', adkar: 'Ability' },
        extractedKeywords: ['shift handoff', 'dry-erase', 'patient updates', 'safety']
      },
      {
        id: 'hc-2',
        text: "Shift swap requests require paper forms signed by two supervisors who are on different ward floors. It takes 4 days to swap one weekend shift.",
        source: '1-on-1 Notes',
        department: 'Operations & HR',
        sentimentValence: -0.77,
        intensity: 'High',
        primaryEmotion: 'Exhaustion',
        dominantTheme: 'Manual Approval Latency',
        odFrameworkMapping: { mckinsey7s: 'Structure', burkeLitwin: 'Management Practices', adkar: 'Ability' },
        extractedKeywords: ['shift swap', 'paper forms', 'supervisors', 'bottleneck']
      },
      {
        id: 'hc-3',
        text: "Frontline nursing staff work 14-hour emergency rotations but only hear from hospital admin when budget overtime violations are triggered.",
        source: 'Exit Interview',
        department: 'Customer Support',
        sentimentValence: -0.88,
        intensity: 'Severe',
        primaryEmotion: 'Cultural Erosion',
        dominantTheme: 'Feedback Latency & Punitive Focus',
        odFrameworkMapping: { mckinsey7s: 'Style', burkeLitwin: 'Leadership', adkar: 'Desire' },
        extractedKeywords: ['nursing staff', 'overtime', 'admin disconnect', 'punitive']
      }
    ]
  }
];

export const INITIAL_OD_ANALYSIS: ODAnalysisResult = {
  id: 'analysis-tech-scaleup-001',
  title: 'Tech Scale-Up Organizational Diagnostic & No-Code Strategy Map',
  generatedAt: new Date().toISOString(),
  datasetType: 'Tech Scale-Up (Hypergrowth & Process Friction)',
  totalSignals: TECH_SCALEUP_FEEDBACK.length,
  overallSentimentScore: -0.63,
  sentimentDistribution: {
    positive: 10,
    neutral: 15,
    frustration: 38,
    exhaustion: 22,
    disengagement: 15,
  },
  executiveSummary: "Organizational diagnostic reveals severe workforce friction concentrated in Organizational Systems (tool fragmentation, redundant tracking), Structure (blurred decision rights, multi-layer approval chains), and Work Unit Climate (feedback latency and recognition deficit). Addressing these with structured No-Code Operational Systems (SSoT Intake Bot, Real-time Kudos Loop, and Automated Approval Gates) will reduce handoff latency by ~40% and boost cross-team engagement by 28%.",
  dominantThemes: [
    {
      id: 'theme-1',
      name: 'Decision Ambiguity & Ownership Void',
      category: 'Organizational Structure',
      signalCount: 4,
      avgValence: -0.76,
      intensityLevel: 'High',
      keywords: ['ownership', 'decision rights', 'veto', 'architecture', 'responsibility'],
      sampleQuotes: [
        "I never know who is truly responsible for the checkout service architecture decision.",
        "Sales promises features without Engineering validation."
      ],
      primaryFramework: 'McKinsey 7S: Structure'
    },
    {
      id: 'theme-2',
      name: 'Tool Fragmentation & Duplicate Tracking',
      category: 'Organizational Systems',
      signalCount: 4,
      avgValence: -0.67,
      intensityLevel: 'High',
      keywords: ['Jira', 'Linear', 'Spreadsheet', 'reconciling', 'tool fatigue'],
      sampleQuotes: [
        "We use three different tools to track the exact same mobile initiative.",
        "Velocity is bottlenecked by manual spreadsheet deployments."
      ],
      primaryFramework: 'Burke-Litwin: Systems'
    },
    {
      id: 'theme-3',
      name: 'Feedback Latency & Recognition Deficit',
      category: 'Management Practices & Climate',
      signalCount: 3,
      avgValence: -0.79,
      intensityLevel: 'Severe',
      keywords: ['yearly review', 'unnoticed', 'recognition', 'manager feedback', 'isolation'],
      sampleQuotes: [
        "My manager only talks to me during my yearly performance review.",
        "I see my peers doing incredible saves, but it goes completely unnoticed."
      ],
      primaryFramework: 'McKinsey 7S: Style & Shared Values'
    },
    {
      id: 'theme-4',
      name: 'Process Bureaucracy & Approval Bottlenecks',
      category: 'Organizational Structure & Systems',
      signalCount: 2,
      avgValence: -0.71,
      intensityLevel: 'Moderate',
      keywords: ['5 signatures', '14 days waiting', 'email thread', 'bottleneck'],
      sampleQuotes: [
        "Getting a $500 subscription approved takes 5 signatures across 3 departments."
      ],
      primaryFramework: 'Burke-Litwin: Structure & Systems'
    }
  ],
  mckinsey7s: [
    {
      dimension: 'Structure',
      healthScore: 34,
      status: 'Critical Friction',
      summary: 'Decisions stall due to ambiguous RACI boundaries and convoluted approval hierarchies.',
      signalsCount: 4,
      dominantGaps: ['Ambiguous decision ownership', 'Excessive approval layers', 'Cross-silo handoff friction'],
      evidenceQuotes: ['"I never know who is truly responsible for X decision."', '"Getting a $500 subscription approved takes 5 signatures."']
    },
    {
      dimension: 'Systems',
      healthScore: 28,
      status: 'Critical Friction',
      summary: 'Tool proliferation and unlinked data stores force employees into manual sync tasks.',
      signalsCount: 5,
      dominantGaps: ['Tool sprawl (Jira + Linear + Sheets)', 'Handoff asymmetry', 'Manual escalation paths'],
      evidenceQuotes: ['"We use three different tools to track the exact same project."', '"Handoffs between Design and Dev feel like throwing over a wall."']
    },
    {
      dimension: 'Style',
      healthScore: 42,
      status: 'Needs Attention',
      summary: 'Leadership and management interactions suffer from feedback latency and episodic reviews.',
      signalsCount: 3,
      dominantGaps: ['Annual review latency', 'Top-down metric focus over frontline support'],
      evidenceQuotes: ['"My manager only talks to me during my yearly performance review."']
    },
    {
      dimension: 'Shared Values',
      healthScore: 38,
      status: 'Needs Attention',
      summary: 'Cultural disconnect between stated corporate values and day-to-day peer recognition.',
      signalsCount: 3,
      dominantGaps: ['Recognition gap', 'Values-promotions incongruence'],
      evidenceQuotes: ['"Peers doing great work goes unnoticed."', '"Core values on website differ from promotion practices."']
    },
    {
      dimension: 'Staff',
      healthScore: 61,
      status: 'Stable',
      summary: 'High frontline talent and peer willingness, but vulnerable to burnout and quiet quitting.',
      signalsCount: 2,
      dominantGaps: ['Burnout vulnerability', 'Context-switching fatigue'],
      evidenceQuotes: ['"Love the team spirit and camaraderie within our pod."']
    },
    {
      dimension: 'Skills',
      healthScore: 68,
      status: 'Stable',
      summary: 'Strong individual technical execution, hindered by operational workflow friction.',
      signalsCount: 2,
      dominantGaps: ['Lack of automated workflow literacy', 'Process handoff discipline'],
      evidenceQuotes: ['"Midnight troubleshooting and customer saves done expertly."']
    },
    {
      dimension: 'Strategy',
      healthScore: 52,
      status: 'Needs Attention',
      summary: 'Product strategy disrupted by ad-hoc sales commitments without intake filtering.',
      signalsCount: 2,
      dominantGaps: ['Sales-to-roadmap misalignment', 'Lack of unified intake gate'],
      evidenceQuotes: ['"Sales promises features not on our roadmap, creating emergency drills."']
    }
  ],
  burkeLitwin: [
    {
      factor: 'Structure',
      layer: 'Transactional',
      healthScore: 34,
      status: 'Critical Friction',
      summary: 'Unclear decision rights and multi-hop approvals create organizational gridlock.',
      signalsCount: 4,
      identifiedIssue: 'Decision ambiguity & approval latency'
    },
    {
      factor: 'Systems',
      layer: 'Transactional',
      healthScore: 28,
      status: 'Critical Friction',
      summary: 'Lack of integrated systems produces data asymmetry and high cognitive friction.',
      signalsCount: 5,
      identifiedIssue: 'Siloed tools (Jira, Linear, Sheets, Figma, Slack)'
    },
    {
      factor: 'Management Practices',
      layer: 'Transactional',
      healthScore: 40,
      status: 'Needs Attention',
      summary: 'Managers rely on delayed annual evaluations rather than real-time enablement loops.',
      signalsCount: 3,
      identifiedIssue: 'Feedback latency & episodic coaching'
    },
    {
      factor: 'Work Unit Climate',
      layer: 'Transactional',
      healthScore: 38,
      status: 'Needs Attention',
      summary: 'Day-to-day peer contributions lack visibility and structural recognition.',
      signalsCount: 3,
      identifiedIssue: 'Recognition deficit & invisible efforts'
    },
    {
      factor: 'Culture',
      layer: 'Transformational',
      healthScore: 48,
      status: 'Needs Attention',
      summary: 'Emerging cynicism around meritocracy and adherence to stated values.',
      signalsCount: 2,
      identifiedIssue: 'Cultural erosion from promotion politics'
    },
    {
      factor: 'Leadership',
      layer: 'Transformational',
      healthScore: 55,
      status: 'Stable',
      summary: 'Strategic vision clear at top, but operational execution levers missing downstream.',
      signalsCount: 2,
      identifiedIssue: 'Communication cascade gap'
    },
    {
      factor: 'Motivation',
      layer: 'Transactional',
      healthScore: 50,
      status: 'Needs Attention',
      summary: 'Employee intrinsic motivation dampened by friction in routine tasks.',
      signalsCount: 4,
      identifiedIssue: 'Frustration from administrative hurdles'
    },
    {
      factor: 'Mission/Strategy',
      layer: 'Transformational',
      healthScore: 58,
      status: 'Stable',
      summary: 'High-level mission is understood, but cross-functional intake boundaries blur priorities.',
      signalsCount: 2,
      identifiedIssue: 'Sales vs Product intake boundary'
    },
    {
      factor: 'Individual Needs',
      layer: 'Transactional',
      healthScore: 52,
      status: 'Stable',
      summary: 'Need for psychological safety and clear role expectations across teams.',
      signalsCount: 2,
      identifiedIssue: 'Clarity on career progression'
    }
  ],
  adkar: [
    {
      stage: 'Awareness',
      fullName: 'Awareness of the Need for Change',
      score: 54,
      status: 'Friction Gap',
      isBarrierPoint: true,
      summary: 'Strategic misalignment between Sales commitments and Product roadmaps leaves engineering unsure of priority reasons.',
      signalsCount: 3,
      workforceVoiceGaps: [
        'Unclear rationale for emergency sales commitments interrupting sprint roadmaps',
        'Ownership void leaves engineers guessing who holds final architectural authority'
      ],
      prescribedTactics: [
        'Executive Sponsor Roadshow with live interactive Slido Q&A',
        'Centralized Notion "Why We Are Changing" contextual hubs',
        '2-minute asynchronous Loom video walk-throughs from project champions'
      ],
      suggestedNoCodeTool: 'Notion PRD & Loom Executive Briefs',
      evidenceQuotes: [
        '"I never know who is truly responsible for the checkout service architecture decision."',
        '"Sales promises features to enterprise leads that are not on our roadmap."'
      ],
      readinessDimension: 'Cognitive'
    },
    {
      stage: 'Desire',
      fullName: 'Desire to Support & Participate in Change',
      score: 46,
      status: 'Critical Barrier',
      isBarrierPoint: false,
      summary: 'Desire dampened by perceptions of promotion politics and lack of personal recognition for consistent craftsmanship.',
      signalsCount: 2,
      workforceVoiceGaps: [
        'Cynicism around core values vs. political promotion practices',
        'Manager isolation creates feeling of working in transactional silos'
      ],
      prescribedTactics: [
        'Cross-functional co-design sessions to incorporate front-line input',
        'Highlight personal pain relief (e.g., cutting 2 hours of ticket reconciliation)',
        'Empower peer change champions across each impacted functional team'
      ],
      suggestedNoCodeTool: 'Slack Co-Design Channels & Typeform Pulse',
      evidenceQuotes: [
        '"Our core values are plastered on the website, but promotions always go to loud political voices."',
        '"My manager only talks to me during my yearly performance review."'
      ],
      readinessDimension: 'Motivational'
    },
    {
      stage: 'Knowledge',
      fullName: 'Knowledge on How to Change & Execute',
      score: 58,
      status: 'Friction Gap',
      isBarrierPoint: false,
      summary: 'Handoff documentation and operational directories are fragmented across Jira, Linear, Figma, and PagerDuty.',
      signalsCount: 2,
      workforceVoiceGaps: [
        'Figma comments lost during design-to-engineering handoffs without notification specs',
        'Critical incident responders struggle to identify on-call engineers during outages'
      ],
      prescribedTactics: [
        'Auto-generated step-by-step visual guides via Scribe/Tango',
        'Contextual tooltips embedded directly into Airtable/Monday fields',
        'Weekly 15-minute "Office Hours" and sandbox practice environments'
      ],
      suggestedNoCodeTool: 'Scribe / Tango Interactive SOPs & Guru Cards',
      evidenceQuotes: [
        '"Cross-team handoffs between Design and Front-End feel like throwing assets over a brick wall."',
        '"It takes 4 hours just to find who is on-call because PagerDuty isn\'t synced."'
      ],
      readinessDimension: 'Capability'
    },
    {
      stage: 'Ability',
      fullName: 'Ability to Implement New Skills & Behaviors',
      score: 36,
      status: 'Critical Barrier',
      isBarrierPoint: false,
      summary: 'Heavy operational overhead from reconciling 3 parallel tracking tools and navigating 5-signature approval gates blocks implementation.',
      signalsCount: 4,
      workforceVoiceGaps: [
        '2 hours every Monday spent manually reconciling tickets across Jira, Linear, and Spreadsheets',
        '14-day approval delays for basic $500 subscriptions across 3 departments'
      ],
      prescribedTactics: [
        'Eliminate manual data re-entry with Make.com event triggers',
        'Establish protected 2-hour weekly "process optimization" blocks',
        '1-on-1 coaching by designated operational enablement leads'
      ],
      suggestedNoCodeTool: 'Zapier / Make.com Automated Guardrails',
      evidenceQuotes: [
        '"We use three different tools to track the exact same mobile initiative."',
        '"Getting a $500 software subscription approved takes 5 signatures across 3 departments."'
      ],
      readinessDimension: 'Operational'
    },
    {
      stage: 'Reinforcement',
      fullName: 'Reinforcement to Sustain & Prevent Reversion',
      score: 41,
      status: 'Critical Barrier',
      isBarrierPoint: false,
      summary: 'Absence of continuous recognition loops leaves midnight troubleshooting unseen and leads teams to revert to shadow tools.',
      signalsCount: 2,
      workforceVoiceGaps: [
        'Heroic peer contributions go unnoticed due to lack of peer-kudos systems',
        'Process changes lack long-term telemetry dashboards to celebrate cycle time wins'
      ],
      prescribedTactics: [
        'Automate public Slack kudos cards celebrating team adoption milestones',
        'Live Looker Studio dashboard tracking cycle time drops and user adoption',
        'Incorporate process hygiene into quarterly performance calibrations'
      ],
      suggestedNoCodeTool: 'Slack Kudos Bot & Looker Studio Dashboards',
      evidenceQuotes: [
        '"I see my peers doing incredible midnight troubleshooting and customer saves, but it goes completely unnoticed."',
        '"Love the team spirit, but our velocity is bottlenecked by manual spreadsheets."'
      ],
      readinessDimension: 'Sustenance'
    }
  ],
  adkarBarrierPoint: 'Awareness',
  adkarOverallReadiness: 47,
  frictionPoints: [
    {
      id: 'fric-1',
      title: 'Information Asymmetry & Cross-Tool Silos',
      archetype: 'Archetype A: Information Asymmetry & Silos',
      severity: 'Critical',
      rootCause: 'Employees spend >20% of work hours searching for truth across Jira, Linear, and Spreadsheets with disjointed handoffs.',
      odContext: 'Severe failure in Organizational Systems and Cross-Functional Communication Flow.',
      affectedDepartments: ['Product & Design', 'Engineering', 'Operations & HR'],
      signalsCount: 5,
      evidenceQuotes: [
        "We use three different tools to track the same project.",
        "Handoffs feel like throwing assets over a brick wall.",
        "PagerDuty isn't synced with our team roster."
      ],
      frameworkAttribution: {
        mckinsey: 'Systems & Structure',
        burkeLitwin: 'Systems (Transactional Layer)'
      },
      strategyId: 'strat-1'
    },
    {
      id: 'fric-2',
      title: 'Feedback Latency & Recognition Deficit',
      archetype: 'Archetype B: Feedback Latency & Recognition Gap',
      severity: 'Critical',
      rootCause: 'Performance feedback is delayed to annual cadences, leaving top frontline contributions unseen by leadership.',
      odContext: 'Disconnect in Management Practices, Work Unit Climate, and Motivation.',
      affectedDepartments: ['Customer Support', 'Engineering', 'Sales & Marketing'],
      signalsCount: 4,
      evidenceQuotes: [
        "My manager only talks to me during my yearly review.",
        "Peers doing great work goes unnoticed by leadership."
      ],
      frameworkAttribution: {
        mckinsey: 'Style, Staff & Shared Values',
        burkeLitwin: 'Work Unit Climate & Management Practices'
      },
      strategyId: 'strat-2'
    },
    {
      id: 'fric-3',
      title: 'Decision Paralysis & Multi-Tier Approval Gridlock',
      archetype: 'Archetype C: Decision Paralysis & Process Friction',
      severity: 'Elevated',
      rootCause: 'Routine purchase and architecture decisions require 5+ manual signatures across email threads with no SLA timer.',
      odContext: 'Rigidity in Organizational Structure, Hierarchy, and Leadership Delegation Style.',
      affectedDepartments: ['Operations & HR', 'Engineering', 'Product & Design'],
      signalsCount: 3,
      evidenceQuotes: [
        "Getting a $500 subscription takes 5 signatures and 14 days.",
        "I never know who is responsible for checkout service decisions."
      ],
      frameworkAttribution: {
        mckinsey: 'Structure & Style',
        burkeLitwin: 'Structure & Management Practices'
      },
      strategyId: 'strat-3'
    },
    {
      id: 'fric-4',
      title: 'Cross-Functional Roadmapping Intake Void',
      archetype: 'Archetype D: Cross-Functional Misalignment',
      severity: 'Elevated',
      rootCause: 'Sales promises unvetted custom features to enterprise clients without an intake gate, destabilizing engineering sprints.',
      odContext: 'Misalignment between Strategy, Structure, and Inter-Departmental Systems.',
      affectedDepartments: ['Sales & Marketing', 'Engineering', 'Product & Design'],
      signalsCount: 2,
      evidenceQuotes: [
        "Sales promises features not on our roadmap, pulling Engineering into emergency drills."
      ],
      frameworkAttribution: {
        mckinsey: 'Strategy & Systems',
        burkeLitwin: 'Mission/Strategy & Systems'
      },
      strategyId: 'strat-4'
    }
  ],
  strategies: [
    {
      id: 'strat-1',
      frictionPointId: 'fric-1',
      title: 'Single Source of Truth (SSoT) Intake & Sync Engine',
      archetype: 'Archetype A: Information Asymmetry & Silos',
      summary: 'Centralize cross-departmental requests through standard Typeform/Tally intake, pipe records into Airtable SSoT, and automate bi-directional status pushes to Slack & Linear via Zapier/Make.',
      targetTools: [
        { name: 'Tally / Typeform', role: 'Standardized Intake Gate', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        { name: 'Airtable', role: 'Central Source of Truth Base', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        { name: 'Zapier / Make', role: 'Sync & Webhook Router', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        { name: 'Slack / Teams', role: 'Automated Status Broadcast', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
      ],
      implementationComplexity: 'Low (1-2 days)',
      timeline: '48 Hours to MVP Launch',
      estimatedImpact: 'Eliminates status update meetings and reduces cross-team handoff latency by 40%.',
      expectedMetricGains: [
        { metric: 'Cross-Department Handoff Latency', targetValue: '4.2 hrs', baselineValue: '28.5 hrs', direction: 'decrease' },
        { metric: 'Weekly Status Meeting Overhead', targetValue: '0.5 hrs/dev', baselineValue: '3.2 hrs/dev', direction: 'decrease' },
        { metric: 'Single-Source Data Fidelity Score', targetValue: '94%', baselineValue: '41%', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'node-1',
          stepNumber: 1,
          type: 'trigger',
          title: 'Structured Request Submission',
          tool: 'Tally / Typeform',
          toolCategory: 'forms',
          description: 'Stakeholder submits required fields (Business Justification, Priority, Target Date, Attachments).',
          configDetails: 'Trigger on form submit -> Validate required payload fields.',
          iconName: 'FileText'
        },
        {
          id: 'node-2',
          stepNumber: 2,
          type: 'storage',
          title: 'Log in Central SSoT Base',
          tool: 'Airtable',
          toolCategory: 'database',
          description: 'Automatically creates record in "Master Product Intake" table with Status = "Under Review".',
          configDetails: 'Upsert record in Airtable: Assign unique UUID & auto-tag department.',
          iconName: 'Database'
        },
        {
          id: 'node-3',
          stepNumber: 3,
          type: 'router',
          title: 'Conditional Routing by Department',
          tool: 'Make.com / Zapier',
          toolCategory: 'automation',
          description: 'Evaluates project category (Engineering vs Design vs Operations) and routes to lead review channel.',
          configDetails: 'If department == "Eng", create Linear ticket; If "Design", post to #design-intake.',
          iconName: 'GitBranch'
        },
        {
          id: 'node-4',
          stepNumber: 4,
          type: 'notification',
          title: 'Bi-Directional Slack Notification',
          tool: 'Slack Bot',
          toolCategory: 'communication',
          description: 'Sends requester a direct confirmation card with ticket ID + live status link.',
          configDetails: 'Post ephemeral Slack block message with live Airtable Record URL.',
          iconName: 'Bell'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Build Standardized Intake Schema in Tally/Typeform',
          tool: 'Tally / Typeform',
          action: 'Create a 5-question intake form requiring: Requester Email, Department, Deliverable Scope, Urgency Tier, and Success Criteria.',
          configurationTip: 'Enable conditional logic so technical requests require API specs while marketing requests require creative briefs.'
        },
        {
          stepNumber: 2,
          title: 'Establish Centralized Master Intake Base in Airtable',
          tool: 'Airtable',
          action: 'Create a schema with fields: Request_ID, Title, Requester, Department, Priority, Status (Single Select), Owner, Linear_ID, SLA_Deadline.',
          configurationTip: 'Create Kanban views grouped by Status and Calendar views grouped by SLA_Deadline.',
          samplePayload: `{ "Name": "Checkout V2 Spec", "Department": "Product", "Priority": "High", "Status": "In Review" }`
        },
        {
          stepNumber: 3,
          title: 'Configure Make.com / Zapier Multi-Branch Scenario',
          tool: 'Make.com',
          action: 'Create Webhook Trigger from Tally -> Airtable "Create Record" -> Slack "Post Message to Channel" with interactive buttons (Approve / Reject).',
          configurationTip: 'Store the Slack Message TS in Airtable so future status changes update the original Slack thread automatically.'
        },
        {
          stepNumber: 4,
          title: 'Deprecate Ad-Hoc Email & DM Request Channels',
          tool: 'Slack Workflow Builder',
          action: 'Set up an auto-responder in #eng-requests: "All requests must flow through the SSoT Intake Portal [Link]".',
          configurationTip: 'Enforce a 48-hour SLA response guarantee to build stakeholder trust in the new system.'
        }
      ],
      raciMatrix: {
        responsible: 'Operations Lead & Technical Project Manager',
        accountable: 'Head of Product & VP of Engineering',
        consulted: 'Department Stakeholders & Design Leads',
        informed: 'All Employees submitting cross-team requests'
      },
      changeManagementGuide: [
        'Announce the SSoT Intake Engine at the Monday All-Hands with a 2-minute live demo.',
        'Implement a strict "No Ticket, No Work" rule gently reinforced with standardized Slack auto-replies.',
        'Review intake cycle time weekly during leadership standups to celebrate speed improvements.'
      ]
    },
    {
      id: 'strat-2',
      frictionPointId: 'fric-2',
      title: 'Continuous Real-Time Recognition & Value-Tagging Loop',
      archetype: 'Archetype B: Feedback Latency & Recognition Gap',
      summary: 'Deploy an automated Slack `/kudos` command tied to company Shared Values, logged to Google Sheets/Airtable, with bi-weekly Looker Studio visual cultural leaderboards and manager digests.',
      targetTools: [
        { name: 'Slack Custom Slash Command', role: 'Frictionless Ingestion', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { name: 'Make.com', role: 'Shared Value Parser & Logger', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        { name: 'Google Sheets / Airtable', role: 'Recognition Repository', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { name: 'Looker Studio', role: 'Executive Cultural Dashboard', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
      ],
      implementationComplexity: 'Low (1-2 days)',
      timeline: '24 Hours to Live Deployment',
      estimatedImpact: 'Shifts organizational feedback from episodic annual cycles to continuous real-time validation, increasing retention by 27%.',
      expectedMetricGains: [
        { metric: 'Peer Recognition Frequency', targetValue: '18 kudos/person/quarter', baselineValue: '0.8 kudos/person/quarter', direction: 'increase' },
        { metric: 'Employee Retention Risk Score', targetValue: '8.5% High Risk', baselineValue: '28.4% High Risk', direction: 'decrease' },
        { metric: 'Work Unit Climate Net Score', targetValue: '+48 NPS', baselineValue: '-12 NPS', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'node-201',
          stepNumber: 1,
          type: 'trigger',
          title: 'Slack Kudos Command / Workflow',
          tool: 'Slack',
          toolCategory: 'communication',
          description: 'Employee triggers `/kudos @teammate #CustomerFirst Saved the weekend deploy!`',
          configDetails: 'Slack Slash Command or Modal Form triggered anywhere in workspace.',
          iconName: 'Heart'
        },
        {
          id: 'node-202',
          stepNumber: 2,
          type: 'filter',
          title: 'Value Tag Extraction & NLP Scoring',
          tool: 'Make.com',
          toolCategory: 'automation',
          description: 'Extracts mentions, hashtagged company core values (#Ownership, #CustomerFirst, #Velocity), and sentiment intensity.',
          configDetails: 'Regex parser + JSON payload validator.',
          iconName: 'Filter'
        },
        {
          id: 'node-203',
          stepNumber: 3,
          type: 'notification',
          title: 'Public #kudos-hall-of-fame Broadcast',
          tool: 'Slack Channel',
          toolCategory: 'communication',
          description: 'Posts a rich celebratory card in public channel and notifies recipient + their direct manager.',
          configDetails: 'Slack Webhook post with animated reactions and company badge icons.',
          iconName: 'Award'
        },
        {
          id: 'node-204',
          stepNumber: 4,
          type: 'storage',
          title: 'Cultural Analytics Base Update',
          tool: 'Google Sheets / Looker',
          toolCategory: 'bi_analytics',
          description: 'Appends row to Google Sheet connected to Looker Studio dashboard tracking top value champions.',
          configDetails: 'Auto-sync with Looker Studio data source refreshed hourly.',
          iconName: 'BarChart3'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Configure Slack Custom Modal or Slash Command',
          tool: 'Slack API / Workflow Builder',
          action: 'Create a shortcut modal titled "Give Kudos" with inputs: Recipient (User select), Core Value (Dropdown), Message (Text).',
          configurationTip: 'Ensure it is accessible across all mobile and desktop clients without leaving conversation threads.'
        },
        {
          stepNumber: 2,
          title: 'Build Make.com Automation Scenario',
          tool: 'Make.com',
          action: 'Route the Slack Webhook to a Make.com scenario that formats the kudos and distributes to the #kudos channel and direct manager DM.',
          configurationTip: 'Add an automated monthly summary email to Department Heads highlighting quiet contributors.'
        },
        {
          stepNumber: 3,
          title: 'Deploy Looker Studio Recognition Dashboard',
          tool: 'Looker Studio',
          action: 'Connect the backend Google Sheet to a pre-built Looker Studio template displaying Kudos by Department, Top Values, and Cross-Team bridges.',
          configurationTip: 'Review this dashboard in quarterly talent calibration sessions to ensure merit-based promotion alignment.'
        }
      ],
      raciMatrix: {
        responsible: 'People Operations / HR Business Partner',
        accountable: 'Chief People Officer',
        consulted: 'Team Leads & Culture Champions',
        informed: 'All Team Members'
      },
      changeManagementGuide: [
        'Seed the channel with 10 peer recognitions from executives and team leads during the first 48 hours.',
        'Feature the top 3 weekly kudos in the CEO Friday newsletter.',
        'Tie kudos directly to annual spot bonuses or peer-voted quarterly awards.'
      ]
    },
    {
      id: 'strat-3',
      frictionPointId: 'fric-3',
      title: 'Automated Human-in-the-Loop Approval & Nudge Bot',
      archetype: 'Archetype C: Decision Paralysis & Process Friction',
      summary: 'Replace slow multi-hop email approval threads with Monday.com / Airtable conditional logic, Jotform decision criteria, and automated 24-hour Slack Nudge Bots.',
      targetTools: [
        { name: 'Monday.com / Airtable', role: 'Approval Pipeline Matrix', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
        { name: 'Jotform / Fillout', role: 'Decision Criteria Intake', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        { name: 'Slack Bot', role: 'One-Click Decision & Nudge Alert', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { name: 'Make.com', role: 'Escalation Timer Logic', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' }
      ],
      implementationComplexity: 'Medium (3-5 days)',
      timeline: '3-5 Days to Full Rollout',
      estimatedImpact: 'Democratizes decision velocity and cuts average approval turnaround from 14 days down to <18 hours.',
      expectedMetricGains: [
        { metric: 'Average Decision Turnaround Time', targetValue: '16.4 hours', baselineValue: '14.2 days', direction: 'decrease' },
        { metric: 'Stalled Approval Escalation Rate', targetValue: '< 3%', baselineValue: '48%', direction: 'decrease' },
        { metric: 'Budget Execution Velocity', targetValue: '+65%', baselineValue: 'Baseline', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'node-301',
          stepNumber: 1,
          type: 'trigger',
          title: 'Approval Request Ingested',
          tool: 'Jotform / Fillout',
          toolCategory: 'forms',
          description: 'Employee submits request with budget threshold ($ < $1K vs $1K-$10K vs $10K+).',
          configDetails: 'Calculates necessary signer tier automatically based on delegation rules.',
          iconName: 'Send'
        },
        {
          id: 'node-302',
          stepNumber: 2,
          type: 'router',
          title: 'Signer Tier Decision Matrix',
          tool: 'Monday.com / Airtable',
          toolCategory: 'database',
          description: '<$1K: Direct Manager auto-approve. $1K-$10K: VP signoff. $10K+: Finance signoff.',
          configDetails: 'Conditional workflow logic triggers immediate interactive Slack message to the correct signer.',
          iconName: 'Sliders'
        },
        {
          id: 'node-303',
          stepNumber: 3,
          type: 'action',
          title: '1-Click Interactive Slack Approval Card',
          tool: 'Slack Interactive Block',
          toolCategory: 'communication',
          description: 'Signer receives button card in Slack: [Approve ✅] [Request Info ❓] [Decline ❌].',
          configDetails: 'Button click triggers webhook back to Monday.com updating record state instantly.',
          iconName: 'CheckCircle2'
        },
        {
          id: 'node-304',
          stepNumber: 4,
          type: 'notification',
          title: '24-Hour Automated Escalation Nudge Bot',
          tool: 'Make.com Cron Bot',
          toolCategory: 'automation',
          description: 'If status is still "Pending" after 24 hrs, sends direct DM reminder and escalates to backup signer at 48 hrs.',
          configDetails: 'Scheduled 24h timer checking status field != "Approved".',
          iconName: 'Clock'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Document Delegation of Authority (DoA) Thresholds',
          tool: 'Notion / Coda',
          action: 'Establish explicit spending and architecture signoff matrix: Tier 1 (Manager up to $1k), Tier 2 (Dept Head up to $10k), Tier 3 (Exec above $10k).',
          configurationTip: 'Eliminate all dual-signature requirements for purchases under $1,000 to instantly unlock 60% of volume.'
        },
        {
          stepNumber: 2,
          title: 'Build Approval Board & Automated Slack Buttons',
          tool: 'Monday.com / Airtable + Make.com',
          action: 'Construct the approval tracking pipeline. Integrate Slack Block Kit buttons to allow managers to approve from their phone in 2 seconds.',
          configurationTip: 'Include reason field if declined, prompting the requester with specific feedback.'
        },
        {
          stepNumber: 3,
          title: 'Program Automated 24h / 48h Nudge Automation',
          tool: 'Make.com',
          action: 'Set up an hourly cron monitor that inspects pending approvals older than 24 hours and sends a courteous Slack ping to the approver.',
          configurationTip: 'Include the estimated project delay cost on the nudge reminder to inspire fast action.'
        }
      ],
      raciMatrix: {
        responsible: 'Finance Operations & Business Systems Analyst',
        accountable: 'VP of Finance / Chief Operating Officer',
        consulted: 'Department Heads & Engineering Directors',
        informed: 'All Team Members'
      },
      changeManagementGuide: [
        'Host a 15-minute manager briefing showing how to approve requests directly from mobile Slack notifications.',
        'Publish monthly "Approval SLA Velocity" metrics to keep leadership accountable for decision speed.'
      ]
    },
    {
      id: 'strat-4',
      frictionPointId: 'fric-4',
      title: 'Sales-to-Product Strategic Intake & Feasibility Gate',
      archetype: 'Archetype D: Cross-Functional Misalignment',
      summary: 'Implement a structured Coda / Notion commercial request intake workflow with automated technical feasibility scoring and bi-weekly prioritization syncless triage.',
      targetTools: [
        { name: 'Coda / Notion', role: 'Commercial Intake Hub', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        { name: 'Slack Bot', role: 'Opportunity Alert & Status', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { name: 'Zapier', role: 'CRM to Product Sync', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' }
      ],
      implementationComplexity: 'Medium (3-5 days)',
      timeline: '1 Week Implementation',
      estimatedImpact: 'Stops ad-hoc engineering fire drills while preserving 100% visibility for high-value enterprise sales opportunities.',
      expectedMetricGains: [
        { metric: 'Unplanned Sprint Disruptions', targetValue: '< 5%', baselineValue: '34%', direction: 'decrease' },
        { metric: 'Enterprise Deal Feasibility Latency', targetValue: '24 hrs', baselineValue: '9.5 days', direction: 'decrease' },
        { metric: 'Product-Sales Trust Index', targetValue: '88%', baselineValue: '38%', direction: 'increase' }
      ],
      workflowNodes: [
        {
          id: 'node-401',
          stepNumber: 1,
          type: 'trigger',
          title: 'CRM Deal Custom Feature Flagged',
          tool: 'HubSpot / Salesforce / Zapier',
          toolCategory: 'automation',
          description: 'Sales Account Executive flags "Requires Custom Engineering" on deal record.',
          configDetails: 'Triggered when deal stage reaches "Qualified Discovery" with technical add-on.',
          iconName: 'Target'
        },
        {
          id: 'node-402',
          stepNumber: 2,
          type: 'storage',
          title: 'Feasibility Scoring Matrix Form',
          tool: 'Coda / Notion Base',
          toolCategory: 'database',
          description: 'Prompts Product Lead with 3 criteria: ARR Impact, Architecture Fit, Sprint Burden.',
          configDetails: 'Calculates RICE Score automatically in Coda formula table.',
          iconName: 'Calculator'
        },
        {
          id: 'node-403',
          stepNumber: 3,
          type: 'notification',
          title: 'Deal Status Broadcast to Sales Channel',
          tool: 'Slack Bot',
          toolCategory: 'communication',
          description: 'Posts feasibility verdict (Green / Yellow / Red) back to the deal channel with roadmap ETA.',
          configDetails: 'Automated Slack Block message linked to CRM record.',
          iconName: 'MessageSquare'
        }
      ],
      stepByStepPlaybook: [
        {
          stepNumber: 1,
          title: 'Establish Strict Cross-Team Intake Rules',
          tool: 'Company Policy in Notion',
          action: 'Mandate that no sales commitment binds delivery dates without a completed Feasibility Gate score in Coda.',
          configurationTip: 'Define high-ARR thresholds that unlock expedited 24-hour review turnarounds.'
        },
        {
          stepNumber: 2,
          title: 'Deploy Automated CRM to Coda Sync',
          tool: 'Zapier',
          action: 'Automatically sync high-tier deals with custom requirements into the Product Triage Queue.',
          configurationTip: 'Keep sales reps informed of roadmap slotting without requiring manual email queries.'
        }
      ],
      raciMatrix: {
        responsible: 'Principal Product Manager & Head of Sales Ops',
        accountable: 'Chief Product Officer & VP of Sales',
        consulted: 'Staff Systems Architect & Solutions Engineering Lead',
        informed: 'All Account Executives & Engineering Squads'
      },
      changeManagementGuide: [
        'Co-present the new Intake Gate at joint Sales & Product quarterly kick-off.',
        'Highlight successful deals closed on-time through the new structured process.'
      ]
    }
  ],
  rawFeedbackItems: TECH_SCALEUP_FEEDBACK
};
