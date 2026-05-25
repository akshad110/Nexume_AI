import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

/**
 * API expects lowercase ids like gemini-3.1-flash-lite (not "Gemini 3.1 Flash Lite").
 */
export function normalizeModelId(name) {
  const raw = (name || DEFAULT_MODEL).trim();
  if (!raw) return DEFAULT_MODEL;

  // Already valid API format: gemini-* with no spaces
  if (/^gemini-[a-z0-9.-]+$/i.test(raw) && !/\s/.test(raw)) {
    return raw.toLowerCase();
  }

  // Display name from AI Studio UI → API id
  return raw.toLowerCase().replace(/\s+/g, "-");
}

const MODEL_NAME = normalizeModelId(import.meta.env.VITE_GEMINI_MODEL);

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
  return genAI.getGenerativeModel({ model: normalizeModelId(modelName) });
}

function toFriendlyAIError(err) {
  const msg = err?.message || String(err);
  if (msg.includes("429") || msg.toLowerCase().includes("quota")) {
    return new Error(
      "Gemini free quota exceeded. Wait ~1 minute and retry, or enable billing at ai.google.dev.",
    );
  }
  if (
    msg.includes("400") &&
    (msg.includes("model") || msg.includes("unexpected model name"))
  ) {
    return new Error(
      `Invalid model name. Set VITE_GEMINI_MODEL to an API id like "${DEFAULT_MODEL}" (lowercase, hyphens — not the display name from AI Studio).`,
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
  return generateAIWithParts([{ text: prompt }]);
}

/** Text + optional inline images (base64) for multimodal prompts. */
export async function generateAIWithParts(parts) {
  if (!apiKey) {
    throw new Error(
      "Google AI is not configured. Add VITE_GOOGLE_AI_API_KEY to .env.local or Render.",
    );
  }

  const model = getModel();
  if (!model) {
    throw new Error("Google AI client failed to initialize.");
  }

  const normalizedParts = parts.flatMap((part) => {
    if (part.text) return [{ text: part.text }];
    if (part.inlineData) return [{ inlineData: part.inlineData }];
    return [];
  });

  if (!normalizedParts.length) {
    throw new Error("No content to send to the AI model.");
  }

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: normalizedParts }],
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
