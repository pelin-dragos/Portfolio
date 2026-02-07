# Proiect 19: Custom Test Framework Development

## 🎯 Obiectiv
Framework complet și extensibil pentru testare automatizată cu Playwright, incluzând reporting, logging, configuration management și design patterns.

## 📋 Cerințe
- ✅ Architecture framework (base classes, utilities)
- ✅ Configuration management (environment variables)
- ✅ Logging sistem complet
- ✅ Reporting (HTML și custom JSON)
- ✅ Helpers și utilities reusabile
- ✅ Documentație completă

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework
- **TypeScript** - Strongly typed JavaScript
- **Design Patterns** - Factory, Singleton, Template Method
- **Node.js** - Runtime environment

## 📁 Structură Framework

```
PROJECT_19_Custom_Test_Framework/
├── framework/                    # Framework core
│   ├── core/                    # Core components
│   │   ├── BaseDriver.ts        # Factory pattern pentru Browser
│   │   ├── BasePage.ts          # Base class pentru page objects
│   │   └── Logger.ts            # Singleton Logger system
│   ├── config/                   # Configuration management
│   │   └── ConfigManager.ts     # ConfigManager (Singleton)
│   ├── helpers/                  # Helper utilities
│   │   └── CommonHelpers.ts    # Utilities reusabile
│   └── reporting/                # Reporting system
│       └── ReportManager.ts     # Report management
│
├── pages/                        # Page Objects (folosesc framework)
│   ├── LoginPage.ts            # Exemplu page object
│   └── ProductsPage.ts         # Exemplu page object
│
├── tests/                        # Test suite
│   └── test_framework_demo.spec.ts   # Demo tests
│
├── package.json                  # Dependențe Node.js
├── tsconfig.json                 # Configurare TypeScript
├── playwright.config.ts           # Configurare Playwright
└── README.md                     # Acest fișier
```

## ✨ Funcționalități Framework

### 1. Core Components
- **BaseDriver**: Factory pattern pentru crearea Browser instances (Chrome, Firefox, WebKit)
- **BasePage**: Clasă de bază pentru toate page objects cu metode comune
- **Logger**: Singleton pattern pentru logging sistem complet

### 2. Configuration Management
- **ConfigManager**: Singleton pentru management configurare
- Suport pentru environment variables
- Default configuration built-in
- Easy configuration access

### 3. Logging System
- Console și file logging
- Configurable log levels (INFO, DEBUG, WARN, ERROR)
- Log files în directorul `logs/`
- Singleton pattern pentru acces centralizat

### 4. Reporting System
- HTML reports (Playwright built-in)
- Custom JSON reporting
- Test results tracking
- Summary generation

### 5. Helper Utilities
- Random string/email generation
- Timestamp formatting
- Duration formatting
- Retry mechanism
- Wait utilities

## 📝 Deliverables
- ✅ Framework complet funcțional
- ✅ Documentație API framework
- ✅ Exemple de utilizare (test_framework_demo.spec.ts)
- ✅ README cu arhitectură
- ✅ Design patterns implementate (Factory, Singleton, Template Method)

## ✅ Criterii de Evaluare
- ✅ Framework extensibil și reusabil (OOP principles)
- ✅ Cod bine organizat (modular, separare responsabilități)
- ✅ Documentație completă
- ✅ Poate fi folosit pentru proiecte reale (production-ready)
- ✅ Design patterns implementate corect

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_19_Custom_Test_Framework
npm install
```

### 2. Configurare

Set environment variables (opțional):
```bash
export BROWSER=chrome
export HEADLESS=true
export BASE_URL=https://www.saucedemo.com
export TIMEOUT=30000
```

### 3. Rulare Teste

```bash
# Teste cu framework
npm test

# Teste demo framework
npm run test:framework

# Cu headed mode
npm run test:headed

# Cu UI mode
npm run test:ui
```

## 📚 API Framework

### BaseDriver (Factory Pattern)
```typescript
import { BaseDriver } from '@framework/core/BaseDriver';

// Create browser
const browser = await BaseDriver.createBrowser('chrome', false);

// Create context
const context = await BaseDriver.createContext(browser);

// Create page
const page = await BaseDriver.createPage(context);

// Get available browsers
const browsers = BaseDriver.getAvailableBrowsers();
```

### BasePage (Template Method Pattern)
```typescript
import { BasePage } from '@framework/core/BasePage';

class MyPage extends BasePage {
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement('#my-element');
  }
  
  async clickButton(): Promise<void> {
    await this.clickElement('#button');
  }
}
```

### ConfigManager (Singleton)
```typescript
import { ConfigManager } from '@framework/config/ConfigManager';

const config = ConfigManager.getInstance();

const browser = config.getBrowser();
const baseUrl = config.getBaseUrl();
const timeout = config.getTimeout();
```

### Logger (Singleton)
```typescript
import { Logger } from '@framework/core/Logger';

const logger = Logger.getInstance();
logger.info("Message");
logger.debug("Debug message");
logger.warn("Warning");
logger.error("Error");
```

### CommonHelpers
```typescript
import { CommonHelpers } from '@framework/helpers/CommonHelpers';

const randomStr = CommonHelpers.generateRandomString(10);
const randomEmail = CommonHelpers.generateRandomEmail();
const duration = CommonHelpers.formatDuration(120.5);
const timestamp = CommonHelpers.getTimestamp();

// Retry mechanism
await CommonHelpers.retry(async () => {
  // Your code
}, 3, 1000);
```

### ReportManager
```typescript
import { ReportManager } from '@framework/reporting/ReportManager';

const report = new ReportManager();
report.saveTestResult("test_name", "passed", 5.2);
const summary = report.generateSummary();
report.generateJSONReport('test-results.json');
```

## 🎯 Design Patterns

### Factory Pattern
- **BaseDriver**: Creează Browser instances pentru diferite browsere
- Abstractizează crearea obiectelor complexe
- Extensibil pentru noi browsere

### Singleton Pattern
- **Logger**: O singură instanță pentru logging
- **ConfigManager**: O singură instanță pentru configurare
- Asigură acces centralizat și consistent

### Template Method Pattern
- **BasePage**: Definește structura pentru page objects
- Subclass-urile implementează metode specifice
- Cod reusabil și consistent

## 📊 Status Implementare

| Component | Status | Design Pattern |
|-----------|--------|---------------|
| BaseDriver | ✅ Implementat | Factory |
| BasePage | ✅ Implementat | Template Method |
| Logger | ✅ Implementat | Singleton |
| ConfigManager | ✅ Implementat | Singleton |
| ReportManager | ✅ Implementat | - |
| CommonHelpers | ✅ Implementat | - |

## 💡 Extending Framework

### Adăugare Browser Nou
```typescript
// În BaseDriver.ts
static async createBrowser(
  browserType: string = 'chrome',
  headless: boolean = true
): Promise<Browser> {
  // Add new browser type to browserTypeMap
}
```

### Adăugare Helper Nou
```typescript
// În CommonHelpers.ts
static newHelperMethod(): void {
  // Implementation
}
```

### Adăugare Config Option
```typescript
// În ConfigManager.ts
getNewOption(): string {
  return this.get('newOption', 'defaultValue');
}
```

## 📝 Example Usage

### Creating a Page Object
```typescript
import { Page } from '@playwright/test';
import { BasePage } from '../framework/core/BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  
  constructor(page: Page) {
    super(page);
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.usernameInput);
  }
  
  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
    // ...
  }
}
```

### Using in Tests
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Logger } from '../framework/core/Logger';

test('should login', async ({ page }) => {
  const logger = Logger.getInstance();
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateTo();
  await loginPage.login('user', 'pass');
  
  expect(await loginPage.isLoggedIn()).toBeTruthy();
  logger.info('Login test completed');
});
```

## 🔧 Configuration

### Environment Variables:
```bash
# Browser type
BROWSER=chrome

# Headless mode
HEADLESS=true

# Base URL
BASE_URL=https://www.saucedemo.com

# Timeout
TIMEOUT=30000
```

### Logging:
- Logs sunt salvate în directorul `logs/test.log`
- Console output pentru toate mesajele
- Configurable log levels

### Reporting:
- HTML reports: `npx playwright show-report`
- JSON reports: `reports/test-results.json`
- Test results tracking în ReportManager

---

**Framework gata pentru utilizare în proiecte reale! 🚀**
