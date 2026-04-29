import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper to get API Key - searching multiple possibilities
  const getApiKey = () => {
    // 1. Priority: User's custom key
    const customKey = process.env.APP_PROJECT_SECRET;
    if (customKey && customKey !== 'undefined' && customKey.length > 5) return customKey;

    // 2. Fallbacks
    const directKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (directKey && directKey !== 'undefined' && directKey.length > 5) return directKey;

    // 2. Search all environment variables for anything that looks like a Gemini key
    const allEnvKeys = Object.keys(process.env);
    console.log("Checking environment keys:", allEnvKeys.join(', '));
    
    // Look for names containing GEMINI, GOOGLE, or API_KEY
    for (const key of allEnvKeys) {
      if ((key.includes('GEMINI') || key.includes('GOOGLE') || key.includes('API_KEY')) && key !== 'PORT') {
        const value = process.env[key];
        if (value && value !== 'undefined' && value.length > 10) {
          console.log(`Found potential key in: ${key}`);
          return value;
        }
      }
    }
    return null;
  };

  // API Route for Plant Analysis
  app.post("/api/analyze-plant", async (req, res) => {
    try {
      const { image, prompt } = req.body;
      const apiKey = getApiKey();
      
      if (!apiKey) {
        return res.status(500).json({ error: "API Key missing" });
      }

      const genAI = new (GoogleGenAI as any)(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

      const result = await model.generateContent([
        { text: prompt },
        { inlineData: { data: base64Data, mimeType: mimeType } }
      ]);

      const text = result.response.text();
      res.json({ text });
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: error.message || "Hitilafu imetokea." });
    }
  });

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, systemInstruction } = req.body;
      const apiKey = getApiKey();
      
      if (!apiKey) {
        return res.status(500).json({ error: "MISSING_KEY" });
      }

      const genAI = new (GoogleGenAI as any)(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction
      });

      const result = await model.generateContent({
        contents: (history || []).map((m: any) => ({ role: m.role, parts: m.parts })),
      });

      const text = result.response.text();
      res.json({ text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Hitilafu imetokea." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
