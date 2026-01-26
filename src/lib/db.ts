import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use dummy URL during build to prevent errors (won't actually connect)
const connectionString = process.env.POSTGRES_URL || "postgresql://build:build@localhost:5432/build";

const client = postgres(connectionString, {
  // Don't actually connect during build
  max: process.env.POSTGRES_URL ? 10 : 0,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });
