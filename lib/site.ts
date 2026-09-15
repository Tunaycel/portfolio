export function siteUrl(): URL | undefined {
  if (!process.env.SITE_URL) return undefined;
  const url = new URL(process.env.SITE_URL);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("SITE_URL must be an HTTP(S) URL");
  return new URL(url.origin);
}
