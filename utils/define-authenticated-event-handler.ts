import type { EventHandlerRequest } from "h3";

import { createError, defineEventHandler } from "h3";

export function defineAuthenticatedEventHandler<T>(
  handler: (event: EventHandlerRequest) => T,
) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    return handler(event);
  });
}
