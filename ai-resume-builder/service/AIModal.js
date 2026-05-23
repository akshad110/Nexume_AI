import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const model = genAI?.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

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
  if (!apiKey || !model) {
    throw new Error(
      "Google AI is not configured. Add VITE_GOOGLE_AI_API_KEY to .env.local or Render.",
    );
  }

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
  });

  return parseAIJson(result.response.text());
}

/** @deprecated Prefer generateAIContent — kept for any legacy usage */
export const AIChatSession = model
  ? model.startChat({ generationConfig, history: [] })
  : null;
