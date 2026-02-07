"""
Pytest configuration și fixtures pentru Web Scraping + Testing Hybrid
"""
import pytest
import logging
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import requests

# Configurare logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@pytest.fixture(scope="function")
def driver():
    """
    Fixture pentru WebDriver - optimizat pentru scraping + testing
    """
    logger.info("Setting up WebDriver for scraping + testing...")
    
    chrome_options = Options()
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    
    try:
        driver_path = ChromeDriverManager().install()
        service = Service(driver_path)
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except Exception as e:
        logger.error(f"Error setting up ChromeDriver: {e}")
        try:
            driver = webdriver.Chrome(options=chrome_options)
        except Exception as e2:
            raise Exception(f"Cannot create WebDriver: {e2}")
    
    yield driver
    
    logger.info("Closing WebDriver...")
    try:
        driver.quit()
    except Exception as e:
        logger.warning(f"Error closing WebDriver: {e}")


@pytest.fixture
def base_url():
    """Base URL pentru teste - TREBUIE să fie site propriu sau cu permisiune"""
    return os.getenv("BASE_URL", "https://quotes.toscrape.com/")


@pytest.fixture
def http_session():
    """HTTP session pentru robots.txt checks"""
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    })
    yield session
    session.close()

