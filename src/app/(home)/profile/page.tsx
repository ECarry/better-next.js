import { headers } from "next/headers";
import { auth } from "@/modules/auth/lib/auth";
import UserCard from "@/modules/auth/ui/components/user-card";

const ProfilePage = async () => {
  const [session, activeSessions] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.listSessions({
      headers: await headers(),
    }),
  ]);

  console.log(session);

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col max-w-[800px] mx-auto">
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
