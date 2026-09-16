# KNUST CSS Uplink

Link hub for the KNUST Computer Science Society. Reached by scanning the QR
code on the back of the society shirt.

The page breaks into your device, reads its own details back at you, then
admits every website already sees all of it. Green phosphor, synthesised
audio, no dependencies beyond GSAP from a CDN.

## Adding links

Open `index.html` and find the block marked **EDIT YOUR LINKS HERE** near the
top of the script:

```js
const JOIN_URL = "";

const LINKS = [
  { cmd: "website",   href: "" },
  { cmd: "instagram", href: "" },
  ...
];
```

Put a real URL in `href` and that row goes live on its own — the SOON chip
disappears and it opens in a new tab. Leave it empty and the row stays
honestly marked as not ready yet.

Commit and push; GitHub Pages redeploys on its own.

## What the breach reads

Three blocks, all of it routinely available to any website:

- **hardware** — handset model (via Client Hints on Android), OS, core count,
  RAM, GPU string, screen size and measured refresh rate, battery, and the
  storage quota the browser offers the page.
- **network** — city, country, coarse coordinates, ASN and a masked IP. These
  come from `api/whoami.js`, an edge function that simply reads back the geo
  headers Vercel already attaches to the request. No third-party IP lookup,
  no API key, no rate limit, and the address is never handed to anyone else.
- **habits** — browser, locale, timezone, dark-mode preference, local time.

Nothing is stored, logged or sent anywhere. The last octet of the IP is
masked so a screenshot can be shared safely. No permission prompts are ever
raised: no camera, no microphone, no geolocation API.

## Notes
- Audio is synthesised with the Web Audio API and can be muted top-right.
  The choice is remembered.
- `prefers-reduced-motion` skips the whole sequence and lands on the links.
