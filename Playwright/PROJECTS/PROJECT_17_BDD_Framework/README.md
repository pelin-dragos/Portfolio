# Proiect 17: BDD Framework with Cucumber.js

## 🎯 Obiectiv
Framework BDD (Behavior-Driven Development) cu Gherkin syntax pentru testele Playwright, cu focus pe testare readable și colaborare între echipă.

## 📋 Cerințe
- ✅ Setup Cucumber.js framework
- ✅ Scenarii Gherkin (Given-When-Then)
- ✅ Step definitions pentru Playwright
- ✅ Feature files organizate
- ✅ Reporting pentru BDD

## 🛠️ Tehnologii
- **Cucumber.js** - BDD framework pentru Node.js
- **Playwright** - Modern automation framework
- **TypeScript** - Strongly typed JavaScript
- **Gherkin syntax** - Limbaj natural pentru scenarii

## 📁 Structură Proiect

```
PROJECT_17_BDD_Framework/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── cucumber.js                     # Configurare Cucumber
├── README.md                      # Acest fișier
│
├── support/                        # Support files
│   ├── PlaywrightWorld.ts        # Custom World pentru Playwright
│   └── hooks.ts                   # Before/After hooks
│
├── pages/                          # Page Object Pattern
│   ├── LoginPage.ts              # Page object pentru login
│   ├── ProductsPage.ts           # Page object pentru produse
│   ├── CartPage.ts               # Page object pentru coș
│   ├── CheckoutPage.ts           # Page object pentru checkout
│   ├── CheckoutOverviewPage.ts    # Page object pentru overview
│   └── CheckoutCompletePage.ts  # Page object pentru finalizare
│
└── features/                      # BDD Feature Files
    ├── login.feature              # Feature: Login functionality
    ├── navigation.feature         # Feature: Navigation
    ├── shopping_cart.feature      # Feature: Shopping cart
    ├── checkout.feature          # Feature: Checkout process
    ├── product_sorting.feature    # Feature: Product sorting
    ├── logout.feature             # Feature: Logout
    │
    └── steps/                     # Step Definitions (TypeScript)
        ├── common_steps.ts        # Steps comune (Given/When/Then)
        ├── login_steps.ts         # Steps pentru login
        ├── cart_steps.ts          # Steps pentru shopping cart
        ├── checkout_steps.ts      # Steps pentru checkout
        ├── sorting_steps.ts       # Steps pentru sorting
        ├── logout_steps.ts        # Steps pentru logout
        └── navigation_steps.ts   # Steps pentru navigation
```

## ✨ Funcționalități

### 1. BDD Framework (Cucumber.js)
- **Gherkin Syntax**: Scenarii scrise în limbaj natural
- **Given-When-Then**: Structură clară pentru scenarii
- **Feature Files**: Organizate pe funcționalități
- **Step Definitions**: Implementare TypeScript pentru steps

### 2. Feature Files (6 feature files)
- **login.feature**: Login functionality (4 scenarii)
- **navigation.feature**: Navigation (4 scenarii)
- **shopping_cart.feature**: Shopping cart (5 scenarii)
- **checkout.feature**: Checkout process (4 scenarii)
- **product_sorting.feature**: Product sorting (5 scenarii)
- **logout.feature**: Logout functionality (3 scenarii)

**Total: 25+ scenarii BDD**

### 3. Step Definitions
- **common_steps.ts**: Steps comune reusabile
- **Feature-specific steps**: Steps pentru fiecare feature
- **Organizare**: Steps separați pe funcționalități

### 4. Environment Setup
- **BeforeAll**: Setup global
- **Before**: Setup Playwright pentru fiecare scenariu
- **After**: Cleanup și screenshots
- **AfterAll**: Cleanup global

## 📝 Deliverables
- ✅ Framework BDD funcțional (Cucumber.js)
- ✅ 6 feature files (peste minimum-ul de 5 cerut)
- ✅ Step definitions organizate și reusabile
- ✅ Documentație despre structură BDD
- ✅ Reporting configurat (JSON, HTML)

## ✅ Criterii de Evaluare
- ✅ Scenarii Gherkin clare și readable (limbaj natural)
- ✅ Step definitions reusabile (shared steps)
- ✅ Framework extensibil (ușor de adăugat noi features)
- ✅ Organizare clară (features/ și steps/)
- ✅ Hooks pentru setup/teardown (hooks.ts)

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_17_BDD_Framework
npm install
```

### 2. Rulare Teste BDD

```bash
# Toate testele
npm test

# Feature specific
npm run test:login
npm run test:navigation
npm run test:cart
npm run test:checkout
npm run test:sorting
npm run test:logout

# Cu tag-uri
npm run test:smoke

# Cu headed mode
npm run test:headed
```

## 📚 Documentație

### Code Examples:

**Feature File (.feature):**
```gherkin
Feature: Login Functionality
  Scenario: Login reușit
    Given că sunt pe pagina de login
    When introduc username-ul "standard_user"
    And introduc parola "secret_sauce"
    And click pe butonul de login
    Then ar trebui să fiu logat cu succes
```

**Step Definition (.ts):**
```typescript
@Given('că sunt pe pagina de login')
async function stepGivenOnLoginPage(this: PlaywrightWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateTo();
}
```

**Scenario Outline:**
```gherkin
Scenario Outline: Login cu diferite utilizatori
  Given că sunt pe pagina de login
  When introduc username-ul "<username>"
  And introduc parola "<password>"
  Then ar trebui să văd "<expected_result>"
  
  Examples:
    | username | password | expected_result |
    | user1    | pass1    | success        |
```

## 🎯 BDD Concepts

### Gherkin Keywords:
- **Feature**: Descrierea funcționalității
- **Scenario**: Un test case specific
- **Given**: Precondiții (setup)
- **When**: Acțiuni (test steps)
- **Then**: Verificări (assertions)
- **And/But**: Continuare steps
- **Background**: Setup comun pentru toate scenariile
- **Scenario Outline**: Teste parametrizate cu Examples

### BDD Benefits:
- ✅ **Readable**: Teste scrise în limbaj natural
- ✅ **Collaborative**: Business și QA pot scrie împreună
- ✅ **Documentation**: Feature files serves as living documentation
- ✅ **Reusable**: Step definitions pot fi folosite în multiple scenarii

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Cucumber.js Framework | ✅ Implementat | Setup complet |
| Feature Files | ✅ Implementat | 6 feature files |
| Step Definitions | ✅ Implementat | Organizate pe features |
| Environment Hooks | ✅ Implementat | Setup/teardown automat |
| Reporting | ✅ Implementat | JSON, HTML |
| Tags Support | ✅ Implementat | @smoke, @regression |
| Page Objects | ✅ Implementat | 6 page objects |

## 💡 Tips

1. **Pentru BDD:**
   - Scrie scenarii în limbaj natural (română sau engleză)
   - Fă scenarii concise și clare
   - Folosește Background pentru setup comun
   - Folosește Scenario Outline pentru teste parametrizate

2. **Pentru Step Definitions:**
   - Fă steps reusabile
   - Folosește parametri în steps (`{string}`, `{int}`)
   - Organizează steps în fișiere separate pe features

3. **Pentru Tags:**
   - Folosește `@smoke` pentru teste rapide
   - Folosește `@regression` pentru suite complete
   - Rulează cu `npm run test:smoke`

## 🔧 Configurare

### Environment Variables:
```bash
# Base URL pentru aplicație
BASE_URL=https://www.saucedemo.com

# Headless mode (true/false)
HEADLESS=true
```

### Cucumber Configuration:
- Timeout default: 30 secunde
- Format: pretty (default)
- World: PlaywrightWorld (custom)

---

**Succes cu framework-ul BDD! 🎯**
