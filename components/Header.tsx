import Link from "next/link";
export function Header() {
  return (
    <header className="header container">
      <Link className="wordmark" href="/" aria-label="Tunay Çelik, home">
        <span className="studio-mark" aria-hidden="true">
          tç
        </span>
        <span className="wordmark-name">
          TUNAY
          <br />
          ÇELIK
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <a href="/#work">
          Work <sup>05</sup>
        </a>
        <a href="/#research">Research</a>
        <a href="/#about">About</a>
        <a className="nav-contact" href="/#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
