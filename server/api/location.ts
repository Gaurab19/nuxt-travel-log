import { createError, sendError } from "h3";

import { findLocationByUserId } from "../../lib/queries/location";
import { defineAuthenticatedEventHandler } from "../../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  try {
    const locations = await findLocationByUserId(event.context.user);
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
