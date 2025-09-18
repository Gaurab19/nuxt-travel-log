import db from "../../lib/db";
import { location, LocationInsertSchema } from "../../lib/db/schema/location";

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
  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
    userId: event.context.user.id,
  }).returning();
  return created;
});
