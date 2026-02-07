# ðŸš€ Quick Start - Folosirea Platformei Demo

Acest ghid explicÄƒ cum sÄƒ foloseÈ™ti platforma demo inclusÄƒ (`demo-social-feed.html`) pentru testare automatizatÄƒ.

---

## ðŸ“‹ Pasul 1: PorneÈ™te Serverul Local

### Windows (PowerShell sau CMD):
```bash
cd PROJECTS/PROJECT_13_Social_Media_Automation
python -m http.server 8000
```

### Linux/Mac:
```bash
cd PROJECTS/PROJECT_13_Social_Media_Automation
python3 -m http.server 8000
```

**Rezultat:** Serverul ruleazÄƒ pe `http://localhost:8000`

---

## ðŸ“‹ Pasul 2: VerificÄƒ Platforma Demo

Deschide Ã®n browser:
```
http://localhost:8000/demo-social-feed.html
```

Ar trebui sÄƒ vezi:
- âœ… Feed cu 5 post-uri
- âœ… Butoane Like/Unlike pentru fiecare post
- âœ… Butoane Follow/Unfollow pentru fiecare autor
- âœ… Contor de like-uri

---

## ðŸ“‹ Pasul 3: AdapteazÄƒ Testele (OpÈ›ional)

Testele sunt deja configurate pentru platforma demo! DacÄƒ vrei sÄƒ verifici:

**VerificÄƒ `pages/feed_page.py`:**
```python
# Locatorii sunt deja setaÈ›i pentru demo-social-feed.html
FEED_CONTAINER = (By.CSS_SELECTOR, ".feed-container")
POST_ITEMS = (By.CSS_SELECTOR, "[data-testid='post-item']")
LIKE_BUTTON = (By.CSS_SELECTOR, ".like-btn")
FOLLOW_BUTTON = (By.CSS_SELECTOR, ".follow-btn")
```

**VerificÄƒ `pages/login_page.py`:**
```python
# URL-ul default pointeazÄƒ cÄƒtre demo
self.base_url = "http://localhost:8000/demo-social-feed.html"
```

---

## ðŸ“‹ Pasul 4: RuleazÄƒ Testele

### Cu pytest:
```bash
# Din folderul PROJECT_13_Social_Media_Automation
pytest tests/pytest_suite/test_social_media_automation.py::TestLikeUnlike::test_like_post -v -s

# Sau toate testele
pytest tests/pytest_suite/ -v
```

### Python simplu:
```bash
python tests/python_simple/test_social_media_simple.py
```

---

## ðŸŽ¯ Ce TesteazÄƒ Platforma Demo

âœ… **Feed Navigation:**
- Scroll prin feed
- GÄƒsirea post-urilor
- Citirea conÈ›inutului

âœ… **Like/Unlike:**
- Click pe butonul Like
- Verificare cÄƒ post-ul este liked
- Click pe butonul Unlike
- Verificare cÄƒ post-ul nu mai este liked

âœ… **Follow/Unfollow:**
- Click pe butonul Follow
- Verificare cÄƒ utilizatorul este followed
- Click pe butonul Unfollow
- Verificare cÄƒ utilizatorul nu mai este followed

---

## ðŸ” Structura Platformei Demo

**HTML Structure:**
```html
<div class="feed-container">
  <div class="post" data-post-id="1">
    <div class="author">
      <span class="author-name">@username</span>
      <button class="follow-btn">Follow</button>
    </div>
    <div class="post-content">Content here</div>
    <button class="like-btn">Like â¤ï¸</button>
  </div>
</div>
```

**Locatori Selenium:**
- Feed: `.feed-container`
- Post-uri: `[data-testid='post-item']` sau `.post`
- Like button: `.like-btn`
- Unlike button: `.like-btn.liked`
- Follow button: `.follow-btn`
- Unfollow button: `.follow-btn.followed`
- Author name: `.author-name`
- Content: `.post-content`

---

## ðŸ’¡ Exemple de Teste

### Test 1: Like un Post
```python
feed_page = FeedPage(driver)
feed_page.navigate_to("http://localhost:8000/demo-social-feed.html")
feed_page.wait_for_page_load()

# Like primul post
feed_page.like_post(post_index=0)

# VerificÄƒ cÄƒ e liked
assert feed_page.is_post_liked(post_index=0)
```

### Test 2: Follow un Utilizator
```python
feed_page = FeedPage(driver)
feed_page.navigate_to("http://localhost:8000/demo-social-feed.html")
feed_page.wait_for_page_load()

# Follow utilizatorul de la primul post
feed_page.follow_user(post_index=0)

# VerificÄƒ cÄƒ e followed
assert feed_page.is_user_followed(post_index=0)
```

---

## ðŸ› ï¸ Troubleshooting

### Problema: "Connection refused" sau nu se conecteazÄƒ
**SoluÈ›ie:**
1. VerificÄƒ cÄƒ serverul ruleazÄƒ: `python -m http.server 8000`
2. VerificÄƒ cÄƒ eÈ™ti Ã®n folderul corect
3. ÃŽncearcÄƒ sÄƒ accesezi manual Ã®n browser: `http://localhost:8000/demo-social-feed.html`

### Problema: "Element not found"
**SoluÈ›ie:**
1. VerificÄƒ cÄƒ pagina s-a Ã®ncÄƒrcat complet
2. FoloseÈ™te `wait_for_page_load()` Ã®nainte de interacÈ›iuni
3. VerificÄƒ locatorii Ã®n DevTools (F12)

### Problema: "Port already in use"
**SoluÈ›ie:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

---

## ðŸ“ Personalizare PlatformÄƒ Demo

### AdaugÄƒ mai multe post-uri:
EditeazÄƒ `demo-social-feed.html` È™i adaugÄƒ mai multe `<div class="post">` dupÄƒ modelul existent.

### SchimbÄƒ locatorii:
DacÄƒ modifici HTML-ul, adapteazÄƒ locatorii Ã®n `pages/feed_page.py`.

### AdaugÄƒ funcÈ›ionalitÄƒÈ›i noi:
PoÈ›i adÄƒuga JavaScript Ã®n `demo-social-feed.html` pentru funcÈ›ionalitÄƒÈ›i suplimentare.

---

## âœ… Verificare RapidÄƒ

**Test rapid manual:**

1. Deschide `http://localhost:8000/demo-social-feed.html`
2. Click pe "Like" la primul post â†’ Ar trebui sÄƒ devinÄƒ roÈ™u
3. Click pe "Follow" la primul autor â†’ Ar trebui sÄƒ devinÄƒ albastru
4. Click din nou pe "Unlike" â†’ Ar trebui sÄƒ revinÄƒ la normal
5. Click din nou pe "Unfollow" â†’ Ar trebui sÄƒ revinÄƒ la normal

DacÄƒ toate funcÈ›ioneazÄƒ, platforma demo este gata pentru testare automatizatÄƒ! ðŸŽ¯

---

**Succes cu testarea! ðŸš€**


