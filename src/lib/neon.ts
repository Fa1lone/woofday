import { neon } from "@neondatabase/serverless";

const databaseUrl = import.meta.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("NEON_DATABASE_URL is missing");
}

export const sql = neon(databaseUrl);
