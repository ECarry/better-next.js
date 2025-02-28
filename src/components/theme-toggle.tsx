"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 relative overflow-hidden border-primary/20 bg-background"
        >
          <span className="sr-only">Toggle theme</span>
          
          {/* Tech-style animated background */}
          <motion.div 
            className="absolute inset-0 opacity-10 bg-grid-pattern"
            style={{
              backgroundImage: 
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "8px 8px"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Sun icon with animation */}
          <motion.div
            className={`absolute inset-0 flex items-center justify-center ${
              theme === "light" ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            animate={theme === "light" ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <SunIcon className="h-5 w-5" />
          </motion.div>
          
          {/* Moon icon with animation */}
          <motion.div
            className={`absolute inset-0 flex items-center justify-center ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            animate={theme === "dark" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MoonIcon className="h-5 w-5" />
          </motion.div>
          
          {/* System icon */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              theme === "system" ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <MonitorIcon className="h-5 w-5" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <MonitorIcon className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
