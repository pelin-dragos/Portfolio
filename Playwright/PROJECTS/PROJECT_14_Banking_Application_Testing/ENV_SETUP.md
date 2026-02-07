# ðŸ” Setup Environment Variables pentru Banking Testing

Acest ghid explicÄƒ cum sÄƒ configurezi variabilele de environment pentru testare banking.

---

## âš ï¸ SECURITY WARNING

**NU commit fiÈ™ierul `.env` Ã®n Git!**

- âœ… `.env` este deja Ã®n `.gitignore`
- âœ… CredenÈ›ialele NU trebuie hardcodate Ã®n cod
- âœ… FoloseÈ™te doar conturi de test, NU conturi reale!

---

## ðŸ“‹ Pasul 1: CreeazÄƒ FiÈ™ierul .env

ÃŽn folderul `PROJECT_14_Banking_Application_Testing`, creeazÄƒ un fiÈ™ier numit `.env`

### ConÈ›inut pentru ParaBank (Demo):

```env
# ParaBank Demo Banking Application
BANKING_URL=https://parabank.parasoft.com/parabank/index.htm
BANKING_USERNAME=john
BANKING_PASSWORD=demo
```

### ConÈ›inut pentru Alte Platforme Banking:

```env
# Banking Application URL
BANKING_URL=<URL-ul aplicaÈ›iei banking>

# CredenÈ›iale (DOAR pentru conturi de test!)
BANKING_USERNAME=<username-ul tÄƒu>
BANKING_PASSWORD=<parola ta>
```

---

## ðŸ“‹ Pasul 2: VerificÄƒ Instalarea python-dotenv

InstaleazÄƒ pachetul `python-dotenv` dacÄƒ nu e deja instalat:

```bash
pip install python-dotenv
```

Sau instaleazÄƒ toate dependenÈ›ele:

```bash
pip install -r requirements.txt
```

---

## ðŸ“‹ Pasul 3: VerificÄƒ Setup-ul

TesteazÄƒ cÄƒ variabilele de environment sunt Ã®ncÄƒrcate corect:

```python
from dotenv import load_dotenv
import os

load_dotenv()

username = os.getenv("BANKING_USERNAME")
password = os.getenv("BANKING_PASSWORD")
url = os.getenv("BANKING_URL")

print(f"Username: {username}")
print(f"Password: {'***' if password else 'NOT SET'}")
print(f"URL: {url}")
```

---

## ðŸ” Troubleshooting

### Problema: "BANKING_USERNAME not found"
**SoluÈ›ie:**
1. VerificÄƒ cÄƒ fiÈ™ierul `.env` existÄƒ Ã®n folderul `PROJECT_14_Banking_Application_Testing`
2. VerificÄƒ cÄƒ variabilele sunt scrise corect (fÄƒrÄƒ spaÈ›ii Ã®n jurul `=`)
3. VerificÄƒ cÄƒ ai instalat `python-dotenv`: `pip install python-dotenv`

### Problema: "Module 'dotenv' not found"
**SoluÈ›ie:**
```bash
pip install python-dotenv
```

### Problema: "Credentials still not loading"
**SoluÈ›ie:**
1. VerificÄƒ cÄƒ rulezi testele din folderul corect
2. VerificÄƒ cÄƒ `.env` este Ã®n acelaÈ™i folder cu `conftest.py`
3. AdaugÄƒ logging pentru debug:
```python
from dotenv import load_dotenv
import os

load_dotenv()
print(f"Current dir: {os.getcwd()}")
print(f".env exists: {os.path.exists('.env')}")
```

---

## ðŸ“ Exemplu Complet .env

```env
# ============================================
# Banking Application Testing - Environment Variables
# ============================================
# 
# âš ï¸ SECURITY: Nu commit acest fiÈ™ier Ã®n Git!
# 
# CopiazÄƒ acest fiÈ™ier ca .env È™i completeazÄƒ valorile
# 
# ============================================

# ParaBank Demo (Recomandat pentru testare)
BANKING_URL=https://parabank.parasoft.com/parabank/index.htm
BANKING_USERNAME=john
BANKING_PASSWORD=demo

# Pentru alte platforme, modificÄƒ valorile de mai sus
# 
# BANKING_URL=https://your-banking-app.com
# BANKING_USERNAME=your_test_username
# BANKING_PASSWORD=your_test_password
```

---

## âœ… Verificare RapidÄƒ

RuleazÄƒ un test simplu pentru a verifica cÄƒ totul funcÈ›ioneazÄƒ:

```bash
pytest tests/pytest_suite/test_banking_automation.py::TestLogin::test_successful_login -v
```

DacÄƒ testul trece, setup-ul este corect! ðŸŽ¯

---

**Succes cu configurarea! ðŸ”**


