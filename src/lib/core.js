const $ = require('jquery');

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Gladiator() {
    this.health = 100;
    this.rage = 0;
    this.attackLow = Math.floor(Math.random() * 25);
    this.attackHigh = Math.floor(
        Math.random() * (25 - this.attackLow) + (this.attackLow + 1)
    );
    this.heal = function() {
        this.health += 15;
    };

    this.attack = function attack(defender) {
        const d = getRandomIntInclusive(this.attackLow, this.attackHigh);
        defender.health -= d;
        this.rage += 15;
    };
    this.isDead = function() {
        if (this.health <= 0) {
            return 'Dead';
        }
    };
}

function main() {
    new Gladiator();
}
//________________________JQuery Below ___________________________________________________

$(main);
exports.Gladiator = Gladiator;
