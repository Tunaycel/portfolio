import { createHash } from "node:crypto";

type Contact = { name: string; email: string; message: string; website?: string };
type Config = { apiKey?: string; from?: string; to?: string; origin?: string; trustProxy?: boolean };
type Dependencies = { config: Config; fetcher: typeof fetch; allow: (key: string) => boolean };
const maxBytes = 12_000;
const reply = (status: number, message: string) => Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export function validateContact(value: unknown): Contact | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.name !== "string" || typeof v.email !== "string" || typeof v.message !== "string") return null;
  if (v.website !== undefined && typeof v.website !== "string") return null;
  const name = v.name.trim(), email = v.email.trim(), message = v.message.trim();
  if (name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f\x7f]/.test(name)) return null;
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\x00-\x1f\x7f]/.test(email)) return null;
  if (message.length < 20 || message.length > 4000 || message.includes("\0")) return null;
  return { name, email, message, website: typeof v.website === "string" ? v.website : "" };
}

// Bounded process-local limiter. Configure a trusted edge limit for multi-instance deployments.
export function createLimiter(now = Date.now) {
  const buckets = new Map<string, { count: number; expires: number }>();
  return (key: string) => {
    const time = now();
    for (const [id, value] of buckets) if (value.expires <= time) buckets.delete(id);
    const bucket = buckets.get(key);
    if (bucket) { if (bucket.count >= 5) return false; bucket.count++; return true; }
    if (buckets.size >= 1000) return false;
    buckets.set(key, { count: 1, expires: time + 10 * 60_000 });
    return true;
  };
}

async function readBoundedBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maxBytes) throw new RangeError("Body too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder();
  let bytes = 0, body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) { await reader.cancel(); throw new RangeError("Body too large"); }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function handleContact(request: Request, { config, fetcher, allow }: Dependencies): Promise<Response> {
  const origin = request.headers.get("origin");
  let expected: string;
  try { expected = new URL(config.origin || request.url).origin; }
  catch { return reply(503, "Contact is unavailable. Please email h.tunaycelik@gmail.com."); }
  if (!origin || origin !== expected) return reply(403, "Please send your message from this website.");
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415, "Please send a JSON request.");
  let data: Contact | null;
  try { data = validateContact(await readBoundedBody(request)); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 400, "Please check the message size and format."); }
  if (!data) return reply(400, "Enter a name, a valid email and a message of 20–4,000 characters.");
  if (data.website) return reply(400, "The message could not be accepted. Please email me directly.");
  if (!config.apiKey || !config.from || !config.to) return reply(503, "The contact form is unavailable. Please email h.tunaycelik@gmail.com.");
  // Only trust forwarding headers when the deployment edge overwrites them.
  const address = config.trustProxy ? (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "shared") : "shared";
  const key = createHash("sha256").update(address).digest("hex");
  if (!allow(key)) return reply(429, "Too many messages. Please wait 10 minutes or email me directly.");
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ from: config.from, to: [config.to], reply_to: data.email, subject: `Portfolio enquiry from ${data.name}`, text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}` })
    });
    if (!response.ok) return reply(502, "Your message could not be sent. Please try again or email me directly.");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) return reply(502, "Delivery could not be confirmed. Please email me directly.");
    return reply(200, "Your message has been accepted for delivery. Thank you for getting in touch.");
  } catch { return reply(502, "Delivery could not be confirmed. Please email me directly."); }
}
