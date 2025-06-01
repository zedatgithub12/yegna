import withAuth from "next-auth/middleware";
import { routes } from "./lib/config/routes";

export default withAuth(function middleware() {}, {
  pages: {
    signIn: routes.signIn,
    signOut: routes.signOut,
    error: routes.error,
  },

  callbacks: {
    authorized: ({ token }) => !!token,
  },
});
export const config = {
  matcher: ["/", "/configuration", "/subscription", "/message-broadcast"],
};
