import express from "express";
import dotenv from "dotenv";
import { searchDatabase } from "./queryRouter.js";
import { askAI } from "./ai.js";
import { buildAssistantContext, readTeamMembers } from "./contextBuilder.js";
import { getDeterministicAnswer } from "./deterministicAnswers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const AI_CACHE_TTL_MS = 15 * 60 * 1000;
const aiResponseCache = new Map();

app.use(express.json());
app.use(express.static("public")); // Aquí serviremos nuestra web

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Escribe una pregunta para consultar la base de datos." });
  }

  try {
    const cleanQuestion = question.trim();
    const localAnswer = getLocalAnswer(cleanQuestion);
    if (localAnswer) {
      return res.json({ answer: localAnswer });
    }

    const result = await searchDatabase(cleanQuestion);
    const teamMembers = await readTeamMembers();
    const deterministicAnswer = getDeterministicAnswer(cleanQuestion, result, { teamMembers });
    if (deterministicAnswer) {
      return res.json({ answer: deterministicAnswer });
    }

    if (!result.data || result.data.length === 0) {
      return res.json({ 
        answer: "No encontré información suficiente en la base de datos para responder eso." 
      });
    }

    const context = await buildAssistantContext({ databaseResult: result });
    const cacheKey = getCacheKey(cleanQuestion);
    const cachedAnswer = getCachedAnswer(cacheKey);
    if (cachedAnswer) {
      return res.json({ answer: cachedAnswer });
    }

    const answer = await askAI({
      question: cleanQuestion,
      context
    });
    setCachedAnswer(cacheKey, answer);

    res.json({ answer });
  } catch (error) {
    console.error(error);
    const isConfigurationError =
      error.message?.includes("no está configurado") ||
      error.message?.includes("No hay tablas autorizadas");
    const isQuotaError = error.status === 429 || error.message?.includes("Too Many Requests");
    const isTemporaryAIError = error.status === 503 || error.message?.includes("Service Unavailable");

    if (isConfigurationError) {
      return res.status(503).json({ error: error.message });
    }

    if (isQuotaError) {
      return res.status(429).json({
        error: "Estoy temporalmente limitado por la cuota de IA. Intenta de nuevo en un momento."
      });
    }

    if (isTemporaryAIError) {
      return res.status(503).json({
        error: "El servicio de IA está con alta demanda. Intenta nuevamente en unos segundos."
      });
    }

    res.status(500).json({ error: "Error interno del servidor" });
  }
});

function getLocalAnswer(question) {
  const text = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const asksCapabilities =
    text.includes("que puedes hacer") ||
    text.includes("para que sirves") ||
    text.includes("en que me puedes ayudar") ||
    text.includes("como me puedes ayudar");

  if (!asksCapabilities) return null;

  return "Puedo ayudarte a consultar información técnica del ministerio de alabanza: canales de entrada, salidas de monitor, canciones disponibles, BPM, compás, subdivisión, acentos y notas registradas. Si un dato no está en la base autorizada, te lo diré claramente.";
}

function getCachedAnswer(key) {
  const entry = aiResponseCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    aiResponseCache.delete(key);
    return null;
  }

  return entry.answer;
}

function setCachedAnswer(key, answer) {
  aiResponseCache.set(key, {
    answer,
    expiresAt: Date.now() + AI_CACHE_TTL_MS,
  });
}

function getCacheKey(question) {
  return question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

app.listen(PORT, () => {
  console.log(`Servidor web corriendo en http://localhost:${PORT}`);
});
