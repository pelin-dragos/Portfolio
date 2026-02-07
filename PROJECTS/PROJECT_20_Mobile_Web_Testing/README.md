# Proiect 20: Mobile Web Testing (Responsive)

## 🎯 Obiectiv
Teste pentru versiunea mobilă și responsive design a site-urilor, verificând comportamentul pe diferite viewport sizes (mobile, tablet, desktop).

## 📋 Cerințe
- ✅ Teste pentru diferite viewport sizes (mobile, tablet, desktop)
- ✅ Verificare responsive design
- ✅ Verificare elemente vizibile/ascunse pe mobile
- ✅ Teste pentru hamburger menus, mobile navigation
- ✅ Screenshots pentru fiecare viewport

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework cu suport nativ pentru device emulation
- **TypeScript** - Strongly typed JavaScript
- **Device Emulation** - Built-in device presets (iPhone, iPad, Android, Desktop)

## 📁 Structură Proiect

```
PROJECT_20_Mobile_Web_Testing/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── playwright.config.ts            # Configurare Playwright (device emulation)
├── README.md                       # Acest fișier
│
├── utils/                          # Utilities
│   └── ViewportConfigs.ts        # Viewport configurations
│
├── pages/                          # Page Object Pattern
│   ├── BasePage.ts               # Base class cu viewport detection
│   ├── LoginPage.ts              # Login page (mobile optimized)
│   └── ProductsPage.ts           # Products page (mobile navigation)
│
└── tests/                          # Test suite
    └── test_viewport_responsive.spec.ts
```

## ✨ Funcționalități

### 1. Viewport Configurations
- **Mobile**: 320x568, 375x667, 414x896
- **Tablet**: 768x1024, 1024x1366
- **Desktop**: 1280x720, 1920x1080, 2560x1440
- **Device Emulation**: iPhone, Android, iPad presets (Playwright built-in)

### 2. Mobile Emulation
- **Playwright Device Emulation**: Device metrics și user agent
- **Viewport Management**: Set window size și device emulation
- **Responsive Detection**: Verificare automată viewport type

### 3. Responsive Testing
- **Layout Verification**: Verificare layout pe fiecare viewport
- **Element Visibility**: Verificare elemente vizibile/ascunse
- **Mobile Navigation**: Teste pentru hamburger menus
- **Form Fitting**: Verificare că formularele se încadrează în viewport

### 4. Screenshot Automation
- **Screenshots per Viewport**: Screenshot pentru fiecare viewport testat
- **Organized Storage**: Screenshot-uri organizate în `screenshots/viewports/`
- **Timestamped**: Fiecare screenshot are timestamp pentru identificare

## 📝 Deliverables
- ✅ Teste pentru 8+ viewport sizes (peste minimum-ul de 3)
- ✅ Configurare mobile emulation (Playwright devices)
- ✅ Documentație despre responsive testing
- ✅ Screenshots automate pentru fiecare viewport
- ✅ Teste pentru mobile-specific features (hamburger menu, navigation)

## ✅ Criterii de Evaluare
- ✅ Teste funcționează pe toate viewport-urile (mobile, tablet, desktop)
- ✅ Verificări corecte pentru mobile (layout, element visibility)
- ✅ Configurare simplă pentru switch viewport (ViewportConfigs)
- ✅ Screenshot-uri generate pentru fiecare viewport
- ✅ Mobile navigation testată (hamburger menus)

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_20_Mobile_Web_Testing
npm install
```

### 2. Rulare Teste

```bash
# Toate testele (pe toate device-urile)
npm test

# Doar teste mobile
npm run test:mobile

# Doar teste tablet
npm run test:tablet

# Doar teste desktop
npm run test:desktop

# Teste responsive (toate viewport-urile)
npm run test:responsive
```

## 📚 Documentație

### Code Examples:

**Viewport Configuration:**
```typescript
import { ViewportConfigs } from '../utils/ViewportConfigs';

// Apply viewport
await ViewportConfigs.applyViewport(page, ViewportConfigs.MOBILE_MEDIUM);

// Get all mobile viewports
const mobileViewports = ViewportConfigs.getMobileViewports();
```

**Viewport Detection:**
```typescript
import { BasePage } from '../pages/BasePage';

const page = new BasePage(page);
if (await page.isMobileViewport()) {
  // Mobile-specific logic
} else if (await page.isTabletViewport()) {
  // Tablet-specific logic
} else {
  // Desktop-specific logic
}
```

**Device Emulation (Playwright):**
```typescript
// In playwright.config.ts
projects: [
  {
    name: 'iPhone 12 Pro',
    use: { ...devices['iPhone 12 Pro'] },
  },
  {
    name: 'iPad Pro',
    use: { ...devices['iPad Pro'] },
  },
]
```

## 📱 Viewport Sizes

### Mobile (3 sizes)
| Size | Width | Height | Device Example |
|------|-------|--------|----------------|
| Small | 320 | 568 | iPhone SE |
| Medium | 375 | 667 | iPhone 8 |
| Large | 414 | 896 | iPhone 11 Pro Max |

### Tablet (2 sizes)
| Size | Width | Height | Device Example |
|------|-------|--------|----------------|
| Small | 768 | 1024 | iPad |
| Large | 1024 | 1366 | iPad Pro |

### Desktop (3 sizes)
| Size | Width | Height | Resolution |
|------|-------|--------|------------|
| Small | 1280 | 720 | HD |
| Medium | 1920 | 1080 | Full HD |
| Large | 2560 | 1440 | 2K |

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Mobile Emulation | ✅ Implementat | Playwright devices |
| Viewport Configs | ✅ Implementat | 8 viewport sizes |
| Device Presets | ✅ Implementat | iPhone, Android, iPad |
| Responsive Detection | ✅ Implementat | Auto-detect viewport type |
| Mobile Navigation | ✅ Implementat | Hamburger menu testing |
| Screenshot Automation | ✅ Implementat | Per viewport screenshots |
| Responsive Tests | ✅ Implementat | 20+ teste pentru viewports |

## 💡 Tips

1. **Pentru mobile testing:**
   - Folosește Playwright device emulation pentru comportament real
   - Verifică touch interactions (click-uri pe mobile)
   - Testează hamburger menus și mobile navigation
   - Verifică scroll behavior

2. **Pentru responsive testing:**
   - Testează pe cel puțin 3 viewport sizes (mobile, tablet, desktop)
   - Verifică că elementele sunt vizibile pe toate viewport-urile
   - Verifică layout changes între viewports
   - Testează form fitting în viewport

3. **Pentru debugging:**
   - Screenshot-urile sunt salvate în `screenshots/viewports/`
   - Verifică viewport size cu `getViewportSize()`
   - Use `isMobileViewport()`, `isTabletViewport()`, `isDesktopViewport()`

## 🔧 Configuration

### Playwright Devices:
Playwright include built-in device presets:
- **Mobile**: iPhone SE, iPhone 12 Pro, iPhone 13 Pro Max, Pixel 5
- **Tablet**: iPad Mini, iPad Pro
- **Desktop**: Desktop Chrome, Desktop Firefox, Desktop Safari

### Custom Viewports:
```typescript
// In ViewportConfigs.ts
static readonly CUSTOM_VIEWPORT: ViewportSize = {
  width: 400,
  height: 800,
  name: 'Custom',
  type: 'mobile'
};
```

### Screenshots:
- Screenshots sunt salvate automat în `screenshots/viewports/`
- Format: `{ViewportName}_{Timestamp}.png`
- Full page screenshots pentru verificare completă

---

**Succes cu testarea mobile și responsive! 📱**