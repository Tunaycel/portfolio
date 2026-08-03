import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Hüseyin Tunay Çelik — Software & Cloud Security",
  description:
    "Software developer and cloud-security researcher in Wrocław. Building AI-driven real-estate software; B.Sc. thesis on Zero Trust Architecture and automated incident response in Azure. OCI certified.",
  authors: [{ name: "Hüseyin Tunay Çelik" }],
  keywords: [
    "Hüseyin Tunay Çelik",
    "Software Developer",
    "Cloud Security",
    "Zero Trust Architecture",
    "Azure Sentinel",
    "Oracle Cloud Infrastructure",
    "WSB Merito",
    "Wrocław"
  ],
  metadataBase: new URL("https://tunaycelik.dev"),
  openGraph: {
    title: "Hüseyin Tunay Çelik — Software & Cloud Security",
    description:
      "Software developer and cloud-security researcher in Wrocław.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body className="bg-ink text-bone">
        <Cursor />
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
