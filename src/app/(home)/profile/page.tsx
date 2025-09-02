import { redirect } from "next/navigation";
import UserCard from "@/modules/auth/ui/components/user-card";
import { getSession, getActiveSessions } from "@/modules/auth/lib/get-session";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const activeSessions = await getActiveSessions();

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
