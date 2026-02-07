# Proiect 16: API + UI Integration Testing

## 🎯 Obiectiv
Combina testarea UI cu API calls pentru teste integrate complete (setup data via API, verify in UI, cleanup via API).

## 📋 Cerințe
- ✅ Setup date de test via API
- ✅ Verificare date în UI
- ✅ Cleanup date via API după teste
- ✅ Teste care verifică sincronizare API-UI
- ✅ Teste pentru scenarii complexe (API create → UI verify → API delete)

## 🛠️ Tehnologii
- **Playwright** - Modern automation framework pentru UI testing
- **TypeScript** - Strongly typed JavaScript
- **Fetch API** - Native HTTP client pentru API calls
- **Page Object Pattern** - Maintainable test structure

## 📁 Structură Proiect

```
PROJECT_16_API_UI_Integration/
├── package.json                    # Dependențe Node.js
├── tsconfig.json                   # Configurare TypeScript
├── playwright.config.ts            # Configurare Playwright
├── README.md                      # Acest fișier
│
├── api/                           # API Helpers
│   └── APIClient.ts              # APIClient class pentru API calls
│
├── pages/                         # Page Object Pattern
│   ├── JSONViewerPage.ts         # Page object pentru JSON viewing
│   └── APIUISyncPage.ts          # Page object pentru verificare sincronizare
│
└── tests/                         # Test suite
    └── test_api_ui_integration.spec.ts
```

## ✨ Funcționalități

### 1. API Client
- **APIClient**: Clasă pentru API calls (GET, POST, PUT, DELETE)
- Helper methods pentru JSON handling
- Error handling și logging

### 2. UI Verification
- **JSONViewerPage**: Verificare JSON în browser
- **APIUISyncPage**: Verificare sincronizare API-UI
- Comparare date între API și UI

### 3. Integration Flows
- **Setup via API**: Creează date de test via API
- **Verify in UI**: Verifică datele create în UI
- **Update via API**: Actualizează date via API
- **Verify update in UI**: Verifică modificările în UI
- **Cleanup via API**: Șterge date via API după teste

### 4. Test Suites
- **API Tests**: Teste pentru API calls
- **UI Tests**: Teste pentru UI verification
- **Integration Tests**: Teste integrate API-UI
- **Synchronization Tests**: Teste pentru sincronizare

## 📦 Deliverables
- ✅ Suite de teste integrată API-UI
- ✅ Helpers pentru API calls (APIClient)
- ✅ Documentație despre flow-uri
- ✅ Exemple de setup/teardown via API
- ✅ Teste pentru sincronizare API-UI

## ✅ Criterii de Evaluare
- ✅ Integrare seamless între API și UI
- ✅ Test data management corect (setup/cleanup via API)
- ✅ Teste care demonstrează sincronizare
- ✅ Flow-uri complexe testate (CREATE → READ → UI VERIFY → UPDATE → DELETE)

## 🚀 Quick Start

### 1. Instalare Dependențe

```bash
cd PROJECTS/PROJECT_16_API_UI_Integration
npm install
```

### 2. Rulare Teste

```bash
# Toate testele
npm test

# Teste specifice
npm run test:integration
npm run test:api
npm run test:sync
npm run test:setup
npm run test:verification
npm run test:cleanup
npm run test:flow
```

## 📖 Documentație

### Code Examples:

**API Client:**
```typescript
import { APIClient } from './api/APIClient';

const api = new APIClient('https://jsonplaceholder.typicode.com');

// CREATE
const resource = await api.createResource('/posts', {
  title: 'Test',
  body: 'Test body',
  userId: 1
});

// READ
const resource = await api.getResource('/posts', 1);

// UPDATE
const updated = await api.updateResource('/posts', 1, { title: 'Updated' });

// DELETE
await api.deleteResource('/posts', 1);
```

**Integration Test:**
```typescript
// Setup via API
const api = new APIClient(apiBaseUrl);
const created = await api.createResource('/posts', testData);

// Verify in UI
const jsonPage = new JSONViewerPage(page);
await jsonPage.navigateTo(`${apiBaseUrl}/posts/${created.id}`);
const uiJson = await jsonPage.getJsonFromPage();

// Compare
expect(uiJson.id).toBe(created.id);
```

## 🎯 API Demo Recomandat

### JSONPlaceholder (Default)
- **Base URL:** https://jsonplaceholder.typicode.com
- ✅ Free demo API
- ✅ Perfect pentru testare
- ✅ Endpoints: /posts, /users, /comments, /albums, /todos
- ⚠️ Note: Datele nu sunt persistente (demo API)

**Endpoints disponibile:**
- `GET /posts` - Lista de post-uri
- `GET /posts/1` - Un post specific
- `POST /posts` - Creează post nou
- `PUT /posts/1` - Actualizează post
- `DELETE /posts/1` - Șterge post (simulat)

**Pentru alte API-uri:**
- Adaptează `api_base_url` în teste
- Verifică formatul JSON returnat
- Adaptează page objects pentru UI specific

## 📊 Status Implementare

| Funcționalitate | Status | Note |
|----------------|--------|------|
| API Client | ✅ Implementat | GET, POST, PUT, DELETE |
| Setup via API | ✅ Implementat | Creare date de test |
| Verify in UI | ✅ Implementat | Verificare JSON în browser |
| Update via API | ✅ Implementat | Actualizare resource |
| Verify Update in UI | ✅ Implementat | Verificare modificări |
| Cleanup via API | ✅ Implementat | Ștergere după teste |
| Synchronization | ✅ Implementat | Teste pentru sincronizare |
| Complete Flow | ✅ Implementat | CREATE → READ → UI → UPDATE → DELETE |

## 💡 Tips

1. **Pentru testare:**
   - Folosește JSONPlaceholder (gratuit, perfect pentru demo)
   - Testele demonstrează conceptele de integrare API-UI
   - Adaptează pentru API-uri reale dacă e necesar

2. **Pentru API-uri reale:**
   - Adaugă authentication headers în APIClient
   - Configurează base URL din environment variables
   - Implementează retry logic pentru API calls

3. **Pentru sincronizare:**
   - Așteaptă puțin după API calls (page.waitForTimeout)
   - Verifică cache-ul în browser
   - Implementează explicit waits în UI

## 🧪 Test Structure

Testele sunt organizate în suite-uri:

- **@integration** - Teste de integrare API-UI
- **@api** - Teste pentru API calls
- **@ui** - Teste pentru UI verification
- **@sync** - Teste pentru sincronizare
- **@setup** - Teste pentru setup date
- **@verification** - Teste pentru verificare
- **@cleanup** - Teste pentru cleanup
- **@flow** - Teste pentru flow-uri complete
- **@critical** - Teste critice

---

**Succes cu testarea integrată API-UI! 🎯**
