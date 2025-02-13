import { auth } from "@/modules/auth/lib/auth";
import { forbidden } from "next/navigation";
import { headers } from "next/headers";

const AdminPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if the user has the 'admin' role
  if (session?.user?.role !== "admin") {
    forbidden();
  }

  return <div>AdminPage</div>;
};

export default AdminPage;
