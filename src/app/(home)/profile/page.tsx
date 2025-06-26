import { headers } from "next/headers";
import { auth } from "@/modules/auth/lib/auth";
import UserCard from "@/modules/auth/ui/components/user-card";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const activeSessions = await auth.api.listSessions({
    headers: await headers(),
  });

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
