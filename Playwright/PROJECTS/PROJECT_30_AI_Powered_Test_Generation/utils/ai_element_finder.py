"""
AI-Powered Element Finder
Proof-of-concept pentru identificare automată de elemente folosind heuristics și pattern matching
Simulează AI-based element identification
"""
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import NoSuchElementException
import re
import logging

logger = logging.getLogger(__name__)


class AIElementFinder:
    """
    AI-Powered Element Finder
    Folosește heuristics și pattern matching pentru identificare automată de elemente
    """
    
    def __init__(self, driver=None):
        """
        Constructor
        
        Args:
            driver: WebDriver instance
        """
        self.driver = driver
    
    def set_driver(self, driver):
        """Set WebDriver"""
        self.driver = driver
    
    def find_by_text_pattern(self, text_pattern, element_type="*"):
        """
        Găsește elemente bazat pe text pattern (NLP-like)
        
        Args:
            text_pattern: Text pattern pentru căutare (ex: "login", "submit", "email")
            element_type: Tip element (button, input, link, etc.)
            
        Returns:
            List[WebElement]: Lista de elemente găsite
        """
        if not self.driver:
            raise ValueError("Driver not set. Call set_driver() first.")
        
        elements = []
        text_pattern_lower = text_pattern.lower()
        
        # Pattern matching pentru common terms
        patterns = self._generate_search_patterns(text_pattern_lower)
        
        # Caută după text în diferite moduri
        for pattern in patterns:
            try:
                # Caută după text visible
                xpath = f"//{element_type}[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{pattern}')]"
                found = self.driver.find_elements(By.XPATH, xpath)
                elements.extend(found)
                
                # Caută după value attribute
                xpath = f"//{element_type}[contains(translate(@value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{pattern}')]"
                found = self.driver.find_elements(By.XPATH, xpath)
                elements.extend(found)
                
                # Caută după placeholder
                xpath = f"//{element_type}[contains(translate(@placeholder, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{pattern}')]"
                found = self.driver.find_elements(By.XPATH, xpath)
                elements.extend(found)
                
            except Exception as e:
                logger.debug(f"Error in pattern search {pattern}: {e}")
        
        # Remove duplicates
        unique_elements = []
        element_ids = set()
        for elem in elements:
            try:
                elem_id = elem.id
                if elem_id not in element_ids:
                    element_ids.add(elem_id)
                    unique_elements.append(elem)
            except:
                pass
        
        logger.info(f"Found {len(unique_elements)} elements for pattern '{text_pattern}'")
        return unique_elements
    
    def find_by_semantic_meaning(self, semantic_description, driver=None):
        """
        Găsește elemente bazat pe descriere semantică (NLP-based)
        
        Args:
            semantic_description: Descriere semantică (ex: "submit button", "email input")
            driver: WebDriver (opțional, dacă nu e setat în constructor)
            
        Returns:
            List[WebElement]: Lista de elemente găsite
        """
        if not driver:
            driver = self.driver
        if not driver:
            raise ValueError("Driver not set")
        
        semantic_lower = semantic_description.lower()
        elements = []
        
        # Parse semantic description
        element_type = self._extract_element_type(semantic_lower)
        action = self._extract_action(semantic_lower)
        
        # Caută după tip și acțiune
        if element_type and action:
            patterns = self._generate_semantic_patterns(action, element_type)
            for pattern in patterns:
                found = driver.find_elements(By.XPATH, pattern)
                elements.extend(found)
        
        # Remove duplicates
        unique_elements = []
        element_ids = set()
        for elem in elements:
            try:
                elem_id = elem.id
                if elem_id not in element_ids:
                    element_ids.add(elem_id)
                    unique_elements.append(elem)
            except:
                pass
        
        logger.info(f"Found {len(unique_elements)} elements for semantic '{semantic_description}'")
        return unique_elements
    
    def find_best_match(self, description, driver=None):
        """
        Găsește cel mai bun match pentru o descriere (AI-like scoring)
        
        Args:
            description: Descriere element
            driver: WebDriver (opțional)
            
        Returns:
            WebElement sau None
        """
        if not driver:
            driver = self.driver
        if not driver:
            raise ValueError("Driver not set")
        
        # Try multiple strategies
        candidates = []
        
        # Strategy 1: Semantic search
        semantic_results = self.find_by_semantic_meaning(description, driver)
        candidates.extend([(elem, 0.8) for elem in semantic_results])
        
        # Strategy 2: Text pattern
        text_results = self.find_by_text_pattern(description)
        candidates.extend([(elem, 0.6) for elem in text_results])
        
        # Strategy 3: ID/Name matching
        id_results = self._find_by_id_name(description, driver)
        candidates.extend([(elem, 0.9) for elem in id_results])
        
        # Score și sortează
        scored = {}
        for elem, score in candidates:
            try:
                elem_id = elem.id
                if elem_id not in scored or score > scored[elem_id][1]:
                    scored[elem_id] = (elem, score)
            except:
                pass
        
        if scored:
            # Return best match
            best = max(scored.values(), key=lambda x: x[1])
            logger.info(f"Best match found with score {best[1]:.2f}")
            return best[0]
        
        return None
    
    def _generate_search_patterns(self, text):
        """Generează pattern-uri de căutare din text"""
        patterns = [text]
        
        # Remove common words
        common_words = ['the', 'a', 'an', 'button', 'field', 'input', 'link']
        words = [w for w in text.split() if w.lower() not in common_words]
        if words:
            patterns.append(' '.join(words))
            patterns.append(words[0])  # First word
        
        # Add variations
        if 'login' in text:
            patterns.append('sign in')
            patterns.append('signin')
        if 'submit' in text:
            patterns.append('send')
            patterns.append('confirm')
        
        return patterns[:3]  # Return top 3
    
    def _generate_semantic_patterns(self, action, element_type):
        """Generează pattern-uri XPath bazate pe semantic"""
        patterns = []
        
        # Button patterns
        if element_type == 'button':
            if action in ['submit', 'send', 'confirm']:
                patterns.append(f"//button[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{action}')]")
                patterns.append(f"//input[@type='submit' and contains(translate(@value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{action}')]")
        
        # Input patterns
        if element_type == 'input':
            if action in ['email', 'username', 'user']:
                patterns.append("//input[@type='email']")
                patterns.append("//input[@name='email' or @name='username' or @id='email' or @id='username']")
            elif action in ['password', 'pass']:
                patterns.append("//input[@type='password']")
        
        return patterns
    
    def _extract_element_type(self, description):
        """Extrage tipul elementului din descriere"""
        if 'button' in description:
            return 'button'
        elif 'input' in description or 'field' in description:
            return 'input'
        elif 'link' in description:
            return 'a'
        elif 'text' in description:
            return 'text'
        return '*'
    
    def _extract_action(self, description):
        """Extrage acțiunea din descriere"""
        actions = ['submit', 'send', 'login', 'sign in', 'email', 'password', 'username']
        for action in actions:
            if action in description:
                return action
        return None
    
    def _find_by_id_name(self, description, driver):
        """Caută după ID sau name attribute"""
        elements = []
        description_clean = description.lower().replace(' ', '_').replace('-', '_')
        
        try:
            # Try ID
            elem = driver.find_element(By.ID, description_clean)
            elements.append(elem)
        except:
            pass
        
        try:
            # Try name
            elem = driver.find_element(By.NAME, description_clean)
            elements.append(elem)
        except:
            pass
        
        return elements

