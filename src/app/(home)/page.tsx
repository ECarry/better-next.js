"use client";

import { motion } from "motion/react";
import Link from "next/link";
import TechMarquee from "@/components/tech-marquee";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import FloatingAnimation from "@/components/floating-animation";
import {
  ArrowRight,
  Database,
  Code,
  Sparkles,
  Shield,
  Search,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60 z-0" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingAnimation
            delay={0.5}
            className="absolute -top-10 left-1/4 transform -translate-x-1/2"
            duration={5}
          >
            <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
          </FloatingAnimation>
          <FloatingAnimation
            delay={1.5}
            className="absolute top-1/3 right-1/4 transform translate-x-1/2"
            duration={7}
          >
            <div className="w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          </FloatingAnimation>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                <span className="font-medium">Better Next.JS</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Modern Stack for <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Rapid Development
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
                A production-ready NextJS 15 template with TailwindCSS v4,
                Better-Auth, Drizzle ORM, and Neon DB - everything you need to
                build fast, secure web applications.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="https://github.com/ECarry/better-next.js">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="w-full max-w-5xl mt-16 rounded-xl overflow-hidden shadow-lg border border-border"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-muted flex items-center px-4 border-b border-border">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="pt-8 p-4 bg-card">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Terminal/Code Demo */}
                    <div className="col-span-3 bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-[350px] overflow-hidden relative">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="text-gray-400">$ </span>
                          <span className="ml-2">
                            bunx create-next-app --example
                            https://github.com/ECarry/better-next.js
                          </span>
                        </div>
                        <div>
                          <span>✓ Downloading files...</span>
                        </div>
                        <div>
                          <span>✓ Installing dependencies...</span>
                        </div>
                        <div>
                          <span>✓ Setup complete!</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-gray-400">$ </span>
                          <span className="ml-2">cd my-app</span>
                        </div>
                        <div>
                          <span className="text-gray-400">$ </span>
                          <span className="ml-2">bun run dev</span>
                        </div>
                        <div className="pt-1">
                          <span> ▲ Next.js 15.2.0</span>
                        </div>
                        <div>
                          <span> - Local: http://localhost:3000</span>
                        </div>
                        <div>
                          <span> - Network: http://192.168.1.5:3000</span>
                        </div>
                        <div>
                          <span> - API: http://localhost:3000/api</span>
                        </div>
                        <div className="pt-2">
                          <span>✓ Ready in 0.8s</span>
                        </div>
                      </div>

                      {/* Blinking cursor */}
                      <motion.div
                        className="inline-block w-2 h-4 bg-green-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>

                    {/* Feature highlights */}
                    <div className="col-span-2 flex flex-col space-y-3 p-2">
                      <div className="p-3 rounded-lg border border-border bg-muted/50 flex items-start space-x-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Authentication Ready</h3>
                          <p className="text-sm text-muted-foreground">
                            Pre-configured authentication with Better-Auth
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-border bg-muted/50 flex items-start space-x-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          <Database className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Database Setup</h3>
                          <p className="text-sm text-muted-foreground">
                            Drizzle ORM with Neon DB integration
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-border bg-muted/50 flex items-start space-x-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Modern UI</h3>
                          <p className="text-sm text-muted-foreground">
                            TailwindCSS v4 with preset components
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-border bg-muted/50 flex items-start space-x-3">
                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Performance Optimized</h3>
                          <p className="text-sm text-muted-foreground">
                            Next.js 15 with Server Components
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-border relative overflow-hidden bg-muted/30">
        <div className="">
          <h2 className="text-center text-2xl font-bold mb-6">
            Powered by Modern Technologies
          </h2>
          <TechMarquee />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <FloatingAnimation
            delay={0.8}
            className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2"
            duration={6}
          >
            <div className="w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          </FloatingAnimation>
        </div>

        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Key Features
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to build production-ready applications
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col p-6 bg-card rounded-xl border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="rounded-full p-3 bg-primary/10 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/30 border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Modern Developer Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                Our template provides a seamless developer experience with the
                latest tools and technologies.
              </p>
              <ul className="space-y-3">
                {devFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="rounded-full p-1 bg-primary/10 text-primary mt-1">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-card rounded-xl p-4 border border-border shadow-md overflow-hidden">
                <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    app/page.tsx
                  </div>
                </div>
                <pre className="text-sm overflow-x-auto font-mono text-foreground">
                  <code>{`import { Button } from "@/components/ui/button";
import db from "@/db";
import { auth } from "better-auth";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;
  
  const stats = await db.query.stats.findMany({
    where: { userId: user.id }
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {user.name}
      </h1>
      {/* Your dashboard content */}
    </div>
  );
}`}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingAnimation
            delay={1.2}
            className="absolute top-1/2 right-1/5 transform translate-x-1/2"
            duration={5}
          >
            <div className="w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
          </FloatingAnimation>
        </div>

        <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start building your next project with a fully-featured NextJS
              template designed for modern web development.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              asChild
            >
              <Link
                href="https://github.com/ECarry/better-next.js"
                target="_blank"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const features = [
  {
    title: "Next.js 15",
    description:
      "Latest version with Server Components, App Router, and built-in optimizations for better performance.",
    icon: Zap,
  },
  {
    title: "Tailwind v4",
    description:
      "Modern utility-first CSS framework for rapid UI development with the latest features.",
    icon: Sparkles,
  },
  {
    title: "Better Auth",
    description:
      "Secure authentication system with support for multiple providers, session management, and more.",
    icon: Shield,
  },
  {
    title: "Drizzle ORM",
    description:
      "Type-safe ORM for TypeScript with a simple API, great developer experience, and excellent performance.",
    icon: Code,
  },
  {
    title: "Neon DB",
    description:
      "Serverless Postgres database that scales automatically with your application needs.",
    icon: Database,
  },
  {
    title: "SEO Optimized",
    description:
      "Built-in metadata support, sitemaps, and best practices for search engine optimization.",
    icon: Search,
  },
];

const devFeatures = [
  {
    text: "End-to-end type safety with TypeScript",
    icon: Code,
  },
  {
    text: "Optimized for developer productivity",
    icon: Zap,
  },
  {
    text: "Pre-configured with best practices",
    icon: Sparkles,
  },
  {
    text: "Secure authentication out of the box",
    icon: Shield,
  },
];
