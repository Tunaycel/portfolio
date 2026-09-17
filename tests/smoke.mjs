import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { setTimeout as pause } from "node:timers/promises";
const port = 3109;
const base = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, RESEND_API_KEY: "", CONTACT_FROM: "" },
  },
);
let log = "";
server.stdout.on("data", (chunk) => (log += chunk));
server.stderr.on("data", (chunk) => (log += chunk));
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    try {
      const response = await fetch(base);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await pause(250);
  }
  assert.ok(ready, `Production server failed to start: ${log}`);
  const routes = [
    "/",
    "/resume",
    "/research/azure-incident-response",
    "/work/local-llm-pipeline",
    "/work/pazarpilot",
    "/work/plusemlak",
    "/work/cvforge",
    "/work/data-stock",
  ];
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<h1[ >]/, route);
    assert.match(html, /Hüseyin Tunay Çelik/, route);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    console.log(`PASS ${route}`);
  }
  for (const route of ["/does-not-exist", "/work/not-a-project"]) {
    assert.equal((await fetch(base + route)).status, 404);
    console.log(`PASS 404 ${route}`);
  }
  assert.match(await (await fetch(base + "/robots.txt")).text(), /Disallow: \/api\//);
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  if (process.env.SITE_URL) assert.match(sitemap, /<loc>.*\/resume<\/loc>/);
  const image = await fetch(base + "/opengraph-image");
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/png/);
  assert.ok((await image.arrayBuffer()).byteLength > 1000);
  assert.equal((await fetch(base + "/api/contact")).status, 405);
  assert.equal(
    (
      await fetch(base + "/api/contact", {
        method: "POST",
        headers: {
          origin: new URL(process.env.SITE_URL || base).origin,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Recruiter",
          email: "test@example.com",
          message: "This test does not deliver any real email.",
        }),
      })
    ).status,
    503,
  );
  console.log("PASS metadata, images, headers, 404s, method restrictions and unavailable contact");
} finally {
  server.kill();
}
