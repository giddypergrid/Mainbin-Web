# Mailbin landing site

Static marketing page for the Mailbin Android app. Vite + React + TS, no backend.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Output: `dist/`.

## Deploy (Vercel)

1. Push this folder to its own GitHub repo.
2. Import the repo on vercel.com — Vite is auto-detected, defaults work.
3. No env vars needed.

## Editing

- **Download link:** open `src/App.tsx`, search for `DOWNLOAD_URL`, paste your APK URL.
- **Contact email:** same file, `CONTACT_EMAIL`.
- **Fake emails:** `src/data.ts` — tweak the swipe demo content.
- **Theme:** `src/index.css` — beige/tan palette matches the app.
