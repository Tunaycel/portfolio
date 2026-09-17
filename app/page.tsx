import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { ResearchFeature } from "@/components/ResearchFeature";
import { Contact } from "@/components/Contact";
import { projects } from "@/lib/projects";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Work
          projects={projects.map(({ slug, name, category, summary, stack, role }) => ({
            slug,
            name,
            category,
            summary,
            stack,
            role,
          }))}
        />
        <ResearchFeature />
        <About />
        <Contact />
      </main>
      <footer className="container footer">
        <span>© {new Date().getFullYear()} Hüseyin Tunay Çelik</span>
        <a href="https://www.linkedin.com/in/huseyin-tunay-celik/">LinkedIn ↗</a>
      </footer>
    </>
  );
}
