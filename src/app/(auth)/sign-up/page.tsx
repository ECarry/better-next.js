import { Metadata } from "next";
import { SignUp } from "@/features/auth/components/sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
