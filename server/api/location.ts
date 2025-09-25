import { findLocationByUserId } from "../../lib/queries/location";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const locations = await findLocationByUserId(event.context.user);
  try {
    return {
      success: true,
      data: locations,
    };
  }
  catch (error) {
    console.error("Failed to fetch locations:", error);

    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Failed to fetch locations",
    }));
  }
});
