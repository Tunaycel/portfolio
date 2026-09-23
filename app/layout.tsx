import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-ext-400.css";
import "@fontsource/dm-sans/latin-ext-500.css";
import "@fontsource/dm-sans/latin-ext-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";
import "@fontsource/antonio/latin-600.css";
import "@fontsource/antonio/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-ext-400.css";
import "./studio.css";
import "./research.css";
import { siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: { default: "Hüseyin Tunay Çelik — Software Engineer", template: "%s — Tunay Çelik" },
  description:
    "Hüseyin Tunay Çelik is a software engineer in Wrocław working across product development, applied machine learning and cloud systems. Explore selected projects and engineering experience.",
  authors: [{ name: "Hüseyin Tunay Çelik" }],
  metadataBase: siteUrl(),
  openGraph: {
    title: "Hüseyin Tunay Çelik — Software Engineer",
    description:
      "Software engineering, product development and cloud systems by Hüseyin Tunay Çelik.",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
