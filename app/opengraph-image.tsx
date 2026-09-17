import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt = "Hüseyin Tunay Çelik — Building what’s next. Software, AI and research.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const [serif, sans, sansExtended] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        "node_modules/@fontsource/antonio/files/antonio-latin-600-normal.woff",
      ),
    ),
    readFile(
      path.join(
        process.cwd(),
        "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff",
      ),
    ),
    readFile(
      path.join(
        process.cwd(),
        "node_modules/@fontsource/dm-sans/files/dm-sans-latin-ext-400-normal.woff",
      ),
    ),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#111713",
        color: "#e9efe6",
        padding: "56px 64px",
        fontFamily: "DM Sans, DM Sans Extended",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
        <span>tunayçelik *</span>
        <span>SOFTWARE ENGINEER / AI & FULL-STACK</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          lineHeight: 1.08,
          letterSpacing: -3,
        }}
      >
        <span style={{ fontFamily: "Antonio", fontWeight: 600 }}>BUILDING WHAT’S</span>
        <span style={{ fontFamily: "Antonio", fontWeight: 600, fontSize: 125, color: "#c5f58b" }}>
          NEXT.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #405035",
          paddingTop: 25,
          fontSize: 23,
        }}
      >
        <span>Hüseyin Tunay Çelik</span>
        <span style={{ color: "#c5f58b" }}>Wrocław, Poland</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Antonio", data: serif, style: "normal", weight: 600 },
        { name: "DM Sans", data: sans, style: "normal", weight: 400 },
        { name: "DM Sans Extended", data: sansExtended, style: "normal", weight: 400 },
      ],
    },
  );
}
