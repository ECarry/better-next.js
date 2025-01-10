// External dependencies
import Link from "next/link";

// Internal dependencies - UI Components
import { TbBrandNextjs } from "react-icons/tb";
import UserButton from "@/features/auth/components/user-button";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto h-16 w-full flex items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <TbBrandNextjs size={40} />
        <h1 className="text-2xl font-bold">NEXT-TEMPLATE</h1>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
