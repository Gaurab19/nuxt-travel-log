// lib/env/try-parse-env.ts

import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
  schema: ZodObject<T>,
  buildEnv: Record<string, unknown>,
) {
  const result = schema.safeParse(buildEnv);
  if (result.success)
    return result.data;

  if (result.error instanceof ZodError) {
    const message
      = `Missing or invalid environment variables:\n${
        result.error.issues.map(i => `- ${i.path.join(".")}: ${i.message}`).join("\n")}`;
    const e = new Error(message);
    e.stack = "";
    throw e;
  }
  throw result.error;
}
