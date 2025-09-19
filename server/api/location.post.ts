import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

import db from "../../lib/db";
import { location, LocationInsertSchema } from "../../lib/db/schema/location";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 5);

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const result = await readValidatedBody(event, LocationInsertSchema.safeParse);
  if (!result.success) {
    const statusMessage = result.error.issues
      .map(issue => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    const data: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      data[issue.path.join(".")] = issue.message;
    });
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  let slug = slugify(result.data.name);
  let existing = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));
    if (!existing) {
      slug = idSlug;
    }
  }
  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (e) {
    const error = e as any;
    const isUniqueConstraintError
      = error.message?.includes("UNIQUE constraint failed")
        || error.message?.includes("location.slug")
        || error.code === 19
        || error.errno === 19
        || (error.cause?.message && (
          error.cause.message.includes("UNIQUE constraint failed")
          || error.cause.message.includes("location.slug")
        ));

    if (isUniqueConstraintError) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Location with this name already exists",
      }));
    }
    console.error("Database error:", error);

    throw error;
  }
});
