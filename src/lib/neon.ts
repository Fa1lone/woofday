import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const databaseUrl =
  (typeof process !== "undefined" && process.env.NEON_DATABASE_URL) ||
  import.meta.env.NEON_DATABASE_URL;

function missingUrlSql(): NeonQueryFunction<false, false> {
  const err = () => {
    throw new Error(
      "NEON_DATABASE_URL manquant. Ajoutez-la dans Vercel → Settings → Environment Variables (scope Production)."
    );
  };
  // Return a tagged-template compatible function that always throws
  const fn = (..._args: unknown[]) => err() as never;
  return fn as unknown as NeonQueryFunction<false, false>;
}

export const sql: NeonQueryFunction<false, false> = databaseUrl
  ? neon(databaseUrl)
  : missingUrlSql();
