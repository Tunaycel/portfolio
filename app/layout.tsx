import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Hüseyin Tunay Çelik — Software Engineer", template: "%s — Tunay Çelik" },
  description: "Software engineer in Wrocław building AI integrations, full-stack products and cloud systems. Explore selected work, engineering decisions and experience.",
  authors: [{ name: "Hüseyin Tunay Çelik" }],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
