import { auth } from "@/feature/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const [session, activeSessions] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.listSessions({
      headers: await headers(),
    }),
  ]).catch(() => {
    throw redirect("/sign-in");
  });
  return (
    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
      <p>{JSON.stringify(activeSessions, null, 2)}</p>
    </div>
  );
};

export default ProfilePage;
