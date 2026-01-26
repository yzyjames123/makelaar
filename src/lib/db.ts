import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Check if we're in build mode (no database needed)
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.POSTGRES_URL;

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb(): ReturnType<typeof drizzle<typeof schema>> {
  if (_db) return _db;

  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  const client = postgres(connectionString);
  _db = drizzle(client, { schema });
  return _db;
}

// Export db - at build time returns a dummy, at runtime returns real db
export const db: ReturnType<typeof drizzle<typeof schema>> = isBuildTime
  ? ({} as ReturnType<typeof drizzle<typeof schema>>)
  : new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
      get(_target, prop) {
        return getDb()[prop as keyof ReturnType<typeof drizzle<typeof schema>>];
      },
    });
