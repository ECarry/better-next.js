import { redirect } from "next/navigation";
import { getSession } from "@/modules/auth/lib/get-session";

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <div>page</div>;
};

export default page;
