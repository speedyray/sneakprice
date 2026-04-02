import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { normalizeDatabaseUrl } from "@/lib/database-url";



const rawConnectionString = process.env.DATABASE_URL;

if (!rawConnectionString) {
  throw new Error("DATABASE_URL is required for Prisma marketplace queries.");
}

function inferSupabaseDirectUrlIfPooler(urlString: string) {
  // Supabase pooler "session mode" URLs (usually port 5432) can hit `pool_size`
  // quickly in Next dev (multiple server processes + hot reload). In dev, prefer
  // the transaction pooler (usually port 6543) which is designed for many short
  // connections and avoids the Session mode client cap.
  if (process.env.NODE_ENV === "production") return urlString;

  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return urlString;
  }

  if (!url.hostname.endsWith(".pooler.supabase.com")) return urlString;

  // Common Supabase pooler ports:
  // - 5432: session mode (can error with MaxClientsInSessionMode)
  // - 6543: transaction mode (recommended for serverless / dev)
  if (!url.port || url.port === "5432") {
    url.port = "6543";
  }

  return url.toString();
}

const connectionString = normalizeDatabaseUrl(
  inferSupabaseDirectUrlIfPooler(rawConnectionString),
);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
};

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    // Supabase "session mode" connections are limited; in dev, hot reloads can
    // otherwise spin up pools fast. Keep this small and reuse the same pool.
    max: process.env.NODE_ENV === "production" ? 5 : 1,
  });

const adapter = globalForPrisma.adapter ?? new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
  globalForPrisma.adapter = adapter;
}
