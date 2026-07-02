import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Hüseyin Tunay Çelik — Zero Trust Architecture",
  description:
    "Software Developer & Cloud Security Researcher based in Wrocław. Bachelor thesis on Automated Incident Response and Zero Trust Architecture in cloud environments. OCI 2025 Certified.",
  authors: [{ name: "Hüseyin Tunay Çelik" }],
  keywords: [
    "Hüseyin Tunay Çelik",
    "Zero Trust Architecture",
    "Cloud Security",
    "Azure Sentinel",
    "Oracle Cloud Infrastructure",
    "RAG",
    "WSB Merito",
    "Wrocław"
  ],
  metadataBase: new URL("https://tunaycelik.dev")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable}`}>
      <body className="bg-void text-bone selection:bg-cyan-glow/30">
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
