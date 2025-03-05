import { toast } from "sonner";
import { createAuthClient } from "better-auth/react";
import { adminClient, passkeyClient } from "better-auth/client/plugins";

export const client = createAuthClient({
  plugins: [adminClient(), passkeyClient()],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const { signUp, signIn, signOut, useSession } = client;
