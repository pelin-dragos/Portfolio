# Proiect 23: Headless Browser Testing + Docker

## 🎯 Obiectiv
Containerizare completă a testelor Playwright în Docker containers cu headless browser configuration și orchestration cu Docker Compose.

## 📋 Cerințe
- ✅ Dockerfile pentru Playwright tests
- ✅ Docker Compose pentru orchestration
- ✅ Headless browser configuration
- ✅ Volume mounting pentru results
- ✅ Network configuration pentru services
- ✅ Multi-container setup (tests container)

## 🛠️ Tehnologii
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Playwright** - Modern automation framework cu suport nativ pentru headless
- **TypeScript** - Strongly typed JavaScript
- **Node.js** - Runtime environment

## 📁 Structură Proiect

```
PROJECT_23_Headless_Docker/
├── Dockerfile                    # Docker image definition
├── docker-compose.yml            # Docker Compose orchestration
├── .dockerignore                 # Files to exclude from build
├── Makefile                      # Make commands pentru Docker
├── package.json                  # Dependențe Node.js
├── tsconfig.json                 # Configurare TypeScript
├── playwright.config.ts          # Configurare Playwright (Docker optimized)
├── README.md                     # Acest fișier
│
├── scripts/                       # Scripts
│   └── run_docker_tests.sh      # Bash script pentru Docker
│
├── pages/                         # Page Object Pattern
│   ├── LoginPage.ts             # Login page
│   └── ProductsPage.ts           # Products page
│
├── tests/                         # Test suite
│   └── test_docker_headless.spec.ts
│
├── test-results/                 # Test results (generat, mounted volume)
├── playwright-report/            # HTML reports (generat, mounted volume)
├── screenshots/                   # Screenshots (generat, mounted volume)
└── logs/                          # Logs (generat, mounted volume)
```

## ✨ Funcționalități

### 1. Dockerfile
- **Base Image**: mcr.microsoft.com/playwright (official Playwright image)
- **Playwright Browsers**: Chromium cu dependencies
- **Dependencies**: Node.js packages din package.json
- **Headless Configuration**: Environment variables

### 2. Docker Compose
- **Service**: playwright-tests container
- **Volumes**: Mount pentru results, reports, screenshots, logs
- **Network**: Isolated network pentru services
- **Environment**: CI, DOCKER, HEADLESS variables

### 3. Headless Browser
- **Automatic Headless**: Activ în Docker
- **Optimized Options**: no-sandbox, disable-dev-shm-usage, disable-gpu
- **Window Size**: Consistent pentru screenshots

### 4. Volume Mounting
- **Results**: Accesibile după execuție
- **Reports**: HTML reports persist
- **Screenshots**: Failure screenshots persist
- **Logs**: Log files persist

### 5. Make Commands
- **build**: Build Docker image
- **test**: Run tests în Docker
- **test-smoke**: Run smoke tests
- **shell**: Shell în container
- **clean**: Clean up containers și images

## 📝 Deliverables
- ✅ Dockerfile funcțional (Playwright official image)
- ✅ docker-compose.yml complet (orchestration + volumes)
- ✅ Documentație pentru build și run
- ✅ Instructions pentru deployment (README + Makefile)
- ✅ Scripts pentru automation (run_docker_tests.sh)

## ✅ Criterii de Evaluare
- ✅ Containerizare completă (Dockerfile + docker-compose)
- ✅ Teste rulează în Docker (headless mode)
- ✅ Setup simplu cu docker-compose (one command)
- ✅ Results accesibile după run (volume mounting)
- ✅ Headless browser configuration corectă
- ✅ Network configuration funcțională

## 🚀 Quick Start

### 1. Prerequisitări
```bash
# Verifică Docker
docker --version
docker-compose --version
```

### 2. Build și Run
```bash
cd PROJECTS/PROJECT_23_Headless_Docker

# Build image
docker-compose build

# Run tests
docker-compose up --abort-on-container-exit
```

### 3. Cu Make (Simplificat)
```bash
# Build
make build

# Run tests
make test

# Run smoke tests
make test-smoke

# Shell în container
make shell
```

## 📚 Documentație

### Code Examples:

**Build și Run:**
```bash
# Build image
docker-compose build

# Run tests
docker-compose up --abort-on-container-exit

# Sau cu Make
make build
make test
```

**Custom Command:**
```bash
# Run specific tests
docker-compose run --rm playwright-tests npm run test:smoke

# Sau cu Make
make test-custom ARGS="--grep @regression"
```

**Shell în Container:**
```bash
# Debug în container
docker-compose run --rm playwright-tests /bin/bash

# Sau cu Make
make shell
```

## 🐳 Docker Setup Details

### Dockerfile Components:
1. **Base Image**: mcr.microsoft.com/playwright (official)
2. **Node.js**: Included în base image
3. **Playwright Browsers**: Chromium cu dependencies
4. **Dependencies**: npm ci pentru production install
5. **Working Directory**: /app
6. **Default Command**: npm run test:docker

### Docker Compose Services:
- **playwright-tests**: Main test container

### Volumes:
- `./test-results:/app/test-results` - Test results
- `./playwright-report:/app/playwright-report` - HTML reports
- `./screenshots:/app/screenshots` - Screenshots
- `./logs:/app/logs` - Log files

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| Dockerfile | ✅ Implementat | Playwright official image |
| Docker Compose | ✅ Implementat | Orchestration + volumes |
| Headless Mode | ✅ Implementat | Automatic în Docker |
| Volume Mounting | ✅ Implementat | Results, reports, screenshots |
| Network Config | ✅ Implementat | Isolated network |
| Make Commands | ✅ Implementat | Simplified operations |
| Test Suites | ✅ Implementat | Docker-optimized tests |

## 💡 Tips

1. **Pentru Docker:**
   - Folosește `docker-compose` pentru orchestration
   - Volume mounting pentru results accesibile
   - Headless mode pentru performance

2. **Pentru Debugging:**
   - Use `make shell` pentru shell în container
   - Check logs: `make logs`
   - Verify Playwright: `npx playwright --version` în container

3. **Pentru Performance:**
   - Build cache pentru faster builds
   - Parallel execution cu multiple containers
   - Headless mode pentru speed

4. **Pentru Deployment:**
   - Build image o singură dată
   - Run tests în isolated containers
   - Results persist prin volumes

## 🔧 Configuration

### Environment Variables:
```bash
# In docker-compose.yml
CI=true
DOCKER=true
HEADLESS=true
BASE_URL=https://www.saucedemo.com
```

### Headless Options:
```typescript
// In playwright.config.ts
launchOptions: {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
}
```

## 🧪 Local Testing (Headless)

```bash
# Run tests locally in headless mode
HEADLESS=true npm test

# Or set in playwright.config.ts
# headless: true
```

---

**Succes cu Docker containerization! 🐳**