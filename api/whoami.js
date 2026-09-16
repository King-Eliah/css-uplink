/**
 * Whoami — reads back the geo headers Vercel already attaches to the request.
 *
 * Deliberately not a third-party IP lookup: no API key, no rate limit, and the
 * visitor's address is never handed to anyone else. Nothing is stored or
 * logged here; the response is computed per request and cached nowhere.
 */

export const config = { runtime: "edge" };

export default function handler(request) {
  const h = request.headers;

  const decode = (value) => {
    if (!value) return null;
    try { return decodeURIComponent(value); } catch { return value; }
  };

  // Only the first hop is the client; the rest is proxy chain.
  const forwarded = (h.get("x-forwarded-for") || "").split(",")[0].trim();

  // Last group masked. Enough to land the joke, not enough to travel in a
  // screenshot someone posts to a group chat.
  const maskedIp = forwarded
    ? forwarded.includes(":")
      ? forwarded.split(":").slice(0, 3).join(":") + ":····"
      : forwarded.split(".").slice(0, 3).join(".") + ".•••"
    : null;

  const round = (value) => {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n.toFixed(2) : null;
  };

  const body = {
    ip: maskedIp,
    city: decode(h.get("x-vercel-ip-city")),
    region: decode(h.get("x-vercel-ip-country-region")),
    country: h.get("x-vercel-ip-country"),
    // Coarse on purpose: this is city-level, so it is shown to two decimals.
    lat: round(h.get("x-vercel-ip-latitude")),
    lon: round(h.get("x-vercel-ip-longitude")),
    asn: h.get("x-vercel-ip-as-number"),
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
