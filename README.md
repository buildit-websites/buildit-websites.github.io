# BuildIt website

Static site: plain HTML, CSS and vanilla JavaScript. No build step.

## Run locally

```sh
python3 -m http.server 8080
```

Then open http://localhost:8080

## Files

- `index.html`: the home page
- `styles.css`: all styles
- `main.js`: site details (name, email), mobile nav, scroll reveal, card tilt, cursor trail
- `404.html`: page shown for missing URLs
- `favicon.svg`, `robots.txt`, `sitemap.xml`
- `og-image.png`: 1200x630 social sharing image
- `netlify.toml`: publishes the repo root with basic security headers

## Changing the business name or email

Edit the `SITE` object at the top of `main.js`. Also update the copies in the `<head>` of `index.html`
(title, meta description, Open Graph, Twitter, canonical, JSON-LD) and the email link in `404.html`, because those are read without JavaScript.

## Live URL

The site URL `https://buildit-websites.netlify.app` appears in `index.html` (canonical, Open Graph, Twitter, JSON-LD), `sitemap.xml` and `robots.txt`. Update all of them if the domain changes.
