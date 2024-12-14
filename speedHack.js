export class SpeedHack {
    constructor() {
        this.originalDateNow = Date.now;
        this.baseTime = this.originalDateNow();
        this.multiplier = 1;
        this.enabled = false;
    }

    enable() {
        if (!this.enabled) {
            this.enabled = true;
            Date.now = () => {
                const currentTime = this.originalDateNow();
                return this.baseTime + (currentTime - this.baseTime) * this.multiplier;
            };
        }
    }

    disable() {
        if (this.enabled) {
            this.enabled = false;
            Date.now = this.originalDateNow;
        }
    }

    setMultiplier(value) {
        this.multiplier = value;
        if (this.enabled) {
            this.baseTime = this.originalDateNow();
        }
    }
}