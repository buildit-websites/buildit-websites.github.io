# BuildIT remodel — local working copy

## Premium sales pass

- Home opens with the price ($1,250, up to 5 pages, ex GST), the phone **0403 993 242**, and a Contact us button.
- How it works pins on a desktop scroll with a progress line, and stacks on a phone or when motion is reduced.
- Current work keeps Perfect Jobs & Adventures, Lux-Lashes, and Innovo. Ember & Oat and Ironbark Electrical are example cards on the home page.
- The story stays at the bottom. There is no values marquee.
- The two free offers are removed from the public pages. `offers.html` redirects to Pricing and is noindex.
- Canonical URLs stay on `https://buildit-websites.github.io/`.

## Earlier notes


## Changes (ready to upload to buildit.net.au)

### Homepage (`index.html`)
- Removed the Honesty / Owning it / Giving back / Earning trust / Showing up values marquee and the early value-card story block.
- Replaced the strip with a subtle business-types marquee: Cafes · Trades · Salons · Clinics · Gyms · Retail · Local services.
- Reordered main flow: Hero → What you get → How it works → Work (Perfect Jobs first) → Pricing → CTA → quiet Offers → quiet Story → footer.
- Moved “Why I’m doing this” to a quiet bottom teaser (headline + short lead + link to `story.html`). No value cards on the homepage.
- An earlier pass moved two declined offer blocks lower on the page. This pass removes them from the public site.
- Rewrote meta / Open Graph / Twitter / JSON-LD descriptions toward quality websites, clear prices from $1,250, domain + optional hosting.
- Canonical and absolute URLs now point at `https://buildit-websites.github.io/`.
- Softened hero eyebrow to Northern Beaches · Australia-wide; price sticker and CTAs unchanged. Brand remains **BuildIT**.

### Sitewide
- Updated canonical, og:url, og:image, twitter:image, JSON-LD (where present), `sitemap.xml`, and `robots.txt` from `finlaysonnick74-source.github.io/buildit-nick-version` to `https://buildit-websites.github.io/`.
- Replaced the values marquee wording on inner pages with the same business-types marquee.

### Styles (`styles.css`)
- Premium polish: stronger hero hierarchy, quieter `.story--footer`, subtler business marquee, sharper card/pricing hover, quieter mega-offers.
- Respects `prefers-reduced-motion`.

### Unchanged on purpose
- Prices, plans, phone, email (`tomas@buildit.net.au`), Perfect Jobs & Adventures / Lux-Lashes / Innovo work cards, example sites, and offer copy on `offers.html` / pricing unlockable level.
- No new testimonials, metrics, or clients invented.
