import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: "ok",
    service: "OD Intelligence Engine",
    geminiEnabled: hasKey,
    timestamp: new Date().toISOString(),
  });
});

// Deep AI Analysis endpoint using Gemini 3.7 Flash
app.post("/api/analyze-od", async (req: Request, res: Response) => {
  try {
    const { feedbackText, context = "" } = req.body;
    if (!feedbackText || typeof feedbackText !== "string" || !feedbackText.trim()) {
      res.status(400).json({ error: "Missing or empty feedbackText." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return signal indicating fallback to deterministic OD engine
      res.json({
        fallback: true,
        message: "Gemini API key not configured. Using deterministic OD Engine.",
      });
      return;
    }

    const prompt = `You are an advanced Organizational Development (OD) Intelligence Engine operating at the intersection of behavioral science and operational technology.
Analyze the following unstructured employee feedback signals:
"""
${feedbackText}
"""
Context / Industry Info: "${context || "General Enterprise / Tech Scale-Up"}"

Analyze the human signals, perform Latent Dirichlet Allocation (LDA) theme extraction, valence analysis (-1.0 to +1.0), and map friction points directly to:
1. McKinsey 7S Framework (Strategy, Structure, Systems, Shared Values, Style, Staff, Skills)
2. Burke-Litwin Model (Transformational & Transactional factors)
3. Actionable No-Code Operational Strategies (using Notion, Airtable, Make.com, Zapier, Slack Bots, Monday.com, Looker Studio, Typeform, etc.)

Return ONLY valid JSON matching this exact structure:
{
  "executiveSummary": "Concise 2-3 sentence executive synthesis of organizational health and core systemic friction.",
  "overallSentimentScore": -0.65,
  "sentimentDistribution": {
    "positive": 10,
    "neutral": 15,
    "frustration": 40,
    "exhaustion": 20,
    "disengagement": 15
  },
  "dominantThemes": [
    {
      "id": "theme-1",
      "name": "Decision Ambiguity & Ownership Void",
      "category": "Organizational Structure",
      "signalCount": 4,
      "avgValence": -0.75,
      "intensityLevel": "High",
      "keywords": ["ownership", "decisions", "veto"],
      "sampleQuotes": ["Quote 1...", "Quote 2..."],
      "primaryFramework": "McKinsey 7S: Structure"
    }
  ],
  "mckinsey7s": [
    {
      "dimension": "Structure",
      "healthScore": 35,
      "status": "Critical Friction",
      "summary": "Specific structural diagnostic...",
      "signalsCount": 3,
      "dominantGaps": ["Gap 1", "Gap 2"],
      "evidenceQuotes": ["Quote..."]
    }
  ],
  "frictionPoints": [
    {
      "id": "fric-ai-1",
      "title": "Information Asymmetry & Cross-Tool Silos",
      "archetype": "Archetype A: Information Asymmetry & Silos",
      "severity": "Critical",
      "rootCause": "Clear root cause statement...",
      "odContext": "OD Context in Systems and Structure...",
      "affectedDepartments": ["Engineering", "Product & Design"],
      "signalsCount": 4,
      "evidenceQuotes": ["Sample feedback quote..."],
      "frameworkAttribution": {
        "mckinsey": "Systems & Structure",
        "burkeLitwin": "Systems"
      },
      "strategyId": "strat-ai-1"
    }
  ],
  "strategies": [
    {
      "id": "strat-ai-1",
      "frictionPointId": "fric-ai-1",
      "title": "Single Source of Truth (SSoT) Intake & Sync Engine",
      "archetype": "Archetype A: Information Asymmetry & Silos",
      "summary": "Strategy summary...",
      "targetTools": [
        { "name": "Tally / Typeform", "role": "Standardized Intake Gate", "badgeColor": "bg-amber-500/20 text-amber-300 border-amber-500/30" },
        { "name": "Airtable", "role": "Central Source of Truth", "badgeColor": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
        { "name": "Make.com", "role": "Event Sync Router", "badgeColor": "bg-orange-500/20 text-orange-300 border-orange-500/30" },
        { "name": "Slack Bot", "role": "Status Broadcast", "badgeColor": "bg-purple-500/20 text-purple-300 border-purple-500/30" }
      ],
      "implementationComplexity": "Low (1-2 days)",
      "timeline": "48 Hours",
      "estimatedImpact": "Concrete impact statement...",
      "expectedMetricGains": [
        { "metric": "Handoff Latency", "targetValue": "4.5 hrs", "baselineValue": "28 hrs", "direction": "decrease" }
      ],
      "workflowNodes": [
        {
          "id": "node-ai-1",
          "stepNumber": 1,
          "type": "trigger",
          "title": "Intake Submission",
          "tool": "Tally",
          "toolCategory": "forms",
          "description": "User fills required spec fields",
          "configDetails": "Trigger on webhook",
          "iconName": "FileText"
        }
      ],
      "stepByStepPlaybook": [
        {
          "stepNumber": 1,
          "title": "Create Form in Tally",
          "tool": "Tally",
          "action": "Set up 5 core fields",
          "configurationTip": "Add conditional routing"
        }
      ],
      "raciMatrix": {
        "responsible": "Operations Lead",
        "accountable": "VP Engineering",
        "consulted": "Department Heads",
        "informed": "All Employees"
      },
      "changeManagementGuide": [
        "Roll out with 2-minute video",
        "Enforce ticket-first Slack auto-responder"
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    res.json({
      success: true,
      aiGenerated: true,
      analysis: parsedData,
    });
  } catch (error) {
    console.error("Error running Gemini OD analysis:", error);
    res.status(500).json({
      fallback: true,
      error: error instanceof Error ? error.message : "AI analysis failed.",
    });
  }
});

// Custom Playbook Generator endpoint
app.post("/api/generate-playbook", async (req: Request, res: Response) => {
  try {
    const { frictionTitle, archetype, toolsPreference, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        fallback: true,
        message: "Gemini API not available, returning template playbook.",
      });
      return;
    }

    const prompt = `As an OD and No-Code Solutions Architect, create an exhaustive step-by-step implementation recipe for this workforce friction point:
Title: "${frictionTitle}"
Archetype: "${archetype}"
Target Tools Preference: "${toolsPreference || "Notion, Airtable, Zapier, Slack"}"
Context: "${context || "Fast growing tech company"}"

Return JSON matching:
{
  "title": "Bespoke No-Code Operational Strategy",
  "summary": "Summary of solution",
  "timeline": "3 Days",
  "implementationComplexity": "Medium (3-5 days)",
  "estimatedImpact": "High impact summary...",
  "targetTools": [
    { "name": "Airtable", "role": "Database", "badgeColor": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
  ],
  "expectedMetricGains": [
    { "metric": "Cycle Time", "targetValue": "2h", "baselineValue": "24h", "direction": "decrease" }
  ],
  "workflowNodes": [
    {
      "id": "node-custom-1",
      "stepNumber": 1,
      "type": "trigger",
      "title": "Step 1 Trigger",
      "tool": "Airtable",
      "toolCategory": "database",
      "description": "Trigger description",
      "configDetails": "Webhook / Cron config",
      "iconName": "Database"
    }
  ],
  "stepByStepPlaybook": [
    {
      "stepNumber": 1,
      "title": "Step 1 Title",
      "tool": "Airtable",
      "action": "Action to take",
      "configurationTip": "Pro tip"
    }
  ],
  "raciMatrix": {
    "responsible": "Operations Manager",
    "accountable": "Dept Head",
    "consulted": "Team Leads",
    "informed": "Organization"
  },
  "changeManagementGuide": [
    "Step 1 guide",
    "Step 2 guide"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      playbook: parsed,
    });
  } catch (error) {
    console.error("Error generating playbook:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Playbook generation failed",
    });
  }
});

// Vite Middleware for development vs static build for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OD Intelligence Engine server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
