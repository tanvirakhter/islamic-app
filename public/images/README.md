# Images

Drop image files here. Anything in `public/` is served from the site root,
so a file at `public/images/hero-portrait.jpg` is referenced as:

```tsx
import Image from "next/image";

<Image src="/images/hero-portrait.jpg" alt="…" width={600} height={800} />
```

or as a plain CSS/inline background:

```tsx
style={{ backgroundImage: "url('/images/hero-portrait.jpg')" }}
```

Note: the leading `/images/...` path does **not** include `public`.

Suggested names for the hero cards (Eductix-style grid):
- `hero-card-1.jpg`  — tall brand/portrait card (top-left)
- `hero-card-overlay.jpg` — image with overlay label
- `hero-card-portrait.jpg` — bottom-right tall portrait
