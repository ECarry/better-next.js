import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: ["admin", "user", "plus"],
      defaultBanReason: "Spamming",
      defaultBanExpiresIn: 60 * 60 * 24, // 1 day
    }),
  ],
  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});
