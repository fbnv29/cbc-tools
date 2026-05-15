import { supabase } from "./supabase.js";

const DEFAULT_LIMIT = 200;

export async function searchDatabase(question) {
  if (!supabase) {
    throw new Error("Supabase no está configurado. Agrega SUPABASE_URL y SUPABASE_ANON_KEY en .env.");
  }

  const readableTables = getReadableTables();
  if (readableTables.length === 0) {
    throw new Error("No hay tablas autorizadas para lectura. Agrega SUPABASE_READABLE_TABLES en .env.");
  }

  const results = await Promise.all(
    readableTables.map(async (tableName) => {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(DEFAULT_LIMIT);

      if (error) {
        return {
          table: tableName,
          error: error.message,
          rows: [],
        };
      }

      return {
        table: tableName,
        rows: data ?? [],
      };
    })
  );

  const data = results.flatMap((result) => result.rows);

  return {
    source: readableTables.join(", "),
    question,
    tableErrors: results.filter((result) => result.error),
    tables: results.map((result) => ({
      name: result.table,
      rows: result.rows,
    })),
    data,
  };
}

function getReadableTables() {
  return (process.env.SUPABASE_READABLE_TABLES ?? "")
    .split(",")
    .map((table) => table.trim())
    .filter(Boolean);
}
