"""
Base Page pentru toate page objects
Optimizat pentru Scraping + Testing
"""
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import logging

logger = logging.getLogger(__name__)


class BasePage:
    """Clasă de bază pentru toate page objects"""
    
    def __init__(self, driver):
        """
        Constructor
        
        Args:
            driver: WebDriver instance
        """
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def navigate_to(self, url):
        """
        Navighează la o URL
        
        Args:
            url: URL-ul de navigat
        """
        self.logger.info(f"Navigating to: {url}")
        self.driver.get(url)
    
    def wait_for_element(self, locator, timeout=10):
        """Așteaptă ca un element să fie prezent"""
        try:
            return self.wait.until(EC.presence_of_element_located(locator))
        except TimeoutException:
            self.logger.error(f"Element not found: {locator}")
            raise
    
    def is_element_present(self, locator, timeout=5):
        """Verifică dacă un element este prezent"""
        try:
            self.wait_for_element(locator, timeout)
            return True
        except TimeoutException:
            return False

