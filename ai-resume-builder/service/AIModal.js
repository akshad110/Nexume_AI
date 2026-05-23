import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

/** Override in .env: VITE_GEMINI_MODEL=gemini-1.5-flash */
const MODEL_NAME =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

function getModel(modelName = MODEL_NAME) {
  if (!genAI) return null;
  return genAI.getGenerativeModel({ model: modelName });
}

function toFriendlyAIError(err) {
  const msg = err?.message || String(err);
  if (msg.includes("429") || msg.toLowerCase().includes("quota")) {
    return new Error(
      "Gemini free quota exceeded. Wait ~1 minute and retry, or create a new API key at ai.google.dev and enable billing for higher limits.",
    );
  }
  if (msg.includes("API key") || msg.includes("403")) {
    return new Error(
      "Invalid or blocked API key. Check VITE_GOOGLE_AI_API_KEY in .env.local or Render.",
    );
  }
  return err instanceof Error ? err : new Error(msg);
}

/** Parse JSON from Gemini (strips markdown fences if present). */
export function parseAIJson(text) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
  return JSON.parse(cleaned);
}

/** One-shot JSON generation (experience bullets, summaries, etc.). */
export async function generateAIContent(prompt) {
  if (!apiKey) {
    throw new Error(
      "Google AI is not configured. Add VITE_GOOGLE_AI_API_KEY to .env.local or Render.",
    );
  }

  const model = getModel();
  if (!model) {
    throw new Error("Google AI client failed to initialize.");
  }

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    return parseAIJson(result.response.text());
  } catch (err) {
    throw toFriendlyAIError(err);
  }
}

/** @deprecated Prefer generateAIContent */
export const AIChatSession = getModel()
  ? getModel().startChat({ generationConfig, history: [] })
  : null;
