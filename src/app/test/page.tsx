import { auth } from "@/auth";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

const testPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <UserButton />
      {JSON.stringify(session)}
    </div>
  );
};

export default testPage;
