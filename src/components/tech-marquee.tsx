import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiShadcnui,
  SiVercel,
  SiAuthelia,
  SiDrizzle,
  SiTrpc,
} from "react-icons/si";
import { MarqueeCard } from "./marquee-card";
import { cn } from "@/lib/utils";

const technologies = [
  {
    icon: SiReact,
    name: "React",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
  },
  {
    icon: SiDrizzle,
    name: "Drizzle ORM",
  },
  {
    icon: SiTrpc,
    name: "tRPC",
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
  },
  {
    icon: SiShadcnui,
    name: "Shadcn UI",
  },
  {
    icon: SiAuthelia,
    name: "Better Auth",
  },
  {
    icon: SiVercel,
    name: "Vercel",
  },
];

interface Props {
  bgColor?: string;
}

const TechMarquee = ({ bgColor }: Props) => {
  return (
    <div className="flex items-center gap-12 py-8 rounded-xl">
      <div className="relative flex-1 overflow-hidden">
        <MarqueeCard pauseOnHover className="[--duration:30s]">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-4">
              <tech.icon className="size-8" />
              <span className="select-none">{tech.name}</span>
            </div>
          ))}
        </MarqueeCard>

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r",
            bgColor && `from-${bgColor}`
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l",
            bgColor && `from-${bgColor}`
          )}
        />
      </div>
    </div>
  );
};

export default TechMarquee;
