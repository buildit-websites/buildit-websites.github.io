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

- `index.html` — homepage. The three element cards link to their pages.
- `people.html`, `place.html`, `purpose.html` — what each element means.
- `why.html` — the three lines from the current site, plus where the work sits.
- `connect.html` — contact details, a note form, and a newsletter form.

## Logo

`assets/logo.svg` is the periodic-table mark: Pp People, Pl Place, Pu Purpose. The header inlines the same mark so the type stays sharp beside the Khemistry wordmark. `favicon.svg` is the three-bar version of that mark.

## Motion

On the homepage the three cards drift a few pixels and lift on hover. Sibling cards ease back. That is the only motion. It switches off when the visitor has `prefers-reduced-motion` set. The drift also pauses when a card is off screen.

## Still to come from Maidlin

- A portrait for Connect. The panel is a monogram until then. Drop the photo in `assets/` and replace the monogram in `connect.html` (there is a TODO on the figure).
- Any copy or photo changes. She is providing a mix of text and pictures.
- Formspree endpoints for the note form and the newsletter. Search `connect.html` for `TODO`, put the URL in each form `action`, and remove `data-preview` so `main.js` lets the browser submit.
- Confirm that 585 Little Collins Street should stay on the public footer.
- When the site moves to khemistry.co, update the canonical and Open Graph URLs (they currently point at the GitHub Pages preview).
