# Site portofoliu — QA Automation

Acest folder conține site-ul de portofoliu pentru proiectul QA-Automation. Este gândit să fie servit prin **GitHub Pages** din acest repository.

## Conținut

- **index.html** — pagină principală: proiecte (Java REST API, Postman, Playwright) și tipuri de teste
- **styles.css** — stiluri (tema închisă, responsive)
- Poți adăuga alte pagini (ex: `proiecte.html`, `contact.html`) și le verzi aici

## Deploy pe GitHub Pages

1. În repository-ul **QA-Automation** pe GitHub: **Settings** → **Pages**.
2. La **Build and deployment**:
   - **Source**: „Deploy from a branch”.
   - **Branch**: `main` (sau branch-ul tău default).
   - **Folder**: `/docs`.
3. Salvezi. După 1–2 minute site-ul va fi disponibil la:
   - `https://<USERNAME>.github.io/QA-Automation/`

## Personalizare

- **Username GitHub**: în `index.html` înlocuiește `YOUR_GITHUB_USERNAME` cu username-ul tău (în toate linkurile către repo și subfoldere).
- **Texte / secțiuni**: editează `index.html` și `styles.css` după preferințe.
- **Alte pagini**: adaugă fișiere HTML în `docs/` și leagă-le din meniu sau din butoane.

## Rulare locală

Poți deschide `index.html` direct în browser sau folosi un server local, de exemplu:

```bash
# din folderul docs/
npx serve .
# sau
python -m http.server 8000
```

Apoi deschizi în browser: `http://localhost:8000` (sau portul afișat).
