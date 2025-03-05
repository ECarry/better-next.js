import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";
import SignIn from "@/modules/auth/components/sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/profile");
  }

  return <SignIn />;
};

export default SignInPage;
