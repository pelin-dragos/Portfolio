# ðŸš€ Ghid Complet - Web Scraping + Testing Hybrid

Acest document explicÄƒ pas cu pas cum sÄƒ rulezi testele hibrid de scraping È™i testing.

---

## âš ï¸ IMPORTANT - Legal Notice

**ðŸ”’ RESPECTÄ‚ robots.txt È˜I TERMS OF SERVICE!**

- âœ… Scrape DOAR site-uri proprii sau cu permisiune
- âœ… VerificÄƒ robots.txt Ã®nainte de scraping
- âœ… RespectÄƒ rate limits
- âŒ NU scrape fÄƒrÄƒ permisiune
- âŒ NU Ã®ncÄƒlca Terms of Service

**ConsecinÈ›e legale:** Scraping neautorizat poate fi ilegal!

---

## ðŸ“‹ PrerequisitÄƒri

### 1. DependenÈ›e
```bash
pip install -r requirements.txt
```

### 2. Setup
```bash
mkdir -p reports data
```

### 3. Configuration
Set BASE_URL pentru site-ul tÄƒu (DOAR cu permisiune!):
```bash
export BASE_URL=https://your-site.com
```

**Demo Site (permitted):**
```bash
export BASE_URL=https://quotes.toscrape.com/
```

---

## ðŸ§ª Rulare Teste

### Rulare Toate Testele
```bash
cd PROJECTS/PROJECT_28_Web_Scraping_Testing_Hybrid
pytest tests/pytest_suite/ -v
```

### Rulare Teste Specifice
```bash
# Scraping tests
pytest tests/pytest_suite/ -v -m scraping

# Hybrid tests (scraping + testing)
pytest tests/pytest_suite/ -v -m hybrid

# Data processing tests
pytest tests/pytest_suite/ -v -m data

# Validation tests
pytest tests/pytest_suite/ -v -m validation

# Smoke tests
pytest tests/pytest_suite/ -v -m smoke
```

### Rulare cu Output Detaliat
```bash
# Cu print statements
pytest tests/pytest_suite/ -v -s

# Cu HTML report
pytest tests/pytest_suite/ -v --html=reports/report.html
```

---

## ðŸ” Scraping Features Available

### 1. Text Content Scraping
- Scrape text din paginÄƒ
- CSS selector support
- BeautifulSoup parsing

### 2. Links Scraping
- Scrape toate linkurile
- Absolute URL conversion
- Link text È™i attributes

### 3. Table Data Scraping
- Scrape date din tabele
- Row È™i column extraction
- Multiple tables support

### 4. Element Scraping
- Scrape dupÄƒ CSS selector
- Attribute extraction
- Custom selectors

### 5. robots.txt Check
- Verificare robots.txt
- Permission checking
- Respectare guidelines

---

## ðŸ“Š Data Validation

### URL Validation
- Format validation
- Protocol checking
- Domain validation

### Text Validation
- Length validation
- Content checking
- Empty text detection

### Link Validation
- URL format
- Valid links detection
- Invalid links reporting

### Table Data Validation
- Structure validation
- Column consistency
- Row validation

---

## ðŸ’¾ Data Storage

### JSON Storage
```python
storage = DataStorage()
storage.save_to_json(data, 'filename')
loaded = storage.load_from_json('filename')
```

### CSV Storage
```python
storage.save_to_csv(data, 'filename')
df = storage.load_from_csv('filename')
```

### Pandas Processing
```python
df = storage.save_to_dataframe(data)
df = storage.process_data(data, operations=['sort', 'filter'])
df = storage.aggregate_data(data, group_by='column', aggregate='count')
```

---

## ðŸ’¡ Example Output

### Scraping Test:
```
test_scrape_and_validate_text PASSED
Robots.txt check: {'exists': True, 'url': '...'}
âœ… Scraped and validated 150 text items
```

### Hybrid Test:
```
test_validate_and_test_functionality PASSED
Robots.txt: True
Total links: 25
Valid links: 24
Invalid links: 1
âœ… Combined scraping validation and functional testing
```

### Storage Test:
```
test_save_scraped_data_to_json PASSED
âœ… Saved and loaded 10 records from JSON
```

---

## ðŸ’¡ Tips È™i Best Practices

1. **Pentru Legal Scraping:**
   - Check robots.txt Ã®nainte
   - Respect rate limits
   - Use proper User-Agent
   - Get permission cÃ¢nd necesar

2. **Pentru Accurate Scraping:**
   - Wait pentru content sÄƒ se Ã®ncarce
   - Use explicit waits
   - Handle dynamic content
   - Verify selectors

3. **Pentru Data Validation:**
   - Validate imediat dupÄƒ scraping
   - Check data completeness
   - Verify data format
   - Handle edge cases

4. **Pentru Storage:**
   - Save Ã®n multiple formats (JSON, CSV)
   - Use pandas pentru processing
   - Organize data files
   - Version control pentru data

---

## ðŸ” Troubleshooting

### Problem: "robots.txt not found"
**Solution:**
- Some sites don't have robots.txt
- Continue with caution
- Check Terms of Service

### Problem: "No data scraped"
**Solution:**
- Verify selectors
- Check page loaded correctly
- Wait for dynamic content
- Verify element presence

### Problem: "Validation fails"
**Solution:**
- Review validation rules
- Check data format
- Adjust validation criteria
- Handle edge cases

---

## ðŸ“š Legal Best Practices

### robots.txt:
- Check robots.txt Ã®nainte de scraping
- Respect User-agent rules
- Follow crawl-delay directives

### Terms of Service:
- Read È™i understand ToS
- Get permission pentru commercial use
- Document permissions

### Rate Limiting:
- Don't overload servers
- Add delays Ã®ntre requests
- Respect server capacity

---

**Succes cu Web Scraping + Testing (legal È™i responsabil)! ðŸ•·ï¸**


