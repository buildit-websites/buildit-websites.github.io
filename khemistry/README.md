# Khemistry

Static site for Maidlin Mistry. Navy, teal and cream. The public voice is deliberately not a recruitment site: no role list, no job board. People, Place and Purpose are the three pages.

Preview, once merged: https://buildit-websites.github.io/khemistry/

The live domain stays [khemistry.co](https://khemistry.co/).

## Open locally

From the repository root:

```sh
python3 -m http.server 8080
```

Then open http://localhost:8080/khemistry/

Links and assets are relative, so the same files work in this folder on GitHub Pages and on a local server. There is no build step.

## Pages

- `index.html` — homepage. The first screen is a navy strip of three square element cells, Pp + Pl + Pu, each linking to its page.
- `people.html`, `place.html`, `purpose.html` — what each element means.
- `why.html` — the three lines from the current site, plus where the work sits.
- `connect.html` — contact details, a note form, and a newsletter form.

## Logo

`assets/logo.svg` is a sharp teal network mark in the spirit of the khemistry.co logo: nodes and links in a brain-like molecule. The header inlines it beside the wordmark. `favicon.svg` is the same mark on cream. The homepage hero is still the Pp + Pl + Pu formula.

The page background is a soft cream wash. Faint DNA, orbital, and molecule drawings sit in the margins. They are static.

## Photographs

The pictures in `assets/` are Unsplash photos, free to use under the [Unsplash License](https://unsplash.com/license). Replace them with Maidlin’s own pictures when they arrive.

- `people.webp` — [photo-1529156069898-49953e39b3ac](https://unsplash.com/photos/1529156069898-49953e39b3ac)
- `place.webp` — Melbourne across the Yarra, [photo-1514395462725-fb4566210144](https://unsplash.com/photos/1514395462725-fb4566210144)
- `purpose.webp` — [photo-1499750310107-5fef28a66643](https://unsplash.com/photos/1499750310107-5fef28a66643)

## Motion

On the homepage the three element cells drift a few pixels and lift on hover. Sibling cells ease back. That is the only motion. It switches off when the visitor has `prefers-reduced-motion` set. The drift also pauses when a cell is off screen.

## Still to come from Maidlin

- A portrait for Connect. The panel is a monogram cell (Mm) until then. Drop the photo in `assets/maidlin.webp` and replace the monogram in `connect.html` (there is a TODO on the figure).
- Any copy or photo changes. She is providing a mix of text and pictures.
- Formspree endpoints for the note form and the newsletter. Search `connect.html` for `TODO`, put the URL in each form `action`, and remove `data-preview` so `main.js` lets the browser submit.
- Confirm that 585 Little Collins Street should stay on the public footer.
- When the site moves to khemistry.co, update the canonical and Open Graph URLs (they currently point at the GitHub Pages preview).
