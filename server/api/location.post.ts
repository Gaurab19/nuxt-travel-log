import slugify from "slug";

import { LocationInsertSchema } from "../../lib/db/schema/location";
import { createLocation, findLocationByName, findUniqueSlug } from "../../lib/queries/location";

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
  const existingLocation = await findLocationByName(result.data, event.context.user.id);

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists!",
    }));
  }
  const slug = await findUniqueSlug(slugify(result.data.name));
  try {
    return createLocation(result.data, slug, event.context.user.id);
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
