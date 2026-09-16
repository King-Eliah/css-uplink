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

## Notes

- Nothing is fetched about the visitor. Everything the breach prints is what
  the browser hands to any site: screen size, timezone, GPU string, language.
  No permission prompts, no camera, no location.
- Audio is synthesised with the Web Audio API and can be muted top-right.
  The choice is remembered.
- `prefers-reduced-motion` skips the whole sequence and lands on the links.
