import { Metadata } from "next";
import SignIn from "@/modules/auth/components/sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
