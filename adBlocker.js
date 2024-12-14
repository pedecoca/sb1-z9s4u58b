export class AdBlocker {
    constructor(blockedDomains) {
        this.blockedDomains = blockedDomains;
        this.originalFetch = window.fetch;
        this.originalXHR = window.XMLHttpRequest;
        this.blocked = 0;
    }

    init() {
        this.setupFetchIntercept();
        this.setupXHRIntercept();
        this.removeAdElements();
        this.setupMutationObserver();
    }

    setupFetchIntercept() {
        window.fetch = async (url, options) => {
            try {
                const urlObj = new URL(url);
                if (this.blockedDomains.has(urlObj.hostname)) {
                    this.blocked++;
                    console.log(`[AdBlock] Blocked fetch to: ${urlObj.hostname}`);
                    return new Promise(() => {});
                }
            } catch (e) {}
            return this.originalFetch.apply(window, [url, options]);
        };
    }

    setupXHRIntercept() {
        window.XMLHttpRequest = function() {
            const xhr = new this.originalXHR();
            const originalOpen = xhr.open;
            xhr.open = (method, url) => {
                try {
                    const urlObj = new URL(url);
                    if (this.blockedDomains.has(urlObj.hostname)) {
                        this.blocked++;
                        console.log(`[AdBlock] Blocked XHR to: ${urlObj.hostname}`);
                        return;
                    }
                } catch (e) {}
                return originalOpen.apply(xhr, [method, url]);
            };
            return xhr;
        }.bind(this);
    }

    removeAdElements() {
        const selectors = [
            '[id*="ad"]',
            '[class*="ad"]',
            '[id*="poki"]',
            '[class*="poki"]',
            'iframe[src*="google"]',
            'iframe[src*="doubleclick"]',
            'iframe[src*="analytics"]',
            '[id*="banner"]',
            '[class*="banner"]',
            '[id*="sponsor"]',
            '[class*="sponsor"]'
        ];
        
        document.querySelectorAll(selectors.join(','))
            .forEach(el => {
                el.remove();
                this.blocked++;
            });
    }

    setupMutationObserver() {
        const observer = new MutationObserver(() => this.removeAdElements());
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    getStats() {
        return {
            blocked: this.blocked,
            domains: Array.from(this.blockedDomains)
        };
    }
}