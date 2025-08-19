import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./lib/env";

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./lib/db/migrations",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL as string,
    authToken:
      env.NODE_ENV === "development"
        ? undefined
        : env.TURSO_AUTH_TOKEN,
  },
});
