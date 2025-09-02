import { redirect } from "next/navigation";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { getSession } from "@/modules/auth/lib/get-session";

const page = async () => {
  const session = await getSession();

  if (!!session) {
    redirect("/");
  }

  return <SignUpView />;
};

export default page;
