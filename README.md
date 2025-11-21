# Portfolio

A modern full-stack portfolio that pairs an Express backend with a responsive frontend. The site showcases projects, timeline milestones, and a contact workflow that all hydrate from backend APIs while providing an accessible light/dark theme toggle.

## Tech Stack

- **Frontend:** Vanilla HTML, CSS (custom design system), JavaScript modules
- **Backend:** Express.js with REST endpoints (`/api/summary`, `/api/projects`, `/api/timeline`, `/api/contact`)
- **Tooling:** Nodemon for local dev, modern CSS layout primitives, fetch-based API consumption

## Getting Started

```bash
npm install
npm run dev   # starts nodemon on http://localhost:4000
# or
npm start     # production-style start
```

The Express server serves the static frontend from `public/` and exposes API data that the UI consumes at runtime. Dark/light mode preferences persist via `localStorage`.

## Customization

- Update `server.js` to adjust project data, timeline milestones, or summary text.
- Add images to `public/images/` and reference them from `public/index.html`.
- Extend styling in `public/styles/main.css` using the defined CSS variables (e.g., `--accent`, `--bg`).

## Deployment

Any Node-friendly host (Render, Railway, Fly.io, etc.) can run this repo. Set the `PORT` env var if your platform provides one; the server falls back to `4000` locally.
