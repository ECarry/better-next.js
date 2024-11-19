import { auth } from "@/auth";
import { UserButton } from "@/features/auth/components/user-button";
import { protectServer } from "@/features/auth/utils";

const TestAuthPage = async () => {
  await protectServer();
  const session = await auth();

  return (
    <div>
      Need auth page
      <h1>{JSON.stringify(session)}</h1>
      <UserButton />
    </div>
  );
};

export default TestAuthPage;
