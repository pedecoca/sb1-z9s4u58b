export class GameHacks {
    constructor(game) {
        this.game = game;
        this.originalValues = new Map();
    }

    enableGodMode() {
        if (this.game?.player) {
            this.originalValues.set('health', this.game.player.health);
            this.game.player.health = Infinity;
            this.game.player.takeDamage = () => {};
        }
    }

    enableInstantKill() {
        if (this.game?.weapons) {
            this.game.weapons.forEach(weapon => {
                this.originalValues.set(`weapon_${weapon.id}_damage`, weapon.damage);
                weapon.damage = 99999;
            });
        }
    }

    enableNoClip() {
        if (this.game?.physics) {
            this.game.physics.enabled = false;
            if (this.game.player) {
                this.game.player.collider.enabled = false;
            }
        }
    }

    setUnlimitedResources() {
        if (this.game?.resources) {
            Object.keys(this.game.resources).forEach(resource => {
                Object.defineProperty(this.game.resources, resource, {
                    get: () => Infinity,
                    set: () => {}
                });
            });
        }
    }

    reset() {
        this.originalValues.forEach((value, key) => {
            const [type, id, property] = key.split('_');
            if (type === 'weapon') {
                this.game.weapons.find(w => w.id === id)[property] = value;
            } else {
                this.game.player[key] = value;
            }
        });
        this.originalValues.clear();
        
        if (this.game?.physics) {
            this.game.physics.enabled = true;
            if (this.game.player) {
                this.game.player.collider.enabled = true;
            }
        }
    }
}