import { neon } from "@neondatabase/serverless";

// import.meta.env (Astro/Vite) may not be inlined for private vars on Vercel —
// process.env is always available at runtime in serverless functions.
const databaseUrl =
  (typeof process !== "undefined" && process.env.NEON_DATABASE_URL) ||
  import.meta.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "NEON_DATABASE_URL is missing. Set it in Vercel environment variables (Production scope)."
  );
}

export const sql = neon(databaseUrl);
