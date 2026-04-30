import { defineConfig } from "prisma/config";
import "dotenv/config";

// Migration-specific connection string. Diverges from the runtime URL
// (configured in lib/prisma.ts) in two ways:
//   1. Force port 5432 (session pooler). Transaction pooler at 6543 doesn't
//      honor PostgreSQL advisory locks, which makes `prisma migrate` and
//      `prisma db push` hang forever.
//   2. URL-encode the password. Prisma's connection-string parser is stricter
//      than JavaScript's `new URL()` — an unencoded `&`, `:`, `@`, `#`, `?`
//      or `/` in the password produces P1013 ("invalid port number").
//
// Runtime queries still go through DATABASE_URL via lib/prisma.ts and use the
// transaction pooler at 6543 — that's intentional, it's the right pool mode
// for serverless workloads.
function buildMigrationUrl(raw: string): string {
  const protoEnd = raw.indexOf("://");
  if (protoEnd === -1) return raw;
  const protocol = raw.slice(0, protoEnd + 3);
  const rest = raw.slice(protoEnd + 3);
  const lastAt = rest.lastIndexOf("@");
  if (lastAt === -1) return raw;
  const auth = rest.slice(0, lastAt);
  const hostAndPath = rest.slice(lastAt + 1).replace(/:6543\b/, ":5432");
  const firstColon = auth.indexOf(":");
  if (firstColon === -1) return raw;
  const username = auth.slice(0, firstColon);
  let pw = auth.slice(firstColon + 1);
  try {
    // Decode first so an already-encoded password isn't double-encoded.
    pw = decodeURIComponent(pw);
  } catch {
    // Malformed %xx sequence — leave the password as-is and let encodeURIComponent
    // produce the right output.
  }
  return `${protocol}${username}:${encodeURIComponent(pw)}@${hostAndPath}`;
}

const raw = process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: buildMigrationUrl(raw),
  },
});
