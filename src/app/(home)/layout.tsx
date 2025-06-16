import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeNavbar />
      <main>{children}</main>
    </>
  );
};

export default HomeLayout;
