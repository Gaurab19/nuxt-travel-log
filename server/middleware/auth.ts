import { auth } from "../../lib/auth";

// export default defineEventHandler(async (event) => {
//   const session = await auth.api.getSession({
//     headers: event.headers,
//   });
//   event.context.user = session?.user;
//   if (!session.user) {
//     return sendRedirect(event, "/");
//   }
// });
export default defineEventHandler(async (event) => {
  // Skip middleware for static assets and API routes
  if (
    event.path.startsWith("/_nuxt")
    || event.path.startsWith("/api")
    || event.path.startsWith("/favicon.ico")
  ) {
    return;
  }
  const session = await auth.api.getSession({ headers: event.headers });
  event.context.user = session?.user;
  if (!session.user) {
    return sendRedirect(event, "/");
  }
});
