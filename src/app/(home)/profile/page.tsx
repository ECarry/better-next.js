"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Link as LinkIcon, Calendar, Grid, Bookmark, Heart } from "lucide-react";

const tabs = [
    { id: "posts", label: "Posts", icon: Grid },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "likes", label: "Likes", icon: Heart },
];

const user = {
    name: "Alex Developer",
    handle: "@alexdev",
    bio: "Full-stack developer passionate about building beautiful UIs and scalable systems. Lover of coffee and code.",
    location: "San Francisco, CA",
    website: "alex.dev",
    joinDate: "September 2023",
    stats: {
        posts: 42,
        followers: "12.5k",
        following: 248,
    },
};

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");

    return (
        <div className="container mx-auto min-h-screen px-4 py-24">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
                <div className="mb-6 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1">
                    <div className="h-full w-full rounded-full bg-black p-1">
                        <div className="h-full w-full rounded-full bg-zinc-800" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-zinc-400">{user.handle}</p>

                <p className="mt-4 max-w-md text-zinc-300">{user.bio}</p>

                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-zinc-500 sm:justify-start">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <a href={`https://${user.website}`} className="text-indigo-400 hover:underline">{user.website}</a>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {user.joinDate}
                    </div>
                </div>

                <div className="mt-6 flex gap-6 text-sm">
                    <div><span className="font-bold text-white">{user.stats.posts}</span> <span className="text-zinc-500">Posts</span></div>
                    <div><span className="font-bold text-white">{user.stats.followers}</span> <span className="text-zinc-500">Followers</span></div>
                    <div><span className="font-bold text-white">{user.stats.following}</span> <span className="text-zinc-500">Following</span></div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="mb-8 flex border-b border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:text-white focus:outline-none"
                        style={{
                            color: activeTab === tab.id ? "white" : "#a1a1aa"
                        }}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {/* Placeholder Content for Tabs */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-zinc-900/50 border border-white/5 p-4 hover:bg-zinc-900 transition-colors">
                            <div className="h-full w-full rounded-lg bg-white/5 flex items-center justify-center text-zinc-700">
                                {activeTab === 'posts' && <Grid className="h-8 w-8" />}
                                {activeTab === 'saved' && <Bookmark className="h-8 w-8" />}
                                {activeTab === 'likes' && <Heart className="h-8 w-8" />}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
