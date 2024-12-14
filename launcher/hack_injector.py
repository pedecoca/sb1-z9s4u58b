import logging
import time
from .config import Config

class HackInjector:
    def __init__(self, driver):
        self.driver = driver
        
    def inject_hack(self):
        """Inject the hack code into the page"""
        try:
            # Get combined hack code
            hack_code = Config.get_hack_code()
            
            # Wait for page to be fully loaded
            self.driver.execute_script("return document.readyState").strip()
            
            # Inject the code
            logging.info("[*] Injecting hack code...")
            self.driver.execute_script(hack_code)
            
            # Wait for hack to initialize
            time.sleep(2)
            logging.info("[+] Hack injected successfully!")
            
            return True
        except Exception as e:
            logging.error(f"[-] Failed to inject hack: {str(e)}")
            return False
            
    def verify_injection(self):
        """Verify that the hack was injected correctly"""
        try:
            result = self.driver.execute_script("""
                return Boolean(
                    document.querySelector('#hack-menu') && 
                    window.PokiSDK
                );
            """)
            return result
        except:
            return False