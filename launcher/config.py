import os

class Config:
    # Chrome settings
    CHROME_PROFILE = "C:/selenium/Chrome_Test_Profile"
    CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"
    CHROME_DEBUG_PORT = 9222
    GAME_URL = "https://swordmasters.io"
    
    # JavaScript files in order of dependency
    HACK_FILES = [
        'config.js',
        'styles.js',
        'speedHack.js',
        'gameHacks.js',
        'adBlocker.js',
        'main.js'
    ]
    
    @classmethod
    def get_hack_code(cls):
        """Reads and combines all hack JavaScript files into a single IIFE"""
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        js_modules = {}
        
        # Read all files
        for file in cls.HACK_FILES:
            file_path = os.path.join(base_dir, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Remove export statements
                content = content.replace('export ', '')
                js_modules[file] = content
        
        # Combine into single IIFE
        combined_code = """
(function() {
    'use strict';
    
    // Config
    %s
    
    // Styles
    %s
    
    // SpeedHack
    %s
    
    // GameHacks
    %s
    
    // AdBlocker
    %s
    
    // Main initialization
    %s
    
})();
""" % (
            js_modules['config.js'],
            js_modules['styles.js'],
            js_modules['speedHack.js'],
            js_modules['gameHacks.js'],
            js_modules['adBlocker.js'],
            js_modules['main.js'].replace('(function() {', '').replace('})();', '')
        )
        
        return combined_code