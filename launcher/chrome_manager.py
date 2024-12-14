import os
import time
import psutil
import subprocess
import logging
from selenium import webdriver
from .config import Config

class ChromeManager:
    @staticmethod
    def is_chrome_running():
        """Check if Chrome is already running with debugging"""
        for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
            try:
                if proc.info['name'] == 'chrome.exe':
                    cmdline = proc.info['cmdline']
                    if cmdline and f'--remote-debugging-port={Config.CHROME_DEBUG_PORT}' in cmdline:
                        return True
            except:
                continue
        return False

    @staticmethod
    def start_chrome():
        """Start Chrome with debugging enabled"""
        os.makedirs(Config.CHROME_PROFILE, exist_ok=True)
        
        chrome_cmd = f'"{Config.CHROME_PATH}" --remote-debugging-port={Config.CHROME_DEBUG_PORT} '\
                    f'--user-data-dir="{Config.CHROME_PROFILE}" --no-first-run '\
                    f'--no-default-browser-check "{Config.GAME_URL}"'
        
        subprocess.Popen(chrome_cmd, shell=True)
        time.sleep(5)
        logging.info("[+] Chrome started successfully!")

    @staticmethod
    def connect_chrome():
        """Connect to Chrome using Selenium"""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_experimental_option("debuggerAddress", f"127.0.0.1:{Config.CHROME_DEBUG_PORT}")
        return webdriver.Chrome(options=chrome_options)