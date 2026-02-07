# Troubleshooting — GoREST and the auth test

## "JAVA_HOME is not set"

După ce ai instalat **JDK** (ex. [Oracle JDK 25](https://www.oracle.com/java/technologies/downloads/#jdk25-windows)), trebuie setată variabila de mediu **JAVA_HOME** ca Maven Wrapper să găsească Java.

**Important:** Folosește **JDK** (Java Development Kit), nu **JRE** (Java Runtime Environment). JRE 8 (ex. `jre1.8.0_481`) nu este suficient pentru Maven și compilare. Setează JAVA_HOME la un folder **jdk-...** (ex. `C:\Program Files\Java\jdk-25` sau `jdk-25.0.2`), nu la `jre1.8.0_481`.

### Setare JAVA_HOME pe Windows (permanent)

1. **Află unde e instalat JDK 25**  
   Calea tipică este: **`C:\Program Files\Java\jdk-25`** sau **`C:\Program Files\Java\jdk-25.0.2`** (cu numărul de versiune).  
   Verifică în Explorer în `C:\Program Files\Java\` — trebuie să vezi un folder **jdk-25** (sau similar).

2. **Setare variabilă de mediu:**
   - Tastează **Win + R** → scrie **`sysdm.cpl`** → Enter.
   - Tab **Avansat** → **Variabile de mediu**.
   - La **Variabile de sistem** apasă **Nou**:
     - Nume: **`JAVA_HOME`**
     - Valoare: **`C:\Program Files\Java\jdk-25`** (sau calea reală, fără `\bin` la final).
   - OK peste tot.

3. **Deschide un terminal nou** (PowerShell sau CMD) și verifică:
   ```powershell
   echo $env:JAVA_HOME
   ```
   Ar trebui să apară calea setată. Apoi rulează din nou:
   ```powershell
   cd C:\Users\drago\OneDrive\PORTFOLIO\AUTOMATION\QA-Automation\java-rest-api-automation
   .\mvnw.cmd test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
   ```

### Setare doar pentru sesiunea curentă (PowerShell)

Dacă vrei să rulezi testul imediat, fără să repornești PC-ul:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-25"
.\mvnw.cmd test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

Înlocuiește **`C:\Program Files\Java\jdk-25`** cu calea reală unde ai JDK 25 (ex. `jdk-25.0.2`).

---

## "https://gorest.co.in/public/v2 nu funcționează"

**Această adresă nu este un endpoint complet.** În documentația GoREST, `https://gorest.co.in/public/v2` este doar **prefixul** (base URL). Trebuie apelat un **path de resursă**, de exemplu `/users`.

- **Nu** deschide în browser doar: `https://gorest.co.in/public/v2` → poate returna 404 sau pagină goală.
- **Da** deschide sau apelează: **`https://gorest.co.in/public/v2/users`** → acolo primești lista de useri (JSON).

Testul tău face exact asta: folosește `BASE_URL` + `PROTECTED_ENDPOINT` = `https://gorest.co.in/public/v2` + `/users` = **`https://gorest.co.in/public/v2/users`**. Deci URL-ul folosit de test este corect.

---

## Ce trebuie făcut ca testul să funcționeze

### 1. Token în fișierul `.env` (nu în `.env.example`)

- Proiectul citește variabilele din **`.env`** (în folderul `java-rest-api-automation/`).
- **`.env.example`** este doar șablon; nu pune token-ul real acolo (și nu se commită `.env`).
- Pași:
  1. Copiază `.env.example` în **`.env`** (dacă nu ai deja `.env`).
  2. Deschide **`.env`** și pune token-ul tău la **AUTH_TOKEN**.
  3. Păstrează:
     - `BASE_URL=https://gorest.co.in/public/v2`
     - `PROTECTED_ENDPOINT=/users`

### 2. Verificare rapidă că API-ul răspunde

Deschide în browser (sau Postman):

**`https://gorest.co.in/public/v2/users`**

- Dacă vezi JSON (listă de useri) → API-ul funcționează; testul poate rula.
- Dacă primești eroare sau pagină goală → poate fi problemă de rețea/firewall sau API temporar indisponibil.

### 3. Rulare test

Din folderul **`java-rest-api-automation/`** (acolo unde e `pom.xml` și `.env`):

**Dacă nu ai Maven instalat** — folosește Maven Wrapper (e deja în proiect):

```powershell
.\mvnw.cmd test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

La prima rulare se descarcă Maven automat (o singură dată). Trebuie să ai **JAVA_HOME** setat la instalarea de JDK (Java 11+).

**Dacă ai Maven instalat** în system:

```bash
mvn test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest
```

Testul va apela **GET** la `https://gorest.co.in/public/v2/users` cu header-ul **Authorization: Bearer &lt;tokenul din .env&gt;** și va verifica status 200 sau 201 și body non-gol.

---

## Rezumat

| Ce verifici | Acțiune |
|-------------|---------|
| "public/v2 nu merge" | E normal; folosește **/public/v2/users** (cu path). |
| Unde pui tokenul | În fișierul **`.env`** (nu în `.env.example`). |
| Cum verifici API-ul | Deschide **https://gorest.co.in/public/v2/users** în browser. |
| De unde rulezi | Din `java-rest-api-automation/`: `mvn test -Dtest=EndpointRequiringAuthReturns200Or201WithValidTokenTest` |

Dacă `.env` conține BASE_URL, AUTH_TOKEN și PROTECTED_ENDPOINT corect și `https://gorest.co.in/public/v2/users` răspunde în browser, testul ar trebui să treacă.
