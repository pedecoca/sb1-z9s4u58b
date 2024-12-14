import logging
from .ui_manager import UIManager
from .chrome_manager import ChromeManager
from .hack_injector import HackInjector

def main():
    try:
        # Setup UI and logging
        UIManager.setup_console()
        UIManager.setup_logging()
        
        # Handle Chrome
        if not ChromeManager.is_chrome_running():
            logging.info("[*] Starting Chrome...")
            ChromeManager.start_chrome()
        else:
            logging.info("[+] Chrome already running!")
            
        # Connect to Chrome
        logging.info("[*] Connecting to Chrome...")
        driver = ChromeManager.connect_chrome()
        logging.info("[+] Connected successfully!")
        
        # Inject hack
        injector = HackInjector(driver)
        if injector.inject_hack():
            if injector.verify_injection():
                logging.info("[+] Hack is running successfully!")
            else:
                logging.warning("[!] Hack may not be working correctly")
        
    except KeyboardInterrupt:
        logging.info("\n[*] Shutting down by user command...")
    except Exception as e:
        logging.error(f"\n[-] Error: {str(e)}")
    finally:
        input("\nPress ENTER to exit...")