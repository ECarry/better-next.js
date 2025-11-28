export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-zinc-500">
            <div className="container mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Better Next.js Template. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">Discord</a>
                </div>
            </div>
        </footer>
    );
}
