// External dependencies
import Link from "next/link";

import { TbBrandNextjs } from "react-icons/tb";
import FlipLink from "../../../../components/flip-link";

export const HomeNavbar = () => {
  return (
    <div className="max-w-7xl mx-auto h-16 w-full flex items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <TbBrandNextjs size={40} />
        <h1 className="text-xl font-bold">BETTER-Next.JS</h1>
      </Link>

      <nav className="hidden lg:flex gap-4 ml-6">
        <FlipLink href="/posts">Posts</FlipLink>
        <FlipLink href="/profile">profile</FlipLink>
        <FlipLink href="/dashboard">Dashboard</FlipLink>
      </nav>

      <div className="ml-auto flex items-center gap-4"></div>
    </div>
  );
};
