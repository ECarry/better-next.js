"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
    {
        id: 1,
        title: "The Future of Web Development",
        excerpt: "Exploring the latest trends in frontend frameworks and what to expect in 2025.",
        date: "Nov 28, 2025",
        readTime: "5 min read",
        category: "Tech",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        id: 2,
        title: "Mastering Framer Motion",
        excerpt: "A deep dive into creating complex animations with simple declarative code.",
        date: "Nov 25, 2025",
        readTime: "8 min read",
        category: "Design",
        gradient: "from-purple-500 to-indigo-500",
    },
    {
        id: 3,
        title: "Why Bun is the Real Deal",
        excerpt: "Benchmarking Bun against Node.js and Deno. The results might surprise you.",
        date: "Nov 20, 2025",
        readTime: "4 min read",
        category: "Performance",
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        id: 4,
        title: "Building Scalable Systems",
        excerpt: "Architectural patterns for high-traffic applications.",
        date: "Nov 15, 2025",
        readTime: "10 min read",
        category: "Architecture",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        id: 5,
        title: "UI/UX Best Practices",
        excerpt: "How to design interfaces that users love and understand intuitively.",
        date: "Nov 10, 2025",
        readTime: "6 min read",
        category: "Design",
        gradient: "from-orange-500 to-amber-500",
    },
    {
        id: 6,
        title: "Serverless Databases",
        excerpt: "The rise of Neon, PlanetScale, and the future of data storage.",
        date: "Nov 05, 2025",
        readTime: "7 min read",
        category: "Database",
        gradient: "from-fuchsia-500 to-pink-500",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function PostsPage() {
    return (
        <div className="container mx-auto min-h-screen px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Latest Thoughts</h1>
                <p className="mt-4 text-zinc-400">Insights, tutorials, and updates from the team.</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {posts.map((post) => (
                    <motion.article
                        key={post.id}
                        variants={item}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-colors hover:bg-zinc-900"
                    >
                        <div className={`h-48 w-full bg-gradient-to-br ${post.gradient} opacity-80 transition-opacity group-hover:opacity-100`} />

                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-4 flex items-center gap-2 text-xs text-zinc-400">
                                <span className="rounded-full bg-white/10 px-2 py-1 text-white">{post.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                            </div>

                            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                <Link href={`/posts/${post.id}`}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h2>

                            <p className="mb-6 line-clamp-2 text-zinc-400">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
                                Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    );
}
