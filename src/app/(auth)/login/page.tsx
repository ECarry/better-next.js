import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginCard } from "@/features/auth/components/login-card";

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <LoginCard />;
};

export default LoginPage;
