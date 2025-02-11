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

const TechMarquee = () => {
  return (
    <div className="flex items-center gap-12 p-8 rounded-xl">
      <div className="relative flex-1 overflow-hidden">
        <MarqueeCard pauseOnHover className="[--duration:30s]">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-4">
              <tech.icon className="size-8" />
              <span className="select-none">{tech.name}</span>
            </div>
          ))}
        </MarqueeCard>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white" />
      </div>
    </div>
  );
};

export default TechMarquee;
