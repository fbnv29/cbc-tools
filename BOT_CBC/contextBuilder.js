import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, "knowledge");
const KNOWLEDGE_FILES = [
  "identity.md",
  "data-interpretation.md",
  "response-style.md",
  "rules.md",
  "future-sources.md",
  "qmix-retornos.md",
  "team-members.md",
];
const TEAM_MEMBERS_FILE = "team-members.json";

let knowledgeCache = null;
let teamMembersCache = null;

export async function buildAssistantContext({ databaseResult }) {
  return {
    instructions: await readKnowledge(),
    sources: {
      supabase: {
        mode: "read_only",
        tables: databaseResult.tables,
        tableErrors: databaseResult.tableErrors,
      },
      teamMembers: await readTeamMembers(),
    },
  };
}

async function readKnowledge() {
  if (knowledgeCache) return knowledgeCache;

  const files = await Promise.all(
    KNOWLEDGE_FILES.map(async (file) => {
      const content = await readFile(join(KNOWLEDGE_DIR, file), "utf8");
      return {
        file,
        content: content.trim(),
      };
    })
  );

  knowledgeCache = files;
  return files;
}

export async function readTeamMembers() {
  if (teamMembersCache) return teamMembersCache;

  const content = await readFile(join(KNOWLEDGE_DIR, TEAM_MEMBERS_FILE), "utf8");
  teamMembersCache = JSON.parse(content);
  return teamMembersCache;
}
