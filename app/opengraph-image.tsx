import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt = "Hüseyin Tunay Çelik — Thoughtful code. Real-world impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const serif = await readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f4f2eb",
        color: "#262820",
        padding: "56px 64px",
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
        <span>Thoughtful code.</span>
        <span style={{ fontFamily: "Instrument", fontStyle: "italic", fontSize: 105 }}>
          Real-world impact.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #d5d5ca",
          paddingTop: 25,
          fontSize: 23,
        }}
      >
        <span>Hüseyin Tunay Çelik</span>
        <span style={{ color: "#b44020" }}>Wrocław, Poland ↗</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Instrument", data: serif, style: "italic", weight: 400 }] },
  );
}
