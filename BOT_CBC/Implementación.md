# Plan de implementación — Bot IA + Supabase gratis
## Objetivo
Crear un bot sencillo que lea datos desde Supabase y responda preguntas usando IA, sin pagar por la IA inicialmente y consumiendo pocos tokens.
---
## Stack recomendado
- Base de datos: Supabase Free
- IA: Gemini API Free o Groq Free Tier
- Backend: Node.js con Express
- Bot: Telegram Bot
- Hosting inicial: Render, Railway, Fly.io o un computador local
- Lenguaje: JavaScript / TypeScript
---
## Fase 1 — Definir el alcance
### Preguntas clave
- ¿Qué tipo de datos tendrá la base?
- ¿Quién usará el bot?
- ¿Qué preguntas debería responder?
- ¿La respuesta debe ser exacta o explicativa?
- ¿El bot solo consulta o también guarda información?
### Ejemplo de alcance inicial
El bot podrá responder preguntas como:
- “¿Qué canciones están en tono de Sol?”
- “¿Qué alumnos tienen clase esta semana?”
- “¿Qué repertorio tiene Juan?”
- “¿Qué canciones están pendientes?”
- “¿Qué alumnos faltaron la última clase?”
---
## Fase 2 — Diseñar la base de datos en Supabase
### Ejemplo de tablas
```sql
alumnos
- id
- nombre
- instrumento
- nivel
- activo
clases
- id
- alumno_id
- fecha
- contenido
- tarea
- observaciones
canciones
- id
- titulo
- artista
- tono
- bpm
- dificultad
- estado
repertorio_alumno
- id
- alumno_id
- cancion_id
- estado
- observaciones

Recomendación

Partir con pocas tablas y bien pensadas.

Mejor:

alumnos
clases
canciones
repertorio

Que partir con 20 tablas y después quedar atrapado en una base de datos más enredada que película de Nolan.

⸻

Fase 3 — Crear Supabase

1. Crear cuenta en Supabase.
2. Crear proyecto nuevo.
3. Crear las tablas.
4. Agregar datos de prueba.
5. Obtener:
    * SUPABASE_URL
    * SUPABASE_ANON_KEY
    * SUPABASE_SERVICE_ROLE_KEY

Importante

Para el backend usa:

SUPABASE_SERVICE_ROLE_KEY

Pero nunca la expongas en frontend ni en el bot directamente.

⸻

Fase 4 — Crear el bot de Telegram

1. Ir a Telegram.
2. Hablar con @BotFather.
3. Crear bot nuevo.
4. Guardar el token.

Variable necesaria:

TELEGRAM_BOT_TOKEN=tu_token

⸻

Fase 5 — Crear el backend

Estructura recomendada

bot-supabase-ia/
├── src/
│   ├── index.js
│   ├── supabase.js
│   ├── ai.js
│   ├── queryRouter.js
│   └── prompts.js
├── .env
├── package.json
└── README.md

⸻

Fase 6 — Instalar dependencias

npm init -y
npm install express dotenv @supabase/supabase-js node-telegram-bot-api
npm install @google/generative-ai

⸻

Fase 7 — Configurar variables de entorno

TELEGRAM_BOT_TOKEN=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
PORT=3000

⸻

Fase 8 — Conectar Supabase

Archivo:

src/supabase.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

⸻

Fase 9 — Crear el módulo de IA

Archivo:

src/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function askAI({ question, data }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });
  const prompt = `
Eres un asistente que responde usando exclusivamente los datos entregados.
Pregunta del usuario:
${question}
Datos encontrados en la base de datos:
${JSON.stringify(data, null, 2)}
Reglas:
- No inventes información.
- Si no hay datos suficientes, dilo claramente.
- Responde breve, claro y útil.
- Si hay listas, ordénalas.
`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

⸻

Fase 10 — Crear un router simple de consultas

La idea es detectar intención antes de consultar Supabase.

Archivo:

src/queryRouter.js
import { supabase } from "./supabase.js";
export async function searchDatabase(question) {
  const text = question.toLowerCase();
  if (text.includes("alumno") || text.includes("estudiante")) {
    const { data, error } = await supabase
      .from("alumnos")
      .select("*")
      .limit(10);
    if (error) throw error;
    return {
      source: "alumnos",
      data
    };
  }
  if (text.includes("canción") || text.includes("canciones") || text.includes("repertorio")) {
    const { data, error } = await supabase
      .from("canciones")
      .select("*")
      .limit(10);
    if (error) throw error;
    return {
      source: "canciones",
      data
    };
  }
  if (text.includes("clase") || text.includes("tarea")) {
    const { data, error } = await supabase
      .from("clases")
      .select("*")
      .limit(10);
    if (error) throw error;
    return {
      source: "clases",
      data
    };
  }
  return {
    source: "general",
    data: []
  };
}

⸻

Fase 11 — Crear el bot

Archivo:

src/index.js
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { searchDatabase } from "./queryRouter.js";
import { askAI } from "./ai.js";
dotenv.config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const question = msg.text;
  if (!question) return;
  try {
    await bot.sendMessage(chatId, "Estoy revisando la base de datos...");
    const result = await searchDatabase(question);
    if (!result.data || result.data.length === 0) {
      await bot.sendMessage(
        chatId,
        "No encontré información suficiente en la base de datos para responder eso."
      );
      return;
    }
    const answer = await askAI({
      question,
      data: result.data
    });
    await bot.sendMessage(chatId, answer);
  } catch (error) {
    console.error(error);
    await bot.sendMessage(
      chatId,
      "Ocurrió un error al consultar la base de datos."
    );
  }
});
console.log("Bot funcionando...");

⸻

Fase 12 — Ajustar package.json

{
  "name": "bot-supabase-ia",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "dev": "node src/index.js",
    "start": "node src/index.js"
  },
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "@supabase/supabase-js": "^2.45.0",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "node-telegram-bot-api": "^0.66.0"
  }
}

⸻

Fase 13 — Probar localmente

npm run dev

Luego abrir Telegram y probar:

¿Qué alumnos tengo?
¿Qué canciones hay?
¿Qué clases tienen tarea?
¿Qué repertorio está pendiente?

⸻

Fase 14 — Mejorar la búsqueda

La primera versión será básica.

Después puedes mejorar con:

- filtros por nombre
- filtros por fecha
- búsqueda por instrumento
- búsqueda por tono musical
- búsqueda por nivel
- búsqueda por estado

Ejemplo:

if (text.includes("guitarra")) {
  const { data, error } = await supabase
    .from("alumnos")
    .select("*")
    .eq("instrumento", "guitarra")
    .limit(10);
}

⸻

Fase 15 — Reducir consumo de tokens

Reglas importantes:

No mandar toda la base de datos a la IA.
No mandar columnas innecesarias.
No mandar más de 10-20 registros por pregunta.
No guardar conversaciones eternas.
No pedir respuestas largas si no hacen falta.
Usar modelos baratos o gratuitos.

Ejemplo correcto:

.select("nombre, instrumento, nivel")
.limit(10)

Ejemplo incorrecto:

.select("*")

Si la tabla tiene mucho texto, esto se vuelve una aspiradora de tokens.

⸻

Fase 16 — Seguridad básica

No exponer claves

Nunca pongas esto en frontend:

SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
TELEGRAM_BOT_TOKEN

Siempre deben vivir en el backend.

Validar usuario de Telegram

Puedes permitir solo tu usuario:

const ALLOWED_USER_ID = 123456789;
if (msg.from.id !== ALLOWED_USER_ID) {
  await bot.sendMessage(chatId, "No tienes permiso para usar este bot.");
  return;
}

⸻

Fase 17 — Hosting

Opciones gratuitas o baratas:

Render Free
Railway Free trial/créditos
Fly.io
Servidor propio
Raspberry Pi
Computador personal

Para partir:

Render + polling de Telegram

Después, si quieres algo más fino:

Webhook + Express

⸻

Fase 18 — Versión 2 con búsqueda inteligente

Cuando el proyecto crezca, puedes agregar embeddings.

Arquitectura V2:

Pregunta del usuario
↓
Embedding de la pregunta
↓
Búsqueda vectorial en Supabase
↓
Resultados relevantes
↓
IA responde

Esto sirve cuando tienes:

- muchas notas de clases
- textos largos
- observaciones de alumnos
- documentos
- repertorios grandes
- registros históricos

Pero para partir, no lo necesitas.

⸻

Orden recomendado de implementación

Día 1:
- Crear Supabase
- Crear tablas
- Insertar datos de prueba
Día 2:
- Crear bot de Telegram
- Crear backend local
- Conectar Supabase
Día 3:
- Conectar Gemini
- Crear prompt base
- Probar preguntas simples
Día 4:
- Mejorar filtros
- Agregar seguridad
- Limitar usuarios
Día 5:
- Subir a hosting
- Probar uso real
- Ajustar respuestas

⸻

MVP mínimo

El primer prototipo debería hacer solo esto:

1. Recibir pregunta por Telegram.
2. Detectar si pregunta por alumnos, canciones o clases.
3. Consultar Supabase.
4. Enviar datos relevantes a Gemini.
5. Responder claro.

No más.

Primero que camine. Después le pones zapatillas con luces.

⸻

Recomendación final

Parte con esta combinación:

Telegram Bot
+
Node.js
+
Supabase Free
+
Gemini API Free

Es simple, gratis para bajo uso y suficientemente flexible para crecer.