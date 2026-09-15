import { createLimiter, handleContact } from "@/lib/contact";
export const runtime = "nodejs";
const allow = createLimiter();
export async function POST(request: Request) {
  return handleContact(request, {
    config: {
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO || "h.tunaycelik@gmail.com",
      origin: process.env.SITE_URL,
      trustProxy: process.env.TRUST_PROXY === "true",
    },
    fetcher: fetch,
    allow,
  });
}
