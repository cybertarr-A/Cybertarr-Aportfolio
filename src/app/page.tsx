import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { SystemsBuilt } from "@/components/sections/SystemsBuilt";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <ProjectsExplorer />
      <SystemsBuilt />
      {/* Additional sections will be added here: */}
    </div>
  );
}
