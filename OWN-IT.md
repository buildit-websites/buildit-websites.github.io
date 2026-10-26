# This is your site, Tomas. Own it.

This folder is the whole BuildIT website. Everything is plain HTML, CSS and JavaScript. There's no build step and nothing to install. Change a file, publish it, and about a minute later it's live at **https://buildit-websites.github.io/**.

---

## 1. What each file is

| File | What it is |
|---|---|
| `index.html` | The homepage: the intro, your story chapters, projects, samples, giving back, the free-5 deal, what's next and contact. |
| `services.html` | What you build and why BuildIT. |
| `pricing.html` | Both plans, the side-by-side table, all prices (ex GST). |
| `how-it-works.html` | The four steps and "what to have ready". |
| `faq.html` | Questions and answers. Each one is a `<details>` block. |
| `about.html` | About you, "Why I'm doing this" and your five values. (`story.html` now just redirects here.) |
| `work.html` | Live projects plus the sample designs. |
| `brief.html` | The design brief form. It emails you through FormSubmit. |
| `contact.html` | Phone, email and the short contact form. |
| `thanks.html` | The page people see after sending a form. |
| `404.html` | The "page not found" page. |
| `style.css` | All the colours, fonts, spacing and animation. |
| `app.js` | The intro, scroll effects, your little character, and the mobile menu. You rarely need to touch it. |
| `favicon.svg` | Your BuildIT logo (also used in the header). |
| `img/` | Screenshots of projects (`pap.webp`, `lux.webp`, …), sample thumbnails (`s-….webp`) and your character (`tomas.webp`). |
| `samples/` | Six sample sites for fictional Northern Beaches businesses (`samples/<name>/index.html`), with their shared `samples/assets/` styles. |
| `examples/` | The Ember & Oat and Ironbark Electrical sample sites. |
| `sitemap.xml`, `robots.txt` | Help Google find your pages. |

## 2. Find the bits only you can write

Search the whole project for **`TOMAS:`**. Every spot that still needs your words has a comment like this:

```html
<!-- TOMAS: your words -->
<p class="ph">[Tomas: one line on earning trust.]</p>
```

Replace the text inside the brackets with your own words. Then you can delete the comment and the `class="ph"` (that's the dashed "placeholder" box).

Right now that means:
- **Giving back** and **Earning trust**: one line each, on the homepage (`index.html`) and in `about.html`.
- **What I want to achieve**: on the homepage.
- **Reviews**: on the homepage. Only paste real reviews, word for word, with the client's permission.
- **Free slots**: on the homepage, change them as clients sign on (see section 5).

The story on the homepage is yours too. Change any sentence you want.

## 3. How to edit text

1. Open the file (on GitHub, click the file, then the ✏️ pencil icon).
2. Find the words (Ctrl+F / Cmd+F).
3. Change only the words between the `>` and `<`. Leave the tags alone.
4. Scroll down and click **Commit changes** (see section 7 for which branch).

Tip: if you break something, every change is saved in GitHub's history, so nothing is ever lost. You can always go back.

## 4. How to swap or add a project

Projects live in `work.html` (the full list) and `index.html` (the sideways reel).

1. Take a screenshot of the live site on a computer (about 1440×900) and on a phone (390 wide).
2. Save them as `.webp` (or `.png`) into `img/`, for example `img/newclient.webp` and `img/newclient-m.webp`.
3. Copy one whole `<li class="card">…</li>` (homepage) or `<li class="wcard">…</li>` (work page) block, paste it below, and change:
   - the link (`href="https://…"`)
   - the image names (`img/newclient.webp`, `img/newclient-m.webp`)
   - the name (`<h3>`) and the one-line description (`<p>`)
   - the `alt="…"` text (describe the screenshot for people using screen readers)

Call them "projects". Describe what the site is, honestly.

## 5. Mark a free slot as "Taken"

In `index.html`, search for `class="slots"`. You'll see:

```html
<li><span>01</span><b>Open</b></li>
```

Change `Open` to `Taken`. If you want it greyed out, use `<li class="taken">`.

## 6. Swap a sample design

Samples are in `work.html` (and the homepage "Sample designs" strip). Each one is a `<li class="sample">` with a link to its folder (for example `samples/swell-academy/`), a thumbnail in `img/s-….webp`, and the label **Sample design … (fictional)**. Always keep that label so nobody thinks a sample is a real client.

## 7. Preview before it goes live

**Easiest:** open `index.html` straight in your browser (double-click it). Nearly everything works. The forms only send from the live site.

**Better (matches the live site exactly):** in a terminal, inside this folder, run:

```
python3 -m http.server 8000
```

then open http://localhost:8000. Press Ctrl+C to stop it.

## 8. HOW TO PUBLISH LIVE 🚀

GitHub Pages serves the branch **`fix/qa-round-1`**. Whatever is on that branch *is* the live site. There's no Action or build step. GitHub publishes it automatically.

**Option A: through a pull request (safest)**
1. Make your changes on another branch (for example `buildit-v2`, or a new one like `tomas-edits`).
2. On GitHub, open **Pull requests → New pull request**, set *base* to `fix/qa-round-1` and *compare* to your branch.
3. Check the "Files changed" tab, then click **Merge pull request** → **Confirm merge**.
4. Wait about a minute, then refresh https://buildit-websites.github.io/ (do a hard refresh: Ctrl+Shift+R / Cmd+Shift+R).

**Option B: a quick text fix**
Edit the file on GitHub while you're viewing the `fix/qa-round-1` branch and click **Commit changes** with "Commit directly to the `fix/qa-round-1` branch" selected. It goes live in about a minute.

**Check it worked:** on the repo page, click **Actions** (or the little ✓ / dot next to the latest commit). The "pages build and deployment" run turns green when it's live.

**Undo:** if something goes wrong, open the pull request you merged and click **Revert**, then merge the revert. The old version comes back in a minute.

## 9. The forms

Both forms post to FormSubmit (`https://formsubmit.co/tomas@buildit.net.au`) and then send people to `thanks.html`. The first time a form is used from a new web address, FormSubmit emails you once to confirm. Click the link in that email. If you ever change your email, change it in the `action="…"` of both forms.

## 10. Rules this site keeps

- First name only: Tomas.
- Never invent reviews, numbers, awards or client names. If it isn't real yet, leave the placeholder.
- First 5 websites free for an honest review. Charities and community groups are always free. Any domain extension the client wants.
- The footer line stays: "BuildIT is a company of Ampyre Pty Ltd, a sister company to Innovo."

You built this. Keep building.
