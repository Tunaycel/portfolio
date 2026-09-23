import Link from "next/link";
import { Header } from "@/components/Header";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container section">
        <p className="eyebrow">404 / Off the map</p>
        <h1>
          This page took
          <br />a <em>different path.</em>
        </h1>
        <p className="lede">
          The page you’re looking for doesn’t exist. There’s plenty of work to explore back home.
        </p>
        <Link className="text-link" href="/">
          Back to the portfolio
        </Link>
      </main>
    </>
  );
}
