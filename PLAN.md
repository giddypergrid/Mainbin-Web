# Mailbin Landing Site — Plan & Progress

Built by Claude while the user was away.

## What this is

A long-scroll, cute, beige-themed landing page for the Mailbin Android app.
Lives in its own git repo (this folder), deployed separately to Vercel.
Root `.gitignore` includes `web/` so it doesn't pollute the main repo.

## Stack

- Vite 8 + React 19 + TypeScript (matches the app)
- No backend, no router, no extra deps
- All bin images copied from `frontend/assets/bins/`
- Theme matches the app: beige `#f5f0e8`, tan `#d4c5a9`, ink `#241c18`

## Page sections (top → bottom)

1. **Hero** — date stamp + "Mailbin" wordmark + subtitle
2. **Three bins** — Emergency / Info / Maybe, with image + plain-English description
3. **Swipe demo** — interactive: fake email list, swipe right = sort done, swipe left = teach
4. **Teach section** — preview of Settings (personal rules) + feedback panel
5. **Closing CTA** — "Your truly intelligent gmail assistant, try now!"
6. **Footer** — contact email (sunziyuan000@gmail.com) for testing access + APK download button (link placeholder)

## Key files

- `src/App.tsx` — all sections in one file (keeps it scannable)
- `src/index.css` — full theme
- `src/data.ts` — fake email fixtures
- `index.html` — title + meta description
- `vercel.json` — SPA rewrite (only needed if we add routes later)

## Progress

- [x] Scaffold Vite project in `web/`
- [x] Add `web/` to root `.gitignore`
- [x] Copy bin PNGs into `web/src/assets/`
- [ ] Replace App.tsx with landing page
- [ ] Replace index.css with theme
- [ ] Add fake email data
- [ ] `npm install` + `npm run build` to verify
- [ ] `git init` inside `web/`, commit
- [ ] README with Vercel deploy steps
- [ ] User to set git remote + push + connect Vercel

## Deploy

1. `cd web && git init && git add -A && git commit -m "init"`
2. Create a new GitHub repo, push
3. On vercel.com → import repo → defaults are fine (Vite auto-detected)
4. Done. No env vars needed.

## TODO for user

- Paste the real APK download link into `src/App.tsx` (search `DOWNLOAD_URL`)
- Connect to Vercel
