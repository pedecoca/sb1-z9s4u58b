// ==UserScript==
// @name         Enhanced Sword Masters.io Hack
// @namespace    http://tampermonkey.net/
// @version      3.0.0
// @description  Advanced hack for Sword Masters.io with multiple features and improved UI
// @author       Discord >> _pedecoca
// @match        https://swordmasters.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=swordmasters.io
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/518724/Enhanced_Sword_Masters_Hack.user.js
// @updateURL https://update.greasyfork.org/scripts/518724/Enhanced_Sword_Masters_Hack.meta.js
// ==/UserScript==

import { CONFIG } from './config.js';
import { STYLES } from './styles.js';
import { SpeedHack } from './speedHack.js';
import { GameHacks } from './gameHacks.js';
import { AdBlocker } from './adBlocker.js';

(function() {
    'use strict';

    // Initialize components
    const speedHack = new SpeedHack();
    const gameHacks = new GameHacks(window.pc?.app);
    const adBlocker = new AdBlocker(CONFIG.blockedDomains);

    // Apply styles
    const styleElement = document.createElement('style');
    styleElement.textContent = STYLES;
    document.head.appendChild(styleElement);

    // Create enhanced UI
    function createEnhancedUI() {
        const menu = document.createElement('div');
        menu.id = 'hack-menu';
        menu.innerHTML = `
            <h3>Enhanced Sword Masters Hack v${CONFIG.version}</h3>
            
            <div class="feature-toggle">
                <span>Speed Hack</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="speed-toggle">
                    <span class="slider"></span>
                </label>
            </div>
            <div class="value-control">
                <input type="range" class="value-slider" id="speed-slider" min="1" max="1000" value="1">
                <span id="speed-value">1x</span>
            </div>

            <div class="feature-toggle">
                <span>God Mode</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="god-mode-toggle">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="feature-toggle">
                <span>Instant Kill</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="instant-kill-toggle">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="feature-toggle">
                <span>No Clip</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="no-clip-toggle">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="feature-toggle">
                <span>Unlimited Resources</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="unlimited-resources-toggle">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="stat-display">
                <div>Ads Blocked: <span id="ads-blocked">0</span></div>
                <div>Active Features: <span id="active-features">0</span></div>
            </div>
        `;
        document.body.appendChild(menu);

        // Make menu draggable
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        menu.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === menu) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                menu.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        // Setup event listeners
        document.getElementById('speed-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                speedHack.enable();
            } else {
                speedHack.disable();
            }
            updateStats();
        });

        document.getElementById('speed-slider').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('speed-value').textContent = `${value}x`;
            speedHack.setMultiplier(value);
        });

        document.getElementById('god-mode-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameHacks.enableGodMode();
            }
            updateStats();
        });

        document.getElementById('instant-kill-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameHacks.enableInstantKill();
            }
            updateStats();
        });

        document.getElementById('no-clip-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameHacks.enableNoClip();
            }
            updateStats();
        });

        document.getElementById('unlimited-resources-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                gameHacks.setUnlimitedResources();
            }
            updateStats();
        });
    }

    // Update statistics display
    function updateStats() {
        const adsBlocked = document.getElementById('ads-blocked');
        const activeFeatures = document.getElementById('active-features');
        
        const stats = adBlocker.getStats();
        adsBlocked.textContent = stats.blocked;
        
        const active = [
            document.getElementById('speed-toggle').checked,
            document.getElementById('god-mode-toggle').checked,
            document.getElementById('instant-kill-toggle').checked,
            document.getElementById('no-clip-toggle').checked,
            document.getElementById('unlimited-resources-toggle').checked
        ].filter(Boolean).length;
        
        activeFeatures.textContent = active;
    }

    // Initialize everything
    function init() {
        adBlocker.init();
        createEnhancedUI();
        
        // Update stats periodically
        setInterval(updateStats, 1000);
        
        console.log('[Enhanced Hack] Successfully loaded!');
    }

    // Start when the game is ready
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
})();