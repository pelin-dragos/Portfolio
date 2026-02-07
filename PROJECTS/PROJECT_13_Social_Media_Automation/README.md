# Proiect 13: Social Media Automation (LinkedIn, Twitter)

## 🎯 Obiectiv
Automatizează acțiuni pe platforme sociale (post, like, follow) cu focus pe human-like behavior și anti-detection techniques.

## 📋 Cerințe
- ✅ Login pe platformă socială
- ✅ Navigare în feed
- ✅ Teste pentru like/unlike
- ✅ Teste pentru follow/unfollow
- ✅ Teste pentru postare content (opțional, dacă posibil)
- ✅ Gestionare anti-bot measures (delays, human-like behavior)

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework
- **TypeScript** - Strongly typed JavaScript
- **Human-like behavior** - Random delays, natural typing, mouse movements
- **Page Object Pattern** - Maintainable test structure

## 📁 Structură Proiect

```
PROJECT_13_Social_Media_Automation/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── playwright.config.ts            # Configurare Playwright
├── README.md                       # Acest fișier
├── demo-social-feed.html          # 🎉 Platformă demo inclusă!
│
├── pages/                          # Page Object Pattern
│   ├── LoginPage.ts               # Page object pentru login
│   └── FeedPage.ts                # Page object pentru feed și acțiuni
│
├── utils/                         # Utilități
│   └── HumanBehavior.ts           # Funcții pentru human-like behavior
│
└── tests/                         # Test suite
    └── test_social_media.spec.ts   # Teste Playwright cu TypeScript
```

## ✨ Funcționalități

### 1. Human-Like Behavior
- **Random delays** între acțiuni
- **Human typing** - scriere caracter cu caracter
- **Human clicking** - click cu mouse movement
- **Human scrolling** - scroll cu delay-uri
- **Reading time simulation** - simulează timpul de citire

### 2. Page Objects
- **LoginPage**: Login pe platformă cu validări
- **FeedPage**: Navigare feed, like/unlike, follow/unfollow, create post

### 3. Test Suites
- **Login Tests**: Teste pentru login (template pentru platforme reale)
- **Feed Navigation Tests**: Teste pentru navigare în feed
- **Like/Unlike Tests**: Teste pentru like și unlike post-uri
- **Follow/Unfollow Tests**: Teste pentru follow și unfollow utilizatori
- **Create Post Tests**: Teste pentru creare post (template)
- **Complete Flow Tests**: Teste pentru flow complet

## 📦 Deliverables
- ✅ Suite completă de teste pentru platformă socială
- ✅ Documentație despre limitări și best practices
- ✅ Respect pentru Terms of Service
- ✅ Framework complet funcțional (template)

## ✅ Criterii de Evaluare
- ✅ Teste funcționale și stabile
- ✅ Respect pentru platform (nu spam)
- ✅ Gestionare corectă a delays și waits
- ✅ Human-like behavior implementat
- ✅ Page Object Pattern folosit corect

## ⚠️ IMPORTANT - LIMITĂRI ȘI AVERTISMENTE

### ⚠️ ATENȚIE: Acest proiect este un TEMPLATE/Framework

**Nu folosi pe platforme reale fără permisiune!**

#### Limitări:
1. **Platforme reale (LinkedIn, Twitter, Facebook)**
   - ❌ Nu permite automatizare conform Terms of Service
   - ❌ Risc de ban pentru cont
   - ❌ Poate fi ilegal în unele cazuri
   
2. **Ce poți face:**
   - ✅ Folosește platforme de testare/demo
   - ✅ Adaptează framework-ul pentru platforme care permit automatizare
   - ✅ Folosește API-uri oficiale (Twitter API, LinkedIn API) când disponibile
   - ✅ Creează propriul site de test pentru demonstrație

#### Best Practices:
- ✅ Respectă Terms of Service
- ✅ Folosește conturi de test (nu personale/profesionale)
- ✅ Nu automatiza acțiuni în masă
- ✅ Folosește delay-uri umane între acțiuni
- ✅ Limitează numărul de acțiuni per sesiune

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_13_Social_Media_Automation
npm install
```

### 2. Pornește Platforma Demo (Recomandat!)

**Platformă demo inclusă:** `demo-social-feed.html` 🎉

Playwright va porni automat serverul HTTP pentru demo. Dacă vrei să-l pornești manual:

```bash
# Din folderul PROJECT_13_Social_Media_Automation
python -m http.server 8000
```

**Accesează:** http://localhost:8000/demo-social-feed.html

### 3. Rulare Teste

**Testele sunt deja configurate pentru platforma demo!**

```bash
# Rulează toate testele
npm test

# Rulează testele în mod headed (vede browser-ul)
npm run test:headed

# Rulează testele în UI mode
npm run test:ui

# Rulează testele pentru login
npm run test:login

# Rulează testele pentru feed
npm run test:feed

# Rulează testele pentru like
npm run test:like

# Rulează testele pentru follow
npm run test:follow

# Rulează testele pentru post
npm run test:post
```

### 4. Adaptare pentru Alte Platforme (Opțional)

**IMPORTANT:** Dacă vrei să folosești alte platforme:
- Adaptează URL-urile în `pages/LoginPage.ts` și `pages/FeedPage.ts`
- Adaptează locatorii (CSS selectors/XPath)
- Adaptează credențialele (DOAR pentru platforme de testare!)

## 📚 Documentație

### Code Examples:

**Human-like behavior:**
```typescript
import { HumanBehavior } from '../utils/HumanBehavior';

// Delay uman
await HumanBehavior.randomDelay(1.0, 3.0);

// Type uman
await HumanBehavior.humanType(page, '#input', "text");

// Click uman
await HumanBehavior.humanClick(page, '#button');

// Scroll uman
await HumanBehavior.humanScroll(page, 600);
```

**Page Objects:**
```typescript
import { LoginPage } from '../pages/LoginPage';
import { FeedPage } from '../pages/FeedPage';

// Login
const loginPage = new LoginPage(page);
await loginPage.navigateTo();
await loginPage.login("username", "password");

// Feed actions
const feedPage = new FeedPage(page);
await feedPage.likePost(0);
await feedPage.followUser(0);
```

## 🎯 Use Cases

### Pentru Învățare:
- ✅ Înțelegerea human-like behavior
- ✅ Implementarea anti-detection techniques
- ✅ Page Object Pattern pentru social media
- ✅ Best practices pentru automation

### Pentru Portofoliu:
- ✅ Demonstrează cunoștințe avansate de Playwright
- ✅ Arată preocupare pentru calitate (human behavior)
- ✅ Documentație completă despre limitări și best practices

### Pentru Producție:
- ⚠️ **NU folosi pe platforme reale!**
- ✅ Adaptează pentru platforme de testare proprii
- ✅ Folosește API-uri oficiale când disponibile
- ✅ Respectă întotdeauna Terms of Service

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Login | ✅ Template | Adaptează URL și locatori |
| Navigare Feed | ✅ Implementat | Funcțional cu delay-uri umane |
| Like/Unlike | ✅ Implementat | Cu human-like behavior |
| Follow/Unfollow | ✅ Implementat | Cu delay-uri între acțiuni |
| Create Post | ✅ Template | Opțional - verifică ToS |
| Human Behavior | ✅ Implementat | Delays, typing, scrolling |

## 💡 Tips

1. **Pentru testare reală:**
   - Creează propriul site de test
   - Sau folosește platforme care permit automatizare
   - Verifică Terms of Service înainte

2. **Pentru demonstrație:**
   - Framework-ul este complet funcțional
   - Documentația explică toate conceptele
   - Poate fi folosit pentru portofoliu

3. **Pentru producție:**
   - Folosește API-uri oficiale (Twitter API, etc.)
   - Evită Playwright pentru platforme reale
   - Respectă rate limiting

---

**⚠️ REAMINTIRE: Respectă Terms of Service! Folosește doar pe platforme de testare sau cu permisiune explicită!**

**Succes cu implementarea! 🎉**
