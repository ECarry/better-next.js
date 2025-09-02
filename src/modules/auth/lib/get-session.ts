import { auth } from "./auth";
import { headers } from "next/headers";

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const getActiveSessions = async () => {
  return await auth.api.listSessions({
    headers: await headers(),
  });
};
