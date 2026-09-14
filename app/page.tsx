import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
export default function Home() {
  return <><Header /><main id="main"><Hero />
    <Work/><About/>
    <section className="section container" id="contact"><p className="eyebrow">03 / Get in touch</p><h2>Let’s build something <em>worthwhile.</em></h2><a className="text-link" href="mailto:h.tunaycelik@gmail.com">h.tunaycelik@gmail.com ↗</a></section>
  </main><footer className="container footer"><span>© {new Date().getFullYear()} Hüseyin Tunay Çelik</span><a href="https://www.linkedin.com/in/huseyin-tunay-celik/">LinkedIn ↗</a></footer></>;
}
