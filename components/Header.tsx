import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
export function Header() {
  return (
    <header className="header container">
      <Link className="wordmark" href="/" aria-label="Hüseyin Tunay Çelik, home">
        <span className="studio-mark" aria-hidden="true">
          HTÇ
        </span>
        <span className="wordmark-name">Hüseyin Tunay Çelik</span>
      </Link>
      <nav aria-label="Main navigation">
        <a href="/#work">
          Work <sup>05</sup>
        </a>
        <a href="/#research">Research</a>
        <a href="/#about">About</a>
        <a className="nav-contact" href="/#contact">
          Let’s talk <ArrowIcon />
        </a>
      </nav>
    </header>
  );
}
