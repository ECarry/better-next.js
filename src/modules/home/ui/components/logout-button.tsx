"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconLogout } from "@tabler/icons-react";
import { authClient } from "@/modules/auth/lib/auth-client";

export const LogoutButton = () => {
  return (
    <DropdownMenuItem onClick={() => authClient.signOut()}>
      <IconLogout />
      Log out
    </DropdownMenuItem>
  );
};
