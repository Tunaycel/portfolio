import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
export default function Home() {
  return <><Header /><main id="main"><Hero />
    <Work/><About/>
    <Contact/>
  </main><footer className="container footer"><span>© {new Date().getFullYear()} Hüseyin Tunay Çelik</span><a href="https://www.linkedin.com/in/huseyin-tunay-celik/">LinkedIn ↗</a></footer></>;
}
