# ðŸš€ Ghid Complet - Rulare Teste Banking Application

Acest document explicÄƒ pas cu pas cum sÄƒ rulezi testele pentru aplicaÈ›ii banking.

---

## ðŸ“‹ PrerequisitÄƒri

### 1. Python È™i DependenÈ›e
```bash
# VerificÄƒ cÄƒ ai Python instalat
python --version

# InstaleazÄƒ dependenÈ›ele proiectului
pip install -r requirements.txt
```

### 2. Setup Environment Variables (IMPORTANT!)

**âš ï¸ SECURITY: CredenÈ›ialele NU sunt hardcodate!**

CreeazÄƒ fiÈ™ierul `.env` Ã®n folderul `PROJECT_14_Banking_Application_Testing`:

```bash
cd PROJECTS/PROJECT_14_Banking_Application_Testing
```

CreeazÄƒ `.env`:
```env
BANKING_URL=https://parabank.parasoft.com/parabank/index.htm
BANKING_USERNAME=john
BANKING_PASSWORD=demo
```

**Pentru detalii complete, vezi:** [ENV_SETUP.md](ENV_SETUP.md)

---

## ðŸ§¹ Varianta 1: Teste cu pytest (Recomandat)

### Pasul 1: NavigheazÄƒ la Folderul Proiectului
```bash
cd PROJECTS/PROJECT_14_Banking_Application_Testing
```

### Pasul 2: VerificÄƒ Setup-ul
```bash
# VerificÄƒ cÄƒ .env existÄƒ
ls .env

# Sau pe Windows
dir .env
```

### Pasul 3: RuleazÄƒ Testele cu pytest
```bash
pytest tests/pytest_suite/ -v
```

**Rezultat:** 
- Toate testele ruleazÄƒ
- CredenÈ›ialele sunt Ã®ncÄƒrcate din `.env`
- Screenshots sunt salvate la failure

### Pasul 4: RuleazÄƒ Teste Specifice
```bash
# Doar testele pentru login
pytest tests/pytest_suite/ -v -m login

# Doar testele pentru dashboard
pytest tests/pytest_suite/ -v -m dashboard

# Doar testele pentru transfer
pytest tests/pytest_suite/ -v -m transfer

# Doar testele pentru balance
pytest tests/pytest_suite/ -v -m balance

# Doar testele pentru statements
pytest tests/pytest_suite/ -v -m statements

# Doar testele critice
pytest tests/pytest_suite/ -v -m critical
```

---

## ðŸ Varianta 2: Teste Python Simplu (FÄƒrÄƒ pytest)

**NotÄƒ:** Testele Python simplu nu sunt incluse Ã®n acest proiect, dar pot fi create dupÄƒ modelul altor proiecte dacÄƒ este necesar.

---

## ðŸ“ Exemple Detaliate de Rulare

### Exemplu 1: Rulare Test Login
```bash
cd PROJECTS/PROJECT_14_Banking_Application_Testing
pytest tests/pytest_suite/test_banking_automation.py::TestLogin::test_successful_login -v -s

# Rezultat:
# test_successful_login PASSED
#   - Login reuÈ™it cu credenÈ›iale din .env
#   - Dashboard Ã®ncÄƒrcat
```

### Exemplu 2: Rulare Test Transfer
```bash
pytest tests/pytest_suite/test_banking_automation.py::TestTransferFunds::test_transfer_funds -v -s

# Rezultat:
# test_transfer_funds PASSED
#   - Transfer Ã®ntre conturi reuÈ™it
#   - SumÄƒ transferatÄƒ corect
```

### Exemplu 3: Rulare Toate Testele Dashboard
```bash
pytest tests/pytest_suite/ -v -m dashboard

# Rezultat:
# test_navigate_dashboard PASSED
# test_view_accounts_overview PASSED
# test_get_account_numbers PASSED
# test_get_account_balance PASSED
# test_logout PASSED
```

---

## ðŸ” Cum FuncÈ›ioneazÄƒ Credentials

### Proces de Load:

1. **FiÈ™ier `.env` este citit:**
```python
from dotenv import load_dotenv
load_dotenv()
```

2. **Credentials sunt Ã®ncÄƒrcate:**
```python
username = os.getenv("BANKING_USERNAME")
password = os.getenv("BANKING_PASSWORD")
```

3. **Folosite Ã®n fixtures:**
```python
@pytest.fixture
def banking_credentials():
    return {
        "username": os.getenv("BANKING_USERNAME"),
        "password": os.getenv("BANKING_PASSWORD")
    }
```

4. **Folosite Ã®n teste:**
```python
def test_login(driver, banking_credentials):
    login_page.login(
        banking_credentials["username"],
        banking_credentials["password"]
    )
```

---

## ðŸ” Troubleshooting

### Problema 1: "BANKING_USERNAME not found"
**Sintom:** Testele eÈ™ueazÄƒ cu mesaj cÄƒ credentials nu sunt gÄƒsite

**SoluÈ›ie:**
1. VerificÄƒ cÄƒ fiÈ™ierul `.env` existÄƒ Ã®n folderul corect
2. VerificÄƒ cÄƒ variabilele sunt scrise corect:
   ```env
   BANKING_USERNAME=john
   BANKING_PASSWORD=demo
   ```
3. VerificÄƒ cÄƒ ai instalat `python-dotenv`:
   ```bash
   pip install python-dotenv
   ```
4. VerificÄƒ cÄƒ rulezi testele din folderul corect:
   ```bash
   cd PROJECTS/PROJECT_14_Banking_Application_Testing
   pytest ...
   ```

### Problema 2: "Login failed"
**Sintom:** Login-ul eÈ™ueazÄƒ chiar cu credenÈ›iale corecte

**SoluÈ›ie:**
1. VerificÄƒ cÄƒ URL-ul este corect Ã®n `.env`
2. VerificÄƒ cÄƒ site-ul este accesibil:
   ```bash
   curl https://parabank.parasoft.com/parabank/index.htm
   ```
3. VerificÄƒ cÄƒ credenÈ›ialele sunt corecte (pentru ParaBank: john/demo)
4. VerificÄƒ dacÄƒ site-ul nu a schimbat structura (locatorii pot fi deprecaÈ›i)

### Problema 3: "Element not found"
**Sintom:** TimeoutException sau ElementNotFound

**SoluÈ›ie:**
1. VerificÄƒ cÄƒ pagina s-a Ã®ncÄƒrcat complet:
   ```python
   dashboard_page.wait_for_page_load()
   ```
2. VerificÄƒ locatorii Ã®n DevTools (F12)
3. Site-ul poate fi schimbat structura - adapteazÄƒ locatorii

### Problema 4: "Transfer failed"
**Sintom:** Transfer-ul de fonduri eÈ™ueazÄƒ

**SoluÈ›ie:**
1. VerificÄƒ cÄƒ existÄƒ cel puÈ›in 2 conturi disponibile
2. VerificÄƒ cÄƒ conturile au fonduri suficiente
3. Pentru ParaBank, conturile demo ar trebui sÄƒ aibÄƒ fonduri

---

## ðŸ’¡ Tips È™i Best Practices

1. **FoloseÈ™te fixtures pentru credentials**
   ```python
   def test_login(driver, banking_credentials):
       # CredenÈ›ialele vin din fixture
   ```

2. **Nu hardcode credentials**
   ```python
   # âŒ BAD
   login_page.login("john", "demo")
   
   # âœ… GOOD
   login_page.login(
       banking_credentials["username"],
       banking_credentials["password"]
   )
   ```

3. **VerificÄƒ cÄƒ .env nu este Ã®n Git**
   ```bash
   git status
   # Nu ar trebui sÄƒ vezi .env
   ```

4. **FoloseÈ™te doar conturi de test**
   - ParaBank demo: Perfect pentru testare
   - Nu folosi conturi reale!

---

## ðŸ“Š Interpretarea Rezultatelor

### Output pytest (succes)
```
test_successful_login PASSED
test_navigate_dashboard PASSED
test_transfer_funds PASSED
```

### Output pytest (eÈ™ec)
```
test_successful_login FAILED
ERROR - Login failed: The username and password could not be verified
Screenshot saved: screenshots/test_successful_login_chrome_20240115_103045.png
```

---

## ðŸŽ¯ Scenarii de Testare

### Scenariu 1: Login È™i Dashboard
1. Login pe aplicaÈ›ie banking
2. VerificÄƒ dashboard-ul
3. VerificÄƒ welcome message
4. VerificÄƒ link-uri disponibile

### Scenariu 2: Verificare Balance
1. Login
2. ObÈ›ine numerele de conturi
3. VerificÄƒ balance-ul pentru fiecare cont

### Scenariu 3: Transfer Funds
1. Login
2. NavigheazÄƒ la Transfer Funds
3. SelecteazÄƒ cont sursÄƒ È™i destinaÈ›ie
4. Introduce sumÄƒ
5. VerificÄƒ cÄƒ transfer-ul a reuÈ™it

### Scenariu 4: Statements
1. Login
2. NavigheazÄƒ la un cont
3. VerificÄƒ tranzacÈ›iile/statements
4. VerificÄƒ balance-ul afiÈ™at

---

## ðŸ“š Resurse AdiÈ›ionale

- **ParaBank Demo:** https://parabank.parasoft.com/
- **python-dotenv:** https://pypi.org/project/python-dotenv/
- **Selenium Documentation:** https://www.selenium.dev/documentation/

---

**Succes cu testarea aplicaÈ›iilor banking! ðŸŽ¯**


