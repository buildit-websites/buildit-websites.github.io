# BuildIT — Nick's version

An extended copy of [Tomas's BuildIT site](https://buildit-websites.github.io/) so Nick can show Tomas what he would add: real pages in the top navigation, local Northern Beaches positioning, a pricing comparison, a contact form, a story page, a charity offer, a founding-clients offer, optional hosting, and social media marketing. It is plain HTML, CSS and JavaScript. There is no build step, so it can be hosted on GitHub Pages.

Tomas's published site matches the `fix/qa-round-1` branch of [buildit-websites/buildit-websites.github.io](https://github.com/buildit-websites/buildit-websites.github.io), not the shorter page currently on that repo's `main` branch. This copy starts from the live site: same BuildIT branding, offer, examples, current work, FAQ, phone, email and prices.

## Run locally

From this folder:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080

Check a phone width in the browser's device toolbar (about 390px wide). The menu button should open every tab, including Why I'm doing this, Offers and Contact.

## Pages

| Page | File | What it is for |
| --- | --- | --- |
| Home | `index.html` | The offer, why I'm doing this (near the top), four steps, current work, founding and charity offers, prices, and a contact call to action |
| Services | `services.html` | Website, optional hosting, and social media marketing |
| Work | `work.html` | Perfect Jobs & Adventures (live site Tomas built), Lux-Lashes, Innovo, Ember & Oat, Ironbark Electrical |
| Pricing | `pricing.html` | Four offers and a comparison table. Two prices say Placeholder |
| Offers | `offers.html` | Two separate offers. Every Northern Beaches charity: free design and build, no limit. First 5 local businesses only: free design and build. Hosting isn't included |
| Why I'm doing this | `story.html` | First person, present tense: changing now, one honest job at a time, and core values tied to what he does |
| How it works | `how-it-works.html` | The four steps, with hosting called out as optional |
| About | `about.html` | First person. Northern Beaches. Links to Why I'm doing this. No invented suburbs or life history |
| FAQ | `faq.html` | The live-site questions, updated where hosting changed, plus the new offers |
| Contact | `contact.html` | Phone, email, and a form that emails tomas@buildit.net.au through FormSubmit |
| Start your project | `brief.html` | Client design brief. Posts to the same FormSubmit address. Mailto stays as a fallback |
| Thanks | `thanks.html` | The page FormSubmit opens after a contact or brief form is sent |
| Ideas from Dad | `ideas.html` | Notes file kept in the repo. `noindex`. Not linked from the nav, footer, or sitemap |
| Examples | `examples/cafe/`, `examples/electrician/` | Tomas's demo sites, unchanged apart from the "Back to BuildIT" link, which now opens the Work page |

The change log lives in this README. `ideas.html` is still in the repo, marked `noindex`, and is not linked from the nav, footer, or sitemap.

## Ideas from Dad

Each item is something a small web-business site benefits from. Take the ones you want. The rest can be deleted without breaking the others.

1. **Tabs, one job per page.** Home, Why I'm doing this, Services, Social, Work, Pricing, Offers, How it works, About, FAQ and Contact. Social jumps to the social media marketing section. The look is All In: huge type, a tilted magenta word, a cyan price sticker, a scrolling values strip, tilted value cards, and big offer cards. Pricing is levels in that look. Level 3 is social media marketing and the price says Ask me. The cursor trail and the scroll-in reveal are the same code as Tomas's live site. The trail stays off when reduced motion is on. A mouse move draws it on empty background. A touch pointer does not. A finger drag still draws over the background, which is what the live site does.

2. **Your copy stays put.** Branding, Ember & Oat, Ironbark Electrical, Lux-Lashes ([lux-lashes.com](https://www.lux-lashes.com)), and Innovo ([innovotech.com](https://www.innovotech.com)) are from the live site. The email is now **tomas@buildit.net.au**. See item 19. [Perfect Jobs & Adventures](https://perfectjobsandadventures.github.io/) is a real site Tomas built. It is first under Current work on the home page and the Work page, tagged Live site, ahead of the example designs. The card image is a screenshot of the live homepage at `assets/work/perfectjobs.png`. The link opens in a new tab. The description says what the site is. No stats, results or testimonials were added. The phone number is **+61 403 993 241** (`tel:+61403993241`) on every page, the call buttons, and the search listing. The dollar amounts are the same: **Design & build $1,250 one-time**, **Design & build + Hosting & monitoring $1,800 up front, then $99 a month**. Hosting is no longer inside the $1,250. See item 15.

3. **Pricing comparison table.** Four columns: Design & build, Design & build + Hosting & monitoring, Hosting & monitoring only, and Social media marketing. Included and not included are written in words. Unset prices say Placeholder. On a narrow screen the table scrolls sideways and the first column stays visible. Items that were only on the published Website + Care plan stay on the $1,800 column. They are listed as themselves, not quietly renamed "monitoring". Backups, security updates and email support on hosting-only say Placeholder, because they were not a separate hosting-only list.

4. **About you, and the Northern Beaches.** Local customers want a name and a place. The About page says "I'm Tomas. BuildIT is my studio." and links to Why I'm doing this. The same place shows in the home eyebrow, the footer, and the page's schema `areaServed`. No suburbs, work history, client numbers or awards were invented.

5. **Contact and brief forms email Tomas directly.** Both forms post to FormSubmit at `https://formsubmit.co/tomas@buildit.net.au`. Contact uses the subject "BuildIT website enquiry". The brief uses "BuildIT design brief". Both use a table template, captcha off, a `_honey` honeypot, and `_next` `https://buildit-websites.github.io/thanks.html`. `main.js` does not turn submit into a mailto. Phone and email links stay as a fallback. The first submission sends FormSubmit's one-time activation email.

6. **A next step on every page.** Each customer page ends with Contact, Call, or both, plus the phone number and email. People decide on the page they are already reading.

7. **Mobile navigation.** Why I'm doing this and Offers are extra tabs. From 1040px wide and down, the links move into a menu button. The open menu scrolls on a short screen, Escape closes it, and it closes when a link is chosen. From 1041px to 1420px the desktop links use a slightly tighter gap so the longer tab still fits at 1280px.

8. **Colour contrast.** The dark BuildIT palette is unchanged. Checked against `#070a16`: body text `#eef2ff` about 17.7:1, muted text `#b4bed8` about 10.6:1, cyan `#22d3ee` about 10.9:1, violet `#a78bfa` about 7.3:1, magenta `#f472b6` about 7.5:1. WCAG AA for normal text is 4.5:1. The pricing table still says "Included" and "Not included" in words, so the difference is not colour alone. Focus outlines stay cyan.

9. **Share preview.** Every public page has `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card` (`summary_large_image`) and `twitter:image`, pointing at the existing `og-image.png` (1200×630). Absolute URLs are required for iMessage, Facebook, LinkedIn and similar. The image file is the one already on Tomas's site.

10. **No invented social proof.** No testimonials, star ratings, client counts or awards. Unset prices still say Placeholder. The why-copy is a first-person draft from the reasons Nick gave. It does not add life events, history, numbers or quotes.

11. **Relative links and `.nojekyll`.** Links between pages are relative, so the site works in a local folder and in a GitHub project site (which is served from `/buildit-nick-version/`, not the domain root). `.nojekyll` tells GitHub Pages to serve the files as they are, instead of running Jekyll.

12. **Why I'm doing this.** `story.html` is a first-person page, linked from the home section under the hero, from About, and from its own nav tab. The draft is present tense: not long ago I was making choices I'm not proud of, and I hurt people. I'm changing that, right now. This business is how I'm doing it, one honest job at a time. The charity offer and the first-5 business offer are separate. My core values are what I'm doing now, every day: honesty (real price and timeline, no surprises), owning it (if I get something wrong, I fix it), giving back, earning trust, and showing up (I do what I say, when I say). Public pages do not say the copy is a placeholder. Ideas from Dad is the only place that asks Tomas to edit it into his own words. The home headline no longer says "We build it, host it and keep it running", because that promised hosting on every job. The Open Graph image still contains that line, so its alt text still describes the image.

13. **Charity offer.** A separate offer from the first 5 businesses. The public line is: "Free for every Northern Beaches charity, with no limit: I'll design and build your website for free." Then: "The design and build is free. Hosting isn't included. All I ask is an honest review." There is no page charge, no revision charge, and no price in that copy. It does not say hosting is free. It is on Home, Offers, Pricing, Services, the brief, Contact, and the FAQ.

14. **First 5 local businesses.** The public line is: "Free for my first 5 local businesses: the first 5 Northern Beaches businesses get their website designed and built for free." The limit of 5 is only for local businesses. It is not a cap on charities, and it is not a count of businesses already taken. The design and build is free. Hosting isn't included. All I ask is an honest review. There is no obligation. No review was written. Paid prices stay on the paid plans.

15. **Hosting is optional.** Design & build is the existing **$1,250** and does not include hosting. Domain setup stayed on that price, because the live site already included the domain at $1,250. Design & build + Hosting & monitoring is the existing **$1,800** up front, then **$99 a month**. Hosting & monitoring only has no price: the card, the table and the form say **Placeholder**. The contact form opens the matching choice from `?plan=design`, `design-hosting`, `hosting`, `social`, `charity` or `founding`.

16. **Social media marketing.** Post building, content creation, and active sales and marketing via socials. Added on Services (`#social`), Pricing (`#social`), the home price cards, the comparison table, the FAQ and the contact form. Not a separate tab. The price says **Placeholder**. Networks and volume are not set. No results, follower counts or ad spend were added. Public pages do not carry a note asking Tomas to fill the price in.

17. **One assurance line.** There is no contracts page and no contract download. Contract sections, the contact card, the lines beside prices, and the FAQ question "Who is the contract with?" are removed. The footer on every page says: "BuildIT is backed by Nick Finlayson, and the work is contracted through Innovo." Innovo links to https://innovotech.com. The Work lead says Tomas built Perfect Jobs & Adventures, and that Nick Finlayson built the Lux-Lashes and Innovo sites.

18. **Page limits.** Design & build is **$1,250 ex GST** for up to 5 pages and 3 revisions. Design & build + Hosting & monitoring is **$1,800 up front, then $99 a month, ex GST** for up to 8 pages, basic SEO set-up (titles, descriptions, a Google Business link, and analytics), hosting and monitoring, and 3 revisions. Extra pages are **$150 per page, ex GST**, on either paid plan. Those limits are on the home price cards, Pricing (paid levels, paid plan cards, and the comparison table), Services, and the paid FAQ answers, including "What if I need more pages?" They are not written into the free offers.

19. **Email.** Tomas's address is **tomas@buildit.net.au**, in `main.js`, the contact blocks, mailto links, the FormSubmit form action, structured data, `404.html`, and the two example sites. The public canonical URL is still the GitHub Pages address. No CNAME is set. FormSubmit's thank-you address is `https://buildit-websites.github.io/thanks.html`.

20. **Prices are ex GST.** Said on the Pricing page: in the introduction, above the four offers, on the comparison headings, in the table caption, and in the FAQ. The home price section says it too, so those figures are not read as GST-inclusive. The dollar amounts are unchanged. No GST was added on top.

## Files

- `index.html`, `story.html`, `offers.html` and the other pages listed above
- `styles.css`: Tomas's styles, plus layout for the page heroes, comparison table, form, placeholders and the earlier menu breakpoint
- `main.js`: site details (name, email, phone), mobile nav, the contact-form plan link, scroll reveal, card tilt, cursor trail
- `404.html`: missing URLs. On GitHub project Pages, a small script points its CSS at `/buildit-nick-version/` when the missing address is nested
- `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`
- `work/`: screenshots of Lux-Lashes and Innovo
- `assets/work/perfectjobs.png`: screenshot of the Perfect Jobs & Adventures homepage, used on the Current work cards
- `examples/cafe/` and `examples/electrician/`: the two demo sites (each a single `index.html` with its own CSS, photos in `img/`, and `preview.webp` for the thumbnail)
- `netlify.toml`: `publish = "."` and no build command, so Netlify can serve the files as they are. GitHub Pages ignores it
- `brief.html`: the Start your project design brief
- `.nojekyll`: see above

`ideas.html` is left out of `sitemap.xml`, marked `noindex`, and is not linked from the nav or footer.

21. **Start your project.** `brief.html` is a grouped design brief in the All In look: business, goals, pages, look and feel, features, content, and plan. The paid-plan note says up to 5 pages on the $1,250 build, up to 8 on Website + Care, and extra pages at $150 ex GST. Submit posts to FormSubmit with the subject "BuildIT design brief", then opens `thanks.html`. A mailto link stays on the form as a fallback. The header button on each page says Start your project. Pricing, How it works, and Contact link to it. `netlify.toml` publishes `.` with no build command. Canonical URLs stay on the GitHub Pages address. No CNAME is set.

## Changing the business name, email, phone or prices

Edit the `SITE` object at the top of `main.js` for the name, email and phone that JavaScript fills in.

Also update the copies in each page's `<head>` (title, description, canonical, Open Graph, Twitter, JSON-LD), the email address in `404.html` and `contact.html`, and the prices in `index.html`, `pricing.html`, `contact.html` and `faq.html`. Search for `1,250`, `1,800`, `99` and `Placeholder` so a price change does not leave an old number, or a real number, in a spot that should still say Placeholder.

The public site URL used for sharing is:

`https://buildit-websites.github.io/`

It is written in each page's canonical and social tags, in `sitemap.xml`, in `robots.txt`, and in the JSON-LD on the home page. If the GitHub Pages address or a future domain is different, replace that URL everywhere. Social images must stay absolute (`https://…/og-image.png`).

## GitHub Pages

Pages is not on for this repo yet. This session could not turn it on, because that is a repository setting change. After this pull request is merged into `main`:

1. Open [the Pages settings](https://github.com/finlaysonnick74-source/buildit-nick-version/settings/pages) for this repo.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to **`/ (root)`**, then save.
4. Wait until the Pages panel shows a live URL. For this repo it should be `https://buildit-websites.github.io/`.
5. You do not need a GitHub Actions workflow. There is no build. `.nojekyll` is already in the root so Pages will not run Jekyll.

If the URL GitHub shows is different from the one above, update the absolute URLs described in the previous section, or link previews and the sitemap will point at the wrong place.

To confirm it worked, open the Pages URL, click every tab, open Ember & Oat and Ironbark Electrical, and check a link preview by pasting the home URL into a message or into [opengraph.xyz](https://www.opengraph.xyz/).
