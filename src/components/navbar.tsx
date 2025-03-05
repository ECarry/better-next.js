// External dependencies
import Link from "next/link";

// Internal dependencies - UI Components
import { TbBrandNextjs } from "react-icons/tb";
import { ThemeToggle } from "./theme-toggle";
import FlipLink from "./flip-link";
import UserButton from "@/modules/auth/components/user-button";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto h-16 w-full flex items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <TbBrandNextjs size={40} />
        <h1 className="text-xl font-bold">BETTER-Next.JS</h1>
      </Link>

      <nav className="hidden lg:flex gap-4 ml-6">
        <FlipLink href="/posts">Posts</FlipLink>
        <FlipLink href="/profile">profile</FlipLink>
        <FlipLink href="/admin">Admin</FlipLink>
        <FlipLink href="/about">About</FlipLink>
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
