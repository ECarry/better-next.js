import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/providers/theme-provider";

const readex = Readex_Pro({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BETTER-Next.JS",
  description: "A Next.js template with modern features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${readex.className} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <TRPCProvider>{children}</TRPCProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
