# Aveling Films — static site

A single-page static website for Aveling Films, ready to host on **GitHub Pages**.

## File structure

```
.
├── index.html          # the page
├── assets/
│   ├── styles.css      # all styling
│   └── script.js       # lightbox + small interactions
└── README.md
```

No build step. No dependencies. Open `index.html` in a browser and it works.

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `avelingfilms.github.io` for a user/org site, or any name for a project site).
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<USER>/<REPO>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, select `main` / `root`, Save.
4. Wait ~1 minute. Your site will be at:
   - `https://<USER>.github.io/` (if repo is `<USER>.github.io`)
   - `https://<USER>.github.io/<REPO>/` (otherwise)

### Custom domain (avelingfilms.co.uk)

1. Create a file called `CNAME` at the repo root containing one line:
   ```
   avelingfilms.co.uk
   ```
2. In GitHub **Settings → Pages → Custom domain**, enter `avelingfilms.co.uk` and save. Tick "Enforce HTTPS" once GitHub provisions a certificate.
3. At your DNS provider, point the domain at GitHub Pages:
   - `A` records for the apex (`@`) to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` to `<USER>.github.io.`

## Editing content

All copy and video IDs live in `index.html`. Each film is a `<li class="film-card">` with:

```html
<li class="film-card"
    data-provider="youtube"          <!-- youtube | vimeo -->
    data-video-id="jJgoeLysk8E"
    data-title="Diego — A rhino's best friend">
  ...
</li>
```

Change `data-provider` and `data-video-id` to swap the video; the thumbnail and lightbox update automatically for YouTube. For Vimeo, the thumbnail uses `vumbnail.com`; if you prefer, replace the `<img src="…">` with a local image in `assets/`.

### Swap the logo

Replace the `.logo-mark` block in `index.html` with:

```html
<img class="logo-img" src="assets/logo.png" alt="Aveling Films">
```

and add to `styles.css`:

```css
.logo-img { max-height: 100px; width: auto; }
```

Drop your logo file at `assets/logo.png`.

### Replace placeholder images

The footer has two image placeholders (striped blocks labelled "behind-the-scenes photo" and "credit / award logos"). Replace each `<div class="image-placeholder">…</div>` with a real `<img>`:

```html
<img src="assets/about.jpg" alt="Tom on location">
```

## Notes

- The contact button is a `mailto:` link. Update the email in `index.html` if needed.
- Social links point at the URLs from the existing avelingfilms.co.uk site.
- Fonts (Playfair Display + Open Sans) load from Google Fonts.
