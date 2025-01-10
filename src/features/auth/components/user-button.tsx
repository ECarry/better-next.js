"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/features/auth/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

const UserButton = () => {
  const router = useRouter();
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-9">
              <AvatarImage
                src={session?.user.image || "#"}
                alt="Avatar"
                className="object-cover"
              />
              <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <button
                className="w-full"
                onClick={async () => {
                  setIsSignOut(true);
                  await signOut({
                    fetchOptions: {
                      onSuccess() {
                        router.push("/");
                      },
                    },
                  });
                  setIsSignOut(false);
                }}
                disabled={isSignOut}
              >
                <span className="text-sm">
                  {isSignOut ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogOut size={16} />
                      Sign Out
                    </div>
                  )}
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
    </>
  );
};

export default UserButton;
