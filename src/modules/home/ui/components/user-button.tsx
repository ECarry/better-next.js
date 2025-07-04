import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { auth } from "@/modules/auth/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const UserButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      {!!session ? (
        <UserAvatar
          size="lg"
          imageUrl={session.user.image!}
          name={session.user.name!}
        />
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  );
};
