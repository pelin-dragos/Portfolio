# Proiect 14: Banking Application Testing

## 🎯 Obiectiv
Teste pentru aplicații banking (login, transfer, statements) cu focus pe securitate și gestionare corectă a datelor sensibile.

## 📋 Cerințe
- ✅ Test login secure banking app
- ✅ Test navigare dashboard
- ✅ Test verificare balance/statements
- ✅ Test transfer funds (cu verificări)
- ✅ Test security features (gestionare credentials)
- ✅ Gestionare date sensibile (nu hardcode credentials)

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework
- **TypeScript** - Strongly typed JavaScript
- **dotenv** - Environment variables management
- **Page Object Pattern** - Maintainable test structure
- **Secure data handling** - No hardcoded credentials

## 📁 Structură Proiect

```
PROJECT_14_Banking_Application_Testing/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── playwright.config.ts            # Configurare Playwright
├── .env.example                   # Template pentru .env
├── .gitignore                     # Ignore .env și alte fișiere sensibile
├── README.md                      # Acest fișier
│
├── pages/                          # Page Object Pattern
│   ├── LoginPage.ts              # Page object pentru login banking
│   ├── DashboardPage.ts          # Page object pentru dashboard
│   ├── TransferPage.ts           # Page object pentru transfer funds
│   └── StatementsPage.ts         # Page object pentru statements/activity
│
├── utils/                         # Utilități
│   └── SecurityUtils.ts          # Funcții pentru security (credentials)
│
└── tests/                         # Test suite
    └── test_banking.spec.ts      # Teste Playwright cu TypeScript
```

## ✨ Funcționalități

### 1. Secure Credentials Management
- ✅ Environment variables (`.env` file)
- ✅ `dotenv` pentru încărcare
- ✅ Nu hardcode credentials în cod
- ✅ `.env` în `.gitignore`

### 2. Page Objects
- **LoginPage**: Login banking cu validări
- **DashboardPage**: Dashboard cu accounts overview
- **TransferPage**: Transfer funds între conturi
- **StatementsPage**: Statements și tranzacții

### 3. Security Utilities
- **SecurityUtils**: Funcții pentru gestionare securizată credentials
- Masking pentru date sensibile
- Safe logging

### 4. Test Suites
- **Login Tests**: Teste pentru login
- **Dashboard Tests**: Teste pentru dashboard, accounts, balance
- **Balance and Statements Tests**: Teste pentru verificare balance și statements
- **Transfer Funds Tests**: Teste pentru transfer între conturi
- **Complete Flow Tests**: Teste pentru flow complet banking

## 📦 Deliverables
- ✅ Suite completă de teste pentru banking flow
- ✅ Configurare secure pentru credentials (`.env` + `.gitignore`)
- ✅ Documentație despre security considerations
- ✅ README cu warnings despre date sensibile
- ✅ Ghid setup environment variables

## ✅ Criterii de Evaluare
- ✅ Date sensibile nu sunt hardcodate
- ✅ Teste pentru security features (credential handling)
- ✅ Cod respectă best practices pentru banking apps
- ✅ Environment variables implementate corect
- ✅ Documentație security completă

## ⚠️ IMPORTANT - Security Notes

### ⚠️ CRITICAL: Gestionare Credentials

**NU hardcode credentials în cod!**

#### ✅ CORECT:
```typescript
// Folosește environment variables
const username = process.env.BANKING_USERNAME;
const password = process.env.BANKING_PASSWORD;
```

#### ❌ GREȘIT:
```typescript
// ❌ NICIODATĂ așa!
const username = "my_username";
const password = "my_password";
```

### Setup Credentials:

1. **Creează fișier `.env`:**

Copiază `.env.example` la `.env` și completează:

```env
BANKING_URL=https://parabank.parasoft.com/parabank/index.htm
BANKING_USERNAME=john
BANKING_PASSWORD=demo
```

2. **`.env` este în `.gitignore`** - NU este commit-at în Git!

3. **Pentru detalii, vezi:** `.env.example`

### Security Best Practices:
- ✅ Folosește doar conturi de test (ParaBank demo)
- ✅ Nu commit `.env` în Git
- ✅ Maschează date sensibile în logs
- ✅ Respectă Terms of Service

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_14_Banking_Application_Testing
npm install
```

### 2. Setup Environment Variables (CRITICAL!)

**Creează fișierul `.env`:**

```bash
# În folderul PROJECT_14_Banking_Application_Testing
# Copiază .env.example la .env
cp .env.example .env
```

Apoi editează `.env` cu credențialele tale:

```env
BANKING_URL=https://parabank.parasoft.com/parabank/index.htm
BANKING_USERNAME=john
BANKING_PASSWORD=demo
```

**⚠️ IMPORTANT:** `.env` este în `.gitignore` - NU commit-ați acest fișier!

### 3. Rulare Teste

```bash
# Rulează toate testele
npm test

# Rulează testele în mod headed (vede browser-ul)
npm run test:headed

# Rulează testele în UI mode
npm run test:ui

# Rulează testele pentru login
npm run test:login

# Rulează testele pentru dashboard
npm run test:dashboard

# Rulează testele pentru balance
npm run test:balance

# Rulează testele pentru transfer
npm run test:transfer

# Rulează testele pentru statements
npm run test:statements
```

## 📚 Documentație

### Code Examples:

**Secure credentials:**
```typescript
import { SecurityUtils } from '../utils/SecurityUtils';

const credentials = SecurityUtils.getCredentials();
const username = credentials.username;
const password = credentials.password;
```

**Page Objects:**
```typescript
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

// Login
const loginPage = new LoginPage(page, bankingUrl);
await loginPage.navigateTo();
await loginPage.login(username, password);

// Dashboard
const dashboardPage = new DashboardPage(page);
const balance = await dashboardPage.getAccountBalance();
```

## 🎯 Platforme Banking Demo

### ParaBank (Recomandat)
- **URL:** https://parabank.parasoft.com/
- **Username demo:** `john`
- **Password demo:** `demo`
- ✅ Perfect pentru testare
- ✅ Acceptă automatizare
- ✅ Funcționalități complete (login, transfer, statements)

**Notă:** Folosește doar platforme demo! Nu testa pe aplicații banking reale!

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Login | ✅ Implementat | Cu environment variables |
| Dashboard | ✅ Implementat | Accounts overview, balance |
| Balance | ✅ Implementat | Verificare balance conturi |
| Statements | ✅ Implementat | Vizualizare tranzacții |
| Transfer Funds | ✅ Implementat | Transfer între conturi |
| Security | ✅ Implementat | Environment variables, .env |
| Credentials Handling | ✅ Implementat | Nu hardcodate |

## 💡 Tips

1. **Pentru testare:**
   - Folosește ParaBank demo (gratuit, perfect pentru testare)
   - Creează `.env` cu credențialele demo
   - Verifică că `.env` este în `.gitignore`

2. **Pentru securitate:**
   - NU commit `.env` în Git
   - NU hardcode credentials
   - Folosește doar conturi de test

3. **Pentru producție:**
   - Folosește secret managers (AWS Secrets Manager, etc.)
   - Encrypt credentials
   - Implementează 2FA/OTP dacă necesar

---

**⚠️ REAMINTIRE: Respectă security best practices! Nu hardcode credentials! Folosește `.env` file!**

**Succes cu testarea aplicațiilor banking! 🎉**
