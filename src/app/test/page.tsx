import { protectServer } from "@/features/auth/utils";

const TestAuthPage = async () => {
  await protectServer();

  return <div>Need auth page</div>;
};

export default TestAuthPage;
