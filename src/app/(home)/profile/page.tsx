import UserCard from "@/modules/auth/components/user-card";
import { auth } from "@/modules/auth/lib/auth";
import { headers } from "next/headers";

import { Suspense } from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  void trpc.hello.prefetch();
  const [session, activeSessions] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.listSessions({
      headers: await headers(),
    }),
  ]);

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col max-w-[800px] mx-auto">
        <UserCard
          session={JSON.parse(JSON.stringify(session))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions))}
        />
      </div>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
};

export default ProfilePage;
