# Portfolio site — QA Automation

This folder contains the portfolio site for the QA-Automation project. It is meant to be served via **GitHub Pages** from this repository.

## Contents

- **index.html** — main page: projects (Java REST API, Postman, Playwright) and test types
- **styles.css** — styles (dark theme, responsive)
- You can add more pages (e.g. `projects.html`, `contact.html`) and link them from here

## Deploy on GitHub Pages

1. In the **QA-Automation** repository on GitHub: **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source**: “Deploy from a branch”.
   - **Branch**: `main` (or your default branch).
   - **Folder**: `/docs`.
3. Save. After 1–2 minutes the site will be available at:
   - `https://<USERNAME>.github.io/QA-Automation/`

## Customization

- **GitHub username**: in `index.html`, replace the username in the repo links if this repo is under a different account.
- **Text / sections**: edit `index.html` and `styles.css` to your liking.
- **Other pages**: add HTML files in `docs/` and link them from the nav or from buttons.

## Run locally

You can open `index.html` directly in the browser or use a local server, for example:

```bash
# from the docs/ folder
npx serve .
# or
python -m http.server 8000
```

Then open in the browser: `http://localhost:8000` (or the port shown).
