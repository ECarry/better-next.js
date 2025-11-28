import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white selection:bg-indigo-500/30">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
        </div>
    );
};

export default HomeLayout;
