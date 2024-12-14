export const STYLES = `
    #hack-menu {
        position: fixed;
        top: 206px;
        left: 3px;
        background: rgba(0,0,0,0.85);
        color: #00ff00;
        padding: 20px;
        border-radius: 15px;
        z-index: 9999;
        width: 300px;
        font-family: 'Segoe UI', Arial, sans-serif;
        border: 2px solid #00ff00;
        cursor: move;
        box-shadow: 0 0 20px rgba(0,255,0,0.3);
        backdrop-filter: blur(5px);
    }
    #hack-menu h3 {
        text-align: center;
        margin-bottom: 15px;
        color: #00ff00;
        text-shadow: 0 0 10px rgba(0,255,0,0.5);
        font-size: 24px;
    }
    .feature-toggle {
        display: flex;
        align-items: center;
        margin: 10px 0;
        padding: 8px;
        background: rgba(0,0,0,0.3);
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    .feature-toggle:hover {
        background: rgba(0,255,0,0.1);
    }
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin-left: auto;
    }
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #333;
        transition: .4s;
        border-radius: 34px;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    input:checked + .slider {
        background-color: #00ff00;
    }
    input:checked + .slider:before {
        transform: translateX(26px);
    }
    .value-control {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
    }
    .value-slider {
        flex: 1;
        height: 10px;
        -webkit-appearance: none;
        background: #333;
        border-radius: 5px;
        outline: none;
    }
    .value-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: #00ff00;
        border-radius: 50%;
        cursor: pointer;
    }
    .stat-display {
        background: rgba(0,0,0,0.3);
        padding: 10px;
        border-radius: 8px;
        margin-top: 15px;
        font-family: monospace;
        font-size: 12px;
    }
    @keyframes rainbow-pulse {
        0% { box-shadow: 0 0 20px rgba(255,0,0,0.5); }
        20% { box-shadow: 0 0 20px rgba(255,165,0,0.5); }
        40% { box-shadow: 0 0 20px rgba(255,255,0,0.5); }
        60% { box-shadow: 0 0 20px rgba(0,255,0,0.5); }
        80% { box-shadow: 0 0 20px rgba(0,0,255,0.5); }
        100% { box-shadow: 0 0 20px rgba(255,0,0,0.5); }
    }
    #hack-menu {
        animation: rainbow-pulse 5s infinite;
    }
`;