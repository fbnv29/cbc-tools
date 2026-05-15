import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function askAI({ question, context }) {
  if (!genAI) {
    throw new Error("Gemini no está configurado. Agrega GEMINI_API_KEY en .env.");
  }

  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const prompt = `
Instrucciones del asistente:
${formatInstructions(context.instructions)}

Pregunta del usuario:
${question}

Contexto autorizado de solo lectura:
${JSON.stringify(context.sources, null, 2)}
`;

  const result = await model.generateContent(prompt);
  return toPlainText(result?.response?.text?.() ?? "");
}

function formatInstructions(instructions = []) {
  return instructions
    .map((item) => item.content)
    .filter(Boolean)
    .join("\n\n");
}

function toPlainText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
