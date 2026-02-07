"""
Platform detection și utilities pentru cross-platform testing
"""
import platform
import os
import sys
import logging

logger = logging.getLogger(__name__)


class PlatformUtils:
    """Clasă pentru platform detection și utilities"""
    
    @staticmethod
    def get_platform_info():
        """
        Obține informații despre platformă
        
        Returns:
            dict: Platform information
        """
        return {
            'system': platform.system(),
            'platform': platform.platform(),
            'machine': platform.machine(),
            'processor': platform.processor(),
            'python_version': f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
            'python_executable': sys.executable,
            'is_windows': platform.system().lower() == 'windows',
            'is_linux': platform.system().lower() == 'linux',
            'is_macos': platform.system().lower() == 'darwin'
        }
    
    @staticmethod
    def get_path_separator():
        """
        Obține path separator pentru platformă curentă
        
        Returns:
            str: Path separator
        """
        if platform.system().lower() == 'windows':
            return '\\'
        else:
            return '/'
    
    @staticmethod
    def normalize_path(path: str):
        """
        Normalizează path pentru platformă curentă
        
        Args:
            path: Path string
            
        Returns:
            str: Normalized path
        """
        if platform.system().lower() == 'windows':
            return path.replace('/', '\\')
        else:
            return path.replace('\\', '/')
    
    @staticmethod
    def get_chrome_driver_path():
        """
        Obține path către ChromeDriver pentru platformă
        
        Returns:
            str: ChromeDriver path sau None
        """
        platform_name = platform.system().lower()
        
        try:
            from webdriver_manager.chrome import ChromeDriverManager
            driver_path = ChromeDriverManager().install()
            return driver_path
        except Exception as e:
            logger.error(f"Error getting ChromeDriver path: {e}")
            return None
    
    @staticmethod
    def is_ci_environment():
        """
        Verifică dacă rulează în CI/CD environment
        
        Returns:
            bool: True dacă este CI/CD
        """
        ci_vars = ['CI', 'GITHUB_ACTIONS', 'JENKINS_URL', 'TRAVIS', 'CIRCLECI']
        return any(os.getenv(var) for var in ci_vars)
    
    @staticmethod
    def get_platform_specific_config():
        """
        Obține configurare specifică platformă
        
        Returns:
            dict: Platform-specific configuration
        """
        platform_name = platform.system().lower()
        
        config = {
            'headless': False,
            'window_size': '1920,1080',
            'download_path': None
        }
        
        if platform_name == 'windows':
            config['download_path'] = os.path.join(os.path.expanduser('~'), 'Downloads')
            config['window_size'] = '1920,1080'
        elif platform_name == 'linux':
            config['headless'] = True  # Default pentru Linux în CI
            config['download_path'] = os.path.join(os.path.expanduser('~'), 'Downloads')
            config['window_size'] = '1920,1080'
        elif platform_name == 'darwin':  # macOS
            config['download_path'] = os.path.join(os.path.expanduser('~'), 'Downloads')
            config['window_size'] = '1920,1080'
        
        return config
    
    @staticmethod
    def print_platform_info():
        """Printează informații despre platformă"""
        info = PlatformUtils.get_platform_info()
        
        print("\n" + "=" * 80)
        print("PLATFORM INFORMATION")
        print("=" * 80)
        print(f"System: {info['system']}")
        print(f"Platform: {info['platform']}")
        print(f"Machine: {info['machine']}")
        print(f"Processor: {info['processor']}")
        print(f"Python Version: {info['python_version']}")
        print(f"Python Executable: {info['python_executable']}")
        print(f"Is Windows: {info['is_windows']}")
        print(f"Is Linux: {info['is_linux']}")
        print(f"Is macOS: {info['is_macos']}")
        print(f"CI Environment: {PlatformUtils.is_ci_environment()}")
        print("=" * 80 + "\n")

