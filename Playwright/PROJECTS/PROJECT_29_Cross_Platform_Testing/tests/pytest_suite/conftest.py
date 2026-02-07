"""
Conftest pentru teste fÄƒrÄƒ Allure
ImportÄƒ fixtures din conftest principal
"""
import sys
import os

# ImportÄƒ conftest principal
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
# Fixtures din conftest principal vor fi disponibile automat


