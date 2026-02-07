# Proiect 28: Web Scraping + Testing Hybrid

## ðŸŽ¯ Obiectiv
Combina scraping de date cu testare automatÄƒ a funcÈ›ionalitÄƒÈ›ilor: extragere date, validare, storage cu pandas, È™i integrare cu functional testing.

## ðŸ“‹ CerinÈ›e
- âœ… Scrape date din site-uri (text, links, tables, elements)
- âœ… Validate scraped data (URLs, text, structure)
- âœ… Teste pentru funcÈ›ionalitÄƒÈ›i Ã®n timpul scraping
- âœ… Data storage È™i processing (JSON, CSV, pandas)
- âœ… Integration Ã®ntre scraping È™i testing

## ðŸ› ï¸ Tehnologii
- Selenium WebDriver
- BeautifulSoup pentru HTML parsing
- pandas pentru data processing
- pytest pentru test organization
- requests pentru robots.txt checks

## âš ï¸ IMPORTANT - Legal Notice

**ðŸ”’ RESPECTÄ‚ robots.txt È˜I TERMS OF SERVICE!**

- âœ… Scrape DOAR site-uri proprii sau cu permisiune
- âœ… VerificÄƒ robots.txt Ã®nainte de scraping
- âœ… RespectÄƒ rate limits
- âŒ NU scrape fÄƒrÄƒ permisiune
- âŒ NU Ã®ncÄƒlca Terms of Service

**ConsecinÈ›e legale:** Scraping neautorizat poate fi ilegal!

## ðŸ“ StructurÄƒ Proiect

```
PROJECT_28_Web_Scraping_Testing_Hybrid/
â”œâ”€â”€ conftest.py                    # Pytest fixtures (scraping optimized)
â”œâ”€â”€ pytest.ini                     # Configurare pytest
â”œâ”€â”€ requirements.txt               # DependenÈ›e Python (BeautifulSoup, pandas)
â”œâ”€â”€ README.md                      # Acest fiÈ™ier
â”œâ”€â”€ RUNNING_TESTS.md              # Ghid detaliat pentru scraping + testing
â”‚
â”œâ”€â”€ utils/                         # Utilities
â”‚   â”œâ”€â”€ __init__.py
â”‚   â”œâ”€â”€ scraper.py                # WebScraper (Selenium + BeautifulSoup)
â”‚   â”œâ”€â”€ data_validator.py          # DataValidator (validation)
â”‚   â””â”€â”€ data_storage.py            # DataStorage (JSON, CSV, pandas)
â”‚
â”œâ”€â”€ pages/                         # Page Object Pattern
â”‚   â”œâ”€â”€ __init__.py
â”‚   â””â”€â”€ base_page.py              # Base class
â”‚
â”œâ”€â”€ tests/                         # Test suite
â”‚   â”œâ”€â”€ __init__.py
â”‚   â””â”€â”€ pytest_suite/            # Teste cu pytest (fÄƒrÄƒ Allure)
â”‚       â”œâ”€â”€ __init__.py
â”‚       â”œâ”€â”€ conftest.py
â”‚       â””â”€â”€ test_scraping_hybrid.py # Hybrid tests
â”‚
â”œâ”€â”€ data/                          # Scraped data storage (generat)
â”‚   â”œâ”€â”€ *.json                    # JSON files
â”‚   â””â”€â”€ *.csv                     # CSV files
â”‚
â””â”€â”€ reports/                       # Reports (generat)
    â””â”€â”€ report.html               # HTML report
```

## âœ¨ FuncÈ›ionalitÄƒÈ›i

### 1. Web Scraping
- **Text Content**: Scrape text din paginÄƒ
- **Links Scraping**: Scrape toate linkurile cu attributes
- **Table Data**: Scrape date din tabele
- **Element Scraping**: Scrape dupÄƒ CSS selector
- **BeautifulSoup Integration**: HTML parsing È™i extraction

### 2. robots.txt Checking
- **robots.txt Check**: Verificare permisiuni Ã®nainte de scraping
- **Permission Validation**: Respectare guidelines
- **Legal Compliance**: Help pentru legal scraping

### 3. Data Validation
- **URL Validation**: Validare format URLs
- **Text Validation**: Validare text content (length, format)
- **Link Validation**: Validare linkuri scraped
- **Table Validation**: Validare structurÄƒ tabele
- **Data Completeness**: Verificare completitudine date

### 4. Data Storage
- **JSON Storage**: Salvare Ã®n JSON format
- **CSV Storage**: Salvare Ã®n CSV cu pandas
- **DataFrame**: Conversie Ã®n pandas DataFrame
- **Data Loading**: ÃŽncÄƒrcare date din JSON/CSV

### 5. Data Processing
- **Pandas Operations**: Sort, filter, aggregate
- **Data Analysis**: Basic analysis operations
- **Data Aggregation**: Group by È™i aggregation
- **Data Transformation**: Transformare date

### 6. Hybrid Testing
- **Scraping + Validation**: Scrape È™i validare Ã®n acelaÈ™i test
- **Functional + Scraping**: Test functional cu scraping
- **Data-driven Tests**: Folosire date scraped pentru tests
- **Integration**: Seamless integration Ã®ntre scraping È™i testing

## ðŸ“ Deliverables
- âœ… Hybrid framework scraping + testing (WebScraper, DataValidator, DataStorage)
- âœ… Data extraction funcÈ›ional (text, links, tables, elements)
- âœ… Teste pentru validare date (comprehensive validation)
- âœ… Documentation despre approach (RUNNING_TESTS.md)
- âœ… robots.txt checking (legal compliance)
- âœ… Data storage È™i processing (JSON, CSV, pandas)

## âœ… Criterii de Evaluare
- âœ… Scraping È™i testing integrate bine (hybrid tests)
- âœ… Date validate corect (comprehensive validation)
- âœ… Cod organizat È™i extensibil (modular structure)
- âœ… robots.txt respectat (legal compliance)
- âœ… Data storage funcÈ›ionalÄƒ (JSON, CSV, pandas)

## ðŸš€ Quick Start

### 1. Setup
```bash
cd PROJECTS/PROJECT_28_Web_Scraping_Testing_Hybrid
pip install -r requirements.txt
mkdir -p reports data

# Set BASE_URL (DOAR pentru site-uri proprii sau cu permisiune!)
export BASE_URL=https://quotes.toscrape.com/  # Demo site (permitted)
```

### 2. Run Tests
```bash
# All hybrid tests
pytest tests/pytest_suite/ -v

# Specific categories
pytest tests/pytest_suite/ -v -m scraping
pytest tests/pytest_suite/ -v -m hybrid
pytest tests/pytest_suite/ -v -m data
pytest tests/pytest_suite/ -v -m validation

# Smoke tests
pytest tests/pytest_suite/ -v -m smoke
```

### 3. View Scraped Data
```bash
# JSON files
cat data/*.json

# CSV files
cat data/*.csv

# Or open with pandas
python -c "import pandas as pd; print(pd.read_csv('data/test_links.csv'))"
```

**Pentru detalii complete, vezi:** [RUNNING_TESTS.md](RUNNING_TESTS.md)

## ðŸ“š DocumentaÈ›ie

### FiÈ™iere Importante:
- **[README.md](README.md)** - Acest fiÈ™ier (overview proiect)
- **[RUNNING_TESTS.md](RUNNING_TESTS.md)** - Ghid complet pentru scraping + testing
- **[utils/scraper.py](utils/scraper.py)** - Web scraping utilities
- **[utils/data_validator.py](utils/data_validator.py)** - Data validation
- **[utils/data_storage.py](utils/data_storage.py)** - Data storage È™i processing

### Code Examples:

**Scraping:**
```python
from utils.scraper import WebScraper

scraper = WebScraper(driver)
links = scraper.scrape_links(base_url)
texts = scraper.scrape_text_content()
```

**Validation:**
```python
from utils.data_validator import DataValidator

validator = DataValidator()
validation = validator.validate_scraped_links(links)
```

**Storage:**
```python
from utils.data_storage import DataStorage

storage = DataStorage()
storage.save_to_json(data, 'filename')
df = storage.save_to_dataframe(data)
```

## ðŸ“Š Scraping Features Details

### Text Content:
- Scrape all text din paginÄƒ
- CSS selector support
- BeautifulSoup parsing
- Strip whitespace

### Links Scraping:
- Extract all `<a>` tags
- Absolute URL conversion
- Link text È™i title
- href attributes

### Table Data:
- Extract rows È™i columns
- Multiple tables support
- Structure preservation
- Empty cells handling

### robots.txt:
- Check existence
- Parse content
- Permission validation
- Legal compliance

## ðŸ“Š Status Implementare

| FuncÈ›ionalitate | Status | Note |
|----------------|--------|------|
| Web Scraping | âœ… Implementat | BeautifulSoup + Selenium |
| robots.txt Check | âœ… Implementat | Permission validation |
| Data Validation | âœ… Implementat | URLs, text, tables |
| JSON Storage | âœ… Implementat | Save/load JSON |
| CSV Storage | âœ… Implementat | pandas integration |
| Data Processing | âœ… Implementat | Sort, filter, aggregate |
| Hybrid Tests | âœ… Implementat | Scraping + testing |
| Legal Compliance | âœ… Implementat | robots.txt, warnings |

## ðŸ’¡ Tips

1. **Pentru Legal Scraping:**
   - Always check robots.txt
   - Get permission cÃ¢nd necesar
   - Respect rate limits
   - Use proper User-Agent

2. **Pentru Accurate Scraping:**
   - Wait pentru content sÄƒ se Ã®ncarce
   - Use explicit waits
   - Verify selectors
   - Handle dynamic content

3. **Pentru Data Quality:**
   - Validate imediat dupÄƒ scraping
   - Clean data Ã®nainte de storage
   - Document data structure
   - Version control pentru data

4. **Pentru Hybrid Approach:**
   - Combine scraping cu functional tests
   - Use scraped data pentru test data
   - Validate Ã®n timpul testing
   - Document approach

---

## âš ï¸ Legal Notice

**AceastÄƒ suitÄƒ de scraping este destinatÄƒ doar pentru:**
- âœ… Scraping site-uri proprii
- âœ… Scraping cu permisiune explicitÄƒ
- âœ… EducaÈ›ie È™i Ã®nvÄƒÈ›are
- âœ… Demo sites (quotes.toscrape.com)

**NU folosiÈ›i pentru:**
- âŒ Scraping fÄƒrÄƒ permisiune
- âŒ ÃŽncÄƒlcare robots.txt
- âŒ Violare Terms of Service
- âŒ ActivitÄƒÈ›i ilegale

**Autorii nu sunt responsabili pentru utilizarea neautorizatÄƒ.**

---

**Succes cu Web Scraping + Testing (legal È™i responsabil)! ðŸ•·ï¸**



