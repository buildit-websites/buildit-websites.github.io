# BuildIT remodel — local working copy

## Phone, free offers, story

- The published phone is **0403 993 241** (`tel:+61403993241`).
- The home hero keeps price and phone on the left. A glass card on the open right holds the first 5 websites free for an honest review, spots left from `SITE.freeSpotsLeft` in `main.js` (set to 5), why those five are free, and a separate ongoing free offer for charities and community groups.
- The story says Tomas is flipping his life around, and is changing his life through BuildIT and learning in the AI industry.
- Level 1 stays $1,250. Level 2 stays $1,800 up front, then $99 a month.

## Offers

- Social media marketing is off the site: the Level 3 card, the Services section, the comparison column, the nav link, and the contact plan choice.
- Level 1 stays Design & build at $1,250. Level 2 stays Design & build + Hosting & monitoring at $1,800 up front, then $99 a month.

## Premium atmosphere pass

- Removed the square grid, the film-grain overlay, and the cursor trail.
- Pages sit on a navy aurora. On a fine pointer, the lights swell when the cursor moves through open background. Reduced motion and touch leave them still.
- Work cards (Perfect Jobs, Lux-Lashes, Innovo, Ember & Oat, Ironbark) scroll the full screenshot on hover. The frame is shorter on a mouse so the travel is obvious. Touch and reduced motion keep the top of the screenshot still.
- Prices, phone, email, and the story at the bottom are unchanged.

## Premium sales pass

- Home opens with the price ($1,250, up to 5 pages, ex GST), the phone **0403 993 241**, and a Contact us button.
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
