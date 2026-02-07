# Proiect 21: Visual Regression Testing

## 🎯 Obiectiv
Compară screenshot-uri cu baseline images pentru a detecta schimbări vizuale neintenționate și regresiuni vizuale.

## 📋 Cerințe
- ✅ Capture screenshot pentru baseline
- ✅ Compare screenshot cu baseline
- ✅ Detectare diferențe vizuale
- ✅ Generate diff images pentru diferențe
- ✅ Tolerance pentru diferențe acceptabile

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework cu suport nativ pentru visual regression
- **TypeScript** - Strongly typed JavaScript
- **Built-in Screenshot Comparison** - Playwright's `toHaveScreenshot()` API

## 📁 Structură Proiect

```
PROJECT_21_Visual_Regression_Testing/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── playwright.config.ts            # Configurare Playwright (visual regression)
├── README.md                       # Acest fișier
│
├── utils/                          # Utilities
│   └── VisualComparator.ts        # Visual comparison utilities
│
├── pages/                          # Page Object Pattern
│   ├── LoginPage.ts              # Login page
│   └── ProductsPage.ts           # Products page
│
├── tests/                          # Test suite
│   └── test_visual_regression.spec.ts
│
├── test-results/                   # Test results (generat)
│   └── test_visual_regression.spec.ts-snapshots/  # Baseline images
└── screenshots/                    # Actual screenshots (generat)
```

## ✨ Funcționalități

### 1. Visual Comparison
- **Playwright's toHaveScreenshot()**: Compară automat cu baseline images
- **Automatic Baseline Creation**: Creează baseline automat la prima rulare
- **Diff Generation**: Generează automat diff images pentru diferențe
- **Tolerance Support**: Configurable threshold și maxDiffPixels

### 2. Baseline Management
- **Automatic Baseline Storage**: Baseline images salvate în `test-results/*-snapshots/`
- **Baseline Update**: Actualizare baseline cu `--update-snapshots`
- **Baseline Organization**: Organizare automată pe test name

### 3. Diff Image Generation
- **Automatic Diff Images**: Playwright generează automat diff images
- **Visual Highlight**: Zonele cu diferențe sunt evidențiate
- **Comparison Report**: Report detaliat cu diferențe

### 4. Test Suites
- **Visual Regression Tests**: Teste pentru comparare visual
- **Element Screenshots**: Teste pentru elemente specifice
- **Viewport Screenshots**: Teste pentru diferite viewport sizes
- **Tolerance Tests**: Teste cu diferite threshold values

## 📝 Deliverables
- ✅ Sistem funcțional de visual comparison (Playwright built-in)
- ✅ Baseline images organizate (automatic)
- ✅ Diff reports cu highlight diferențe (automatic)
- ✅ Configurare tolerance (configurable threshold)
- ✅ Documentație completă

## ✅ Criterii de Evaluare
- ✅ Detectare corectă a diferențelor (pixel comparison)
- ✅ False positives minimizate (tolerance configurable)
- ✅ Report clar cu diferențele (diff images + percentage)
- ✅ Baseline management funcțional (automatic)
- ✅ Diff image generation working (automatic)

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_21_Visual_Regression_Testing
npm install
```

### 2. Prima Rulare (Creare Baseline)

```bash
# Rulează testele pentru a crea baseline images
npm test

# Baseline images vor fi create automat în test-results/*-snapshots/
```

### 3. Rulare Comparare (Visual Regression)

```bash
# Rulează din nou pentru a compara cu baseline
npm test

# Dacă există diferențe > threshold, testele vor eșua
# Diff images vor fi generate automat în test-results/
```

### 4. Actualizare Baseline

```bash
# Actualizează baseline images când sunt schimbări intenționate
npm run test:update-snapshots
```

## 📚 Documentație

### Code Examples:

**Visual Comparison:**
```typescript
import { test, expect } from '@playwright/test';

test('should compare login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.waitForLoadState('networkidle');
  
  // Playwright automatically creates baseline on first run
  // Compares with baseline on subsequent runs
  await expect(page).toHaveScreenshot('login_page.png', {
    fullPage: true,
    threshold: 0.2,
    maxDiffPixels: 100,
  });
});
```

**Element Screenshot:**
```typescript
test('should compare login form', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  
  const loginForm = page.locator('.login-box');
  await expect(loginForm).toHaveScreenshot('login_form.png', {
    threshold: 0.2,
    maxDiffPixels: 50,
  });
});
```

**Custom Threshold:**
```typescript
test('should test with strict threshold', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  
  await expect(page).toHaveScreenshot('login_strict.png', {
    fullPage: true,
    threshold: 0.1, // Stricter (lower = more strict)
    maxDiffPixels: 50, // Fewer pixels allowed
  });
});
```

## 🎨 Visual Comparison Algorithm

### Process:
1. **First Run**: Playwright captures screenshot and saves as baseline
2. **Subsequent Runs**: Playwright compares new screenshot with baseline
3. **Difference Calculation**: Calculates pixel differences
4. **Threshold Check**: Compares difference percentage with threshold
5. **Diff Image Generation**: Generates diff image if differences found
6. **Test Result**: Passes if differences < threshold, fails otherwise

### Threshold:
- **Default**: 0.2 (20% difference allowed)
- **Interpretare**: Diferențe sub threshold sunt ignorate
- **Configurable**: Poate fi setat per test sau global în playwright.config.ts

### maxDiffPixels:
- **Default**: 100 pixels
- **Interpretare**: Numărul maxim de pixeli care pot diferi
- **Configurable**: Poate fi setat per test sau global

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Visual Comparator | ✅ Implementat | Playwright built-in |
| Baseline Manager | ✅ Implementat | Automatic baseline creation |
| Diff Image Generation | ✅ Implementat | Automatic diff generation |
| Tolerance Support | ✅ Implementat | Configurable threshold |
| Auto Resize | ✅ Implementat | Automatic handling |
| Test Suites | ✅ Implementat | 12+ teste pentru visual regression |

## 💡 Tips

1. **Pentru baseline creation:**
   - Rulează testele o dată pentru a crea baseline
   - Verifică că baseline-urile sunt corecte înainte de commit
   - Folosește environment consistent pentru baseline

2. **Pentru tolerance:**
   - Folosește threshold mic (0.1-0.2) pentru teste critice
   - Threshold mai mare (0.3-0.5) pentru teste mai flexibile
   - Consideră diferențe datorate antialiasing sau rendering

3. **Pentru debugging:**
   - Verifică diff images în `test-results/` pentru a vedea diferențele exacte
   - Compară manual baseline vs actual screenshot
   - Review diff images pentru a identifica pattern-uri

4. **Pentru CI/CD:**
   - Baseline images ar trebui să fie în version control
   - Actualizare baseline când sunt schimbări intenționate
   - Review diff images înainte de merge

## 🔧 Configuration

### playwright.config.ts:
```typescript
expect: {
  toHaveScreenshot: {
    threshold: 0.2,        // 20% difference allowed
    maxDiffPixels: 100,    // Max 100 pixels can differ
  },
}
```

### Per Test Configuration:
```typescript
await expect(page).toHaveScreenshot('name.png', {
  fullPage: true,
  threshold: 0.1,         // Custom threshold
  maxDiffPixels: 50,      // Custom max pixels
});
```

### Update Snapshots:
```bash
# Update all snapshots
npm run test:update-snapshots

# Update specific test
npx playwright test test_visual_regression.spec.ts --update-snapshots
```

---

**Succes cu testarea visual regression! 🎨**
