import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { ac, admin, user } from "./permissions";
import { auth } from "./auth";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
    adminClient({
      ac,
      roles: {
        user,
        admin,
      },
    }),
  ],
});
