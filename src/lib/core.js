const $ = require('jquery');
// get a random number between the max and min of a number
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Everything about a Gladiator
function Gladiator(name) {
    this.name = name; // where the name will live
    this.health = 100; // health of the current gladiator
    this.rage = 0; // chance of getting a critical hit rises as the rage rises
    this.attackLow = Math.floor(Math.random() * 25); // the lowest attack power the gladiator can get
    this.attackHigh = Math.floor(
        // The highest the player attack can hit
        Math.random() * (25 - this.attackLow) + (this.attackLow + 1)
    );
    this.heal = function() {
        // This is how the player can heal if they have enough rage
        if (this.rage >= 15) {
            this.health += 15;
        }
        return this.health;
    };
    this.attack = function attack(defender) {
        const d = getRandomIntInclusive(this.attackLow, this.attackHigh);
        const rage = getRandomIntInclusive(1, 100);
        if (rage < d) {
            this.rage = 0;
            defender.health = defender.health - d * 2;
        } else {
            defender.health -= d;
            this.rage += 15;
        }
    };
    this.isDead = function() {
        if (this.health <= 0) {
            return 'Dead';
        } else {
            return 'Alive';
        }
    };
}

function main() {
    new Gladiator();
}
//________________________JQuery Below ___________________________________________________

$(main);
exports.Gladiator = Gladiator;
