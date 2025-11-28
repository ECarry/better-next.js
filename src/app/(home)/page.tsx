"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Database, ArrowLeftRight, Activity, ShieldCheck, Wind, Box } from "lucide-react";

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

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center"
      >
        <motion.div variants={item} className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-yellow-400" />
          <span>The Ultimate Next.js Template</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
        >
          Build faster with <br />
          <span className="text-indigo-400">Better Next.js</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          A premium, high-performance template for building modern web applications.
          Packed with animations, best practices, and a stunning UI.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/posts"
            className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
          >
            Explore Posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            View Profile
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={container} className="mt-24 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Zap, title: "Next.js 16", desc: "The latest features including React 19 support and partial prerendering." },
            { icon: Sparkles, title: "shadcn/ui", desc: "Beautifully designed components built with Radix UI and Tailwind CSS." },
            { icon: Database, title: "Drizzle ORM", desc: "Lightweight, type-safe, and serverless-ready ORM for modern apps." },
            { icon: ArrowLeftRight, title: "tRPC", desc: "Experience end-to-end type safety without schemas or code generation." },
            { icon: Activity, title: "TanStack Query", desc: "Powerful asynchronous state management for TS/JS, React, Vue, Svelte & Solid." },
            { icon: ShieldCheck, title: "Better Auth", desc: "The most comprehensive authentication library for TypeScript." },
            { icon: Wind, title: "Tailwind CSS", desc: "Rapidly build modern websites without ever leaving your HTML." },
            { icon: Box, title: "Bun Runtime", desc: "Develop, test, run, and bundle JavaScript & TypeScript projects—all in one." }
          ].map((feature, i) => (
            <motion.div key={i} variants={item} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-colors hover:bg-white/10">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
