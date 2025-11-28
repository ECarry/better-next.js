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
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
      />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={item} className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md mt-16">
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
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
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
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-colors hover:bg-white/10"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Code Showcase Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row"
        >
          <motion.div variants={item} className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Type-safe from <span className="text-indigo-400">Database</span> to <span className="text-purple-400">Client</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Experience the power of end-to-end type safety. Changes in your database schema automatically propagate to your API and frontend components. Catch errors at compile time, not runtime.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                "Automatic type inference",
                "No code generation required",
                "IDE autocompletion everywhere",
                "Instant feedback loop"
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {point}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4 text-xs text-zinc-500">server/routers/user.ts</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-pink-400">export const <span className="text-blue-400">userRouter</span> = <span className="text-blue-400">router</span>({'{'}</div>
              <div className="pl-4 text-blue-400">list: <span className="text-yellow-300">publicProcedure</span></div>
              <div className="pl-8 text-white">.<span className="text-purple-400">query</span>(async ({'{'} <span className="text-orange-300">ctx</span> {'}'}) ={'>'} {'{'}</div>
              <div className="pl-12 text-zinc-400">// Types are inferred automatically</div>
              <div className="pl-12 text-pink-400">return <span className="text-white">await</span> <span className="text-orange-300">ctx</span>.db.<span className="text-blue-400">select</span>().<span className="text-blue-400">from</span>(users);</div>
              <div className="pl-8 text-white">{'}'}),</div>
              <div className="text-white">{'}'});</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 grid w-full max-w-4xl grid-cols-2 gap-8 border-y border-white/5 py-12 sm:grid-cols-4"
        >
          {[
            { label: "Runtime Overhead", value: "0ms" },
            { label: "Type Safety", value: "100%" },
            { label: "Lighthouse Score", value: "100" },
            { label: "Setup Time", value: "<1min" }
          ].map((stat, i) => (
            <motion.div key={i} variants={item} className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                {stat.value}
              </motion.div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 w-full max-w-5xl"
        >
          <motion.h2 variants={item} className="mb-12 text-center text-3xl font-bold text-white">
            Loved by developers
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                quote: "This template saved me weeks of setup time. The integration between tRPC and Drizzle is flawless.",
                author: "Sarah Chen",
                role: "Senior Engineer",
                avatar: "bg-pink-500"
              },
              {
                quote: "Finally, a Next.js starter that doesn't feel bloated. It has exactly what I need and nothing I don't.",
                author: "Mike Ross",
                role: "Indie Hacker",
                avatar: "bg-blue-500"
              },
              {
                quote: "The UI components are stunning. I built a production-ready app in just a few days.",
                author: "Alex Rivera",
                role: "Frontend Lead",
                avatar: "bg-purple-500"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -10 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="mb-4 flex gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-zinc-300">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${testimonial.avatar}`} />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 w-full max-w-3xl"
        >
          <motion.h2 variants={item} className="mb-12 text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </motion.h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "Is this template free to use?", a: "Yes, it is completely open source and free for personal and commercial projects." },
              { q: "Can I use a different database?", a: "Absolutely! Drizzle ORM supports PostgreSQL, MySQL, and SQLite. You can switch easily." },
              { q: "How do I deploy this?", a: "We recommend Vercel for the best experience, but you can deploy to any platform that supports Next.js." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="my-32 flex w-full max-w-4xl flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 p-12 text-center"
        >
          <motion.h2 variants={item} className="text-3xl font-bold text-white sm:text-4xl">
            Ready to build something amazing?
          </motion.h2>
          <motion.p variants={item} className="mt-4 max-w-xl text-lg text-zinc-300">
            Join thousands of developers building the future of the web with Better Next.js.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex gap-4">
            <Link
              href="/posts"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div >
  );
}
