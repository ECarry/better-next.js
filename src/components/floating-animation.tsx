"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface FloatingAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

/**
 * A component that applies a subtle floating animation to its children
 */
const FloatingAnimation = ({
  children,
  delay = 0,
  duration = 4,
  className = "",
  yOffset = 10,
}: FloatingAnimationProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingAnimation;
