import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
export default function Home() {
  return <><Header /><main id="main"><Hero />
    <section className="section container" id="work"><p className="eyebrow">01 / Selected work</p><h2>Ideas, made <em>real.</em></h2><p className="lede">From LLM pipelines to full-stack products. An engineer’s perspective on the systems behind the interface.</p><a className="text-link" href="https://github.com/Tunaycel">Explore my GitHub ↗</a></section>
    <section className="section container" id="about"><p className="eyebrow">02 / About</p><h2>Curiosity, with <em>follow-through.</em></h2><p className="lede">I’m Hüseyin Tunay Çelik, a software engineer in Wrocław, Poland. I build across the frontend, backend and cloud, with a particular interest in useful AI integration.</p></section>
    <section className="section container" id="contact"><p className="eyebrow">03 / Get in touch</p><h2>Let’s build something <em>worthwhile.</em></h2><a className="text-link" href="mailto:h.tunaycelik@gmail.com">h.tunaycelik@gmail.com ↗</a></section>
  </main><footer className="container footer"><span>© {new Date().getFullYear()} Hüseyin Tunay Çelik</span><a href="https://www.linkedin.com/in/huseyin-tunay-celik/">LinkedIn ↗</a></footer></>;
}
