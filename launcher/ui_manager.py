import os
import logging

class UIManager:
    @staticmethod
    def setup_console():
        """Setup console appearance"""
        os.system('mode con: cols=50 lines=20')
        os.system('title Swordmasters.io Hack')
        os.system('color 0a')
        
        print("""
╔════════════════════════════════╗
║      SWORDMASTERS.IO HACK     ║
╠════════════════════════════════╣
║      Enhanced Version 3.0      ║
╚════════════════════════════════╝
        """)
        
    @staticmethod
    def setup_logging():
        """Setup logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(message)s'
        )