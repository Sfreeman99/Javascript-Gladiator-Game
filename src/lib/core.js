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
            this.rage -= 15;
        }
        return this.health;
    };
    this.attack = function attack(defender) {
        const d = getRandomIntInclusive(this.attackLow, this.attackHigh);
        const randInt = getRandomIntInclusive(1, 100);
        if (randInt < this.rage) {
            this.rage = 0;
            defender.health = defender.health - d * 2;
        } else {
            this.rage += 15;
            defender.health -= d;
        }
    };
    this.isDead = function() {
        if (this.health <= 0) {
            return true;
        } else {
            return false;
        }
    };
}

function Saiyan(name) {
    this.level = 0;
    this.maxHealth = 500;
    this.health = 500; //Starting Point of health
    this.rage = 50; //Starting Rage
    this.attackLow = Math.floor(Math.random() * 50);
    this.attackHigh = Math.floor(
        // The highest the player attack can hit
        Math.random() * (25 - this.attackLow) + (this.attackLow + 1)
    );
    this.heal = function() {
        // This is how the player can heal if they have enough rage
        if (this.rage >= 30 && this.health === this.maxHealth) {
            this.health += 0;
            this.rage -= 0;
        }

        if (this.rage >= 30 && this.health < this.maxHealth) {
            this.health += 30;
            this.rage -= 30;
            if (this.health > this.maxHealth) {
                this.health = this.maxHealth;
            }
        }
    };
    this.attack = function attack(defender) {
        const d = getRandomIntInclusive(this.attackLow, this.attackHigh);
        const randInt = getRandomIntInclusive(1, 100);
        if (randInt < this.rage) {
            this.rage = 0;
            defender.health = defender.health - d * 2;
        } else {
            this.rage += 15;
            defender.health -= d;
        }
    };
    this.forms = {
        0: {
            title: 'Saiyan',
            gif: '../../assets/Pictures/Base_Form.gif',
            transformation: '../../assets/Pictures/Base_Form.gif'
        },
        1: {
            title: 'Super Saiyan',
            gif: '../../assets/Pictures/SS_Pic.gif',
            transformation:
                '../../assets/transformation/Super_Saiyan_Transfomation.gif'
        },
        2: {
            title: 'Super Saiyan 2',
            gif: '../../assets/Pictures/SS2_Pic.gif',
            transformation: '../../assets/transformation/SS2_Transformation.gif'
        },
        3: {
            title: 'SSG',
            gif: '../../assets/Pictures/Super_Saiyan_God_Pic.gif',
            transformation: '../../assets/transformation/'
        },
        4: {
            title: 'SSGSS',
            gif: '../../assets/Pictures/SSGSS_Pic.gif',
            transformation:
                '../../assets/transformation/Super_Saiyan_God_Super_Saiyan_Transformation.gif'
        },
        5: {
            title: 'SSGSS Kioken',
            gif: '../../assets/Pictures/SSGSS_Kioken_Pic.gif',
            transformation:
                '../../assets/transformation/SSGSS_Kioken_Transformation.gif'
        },
        6: {
            title: 'Ultra Instinct',
            gif: '../../assets/Pictures/Ultra_Instinct_Pic.gif',
            transformation: '../../assets/Pictures/Ultra_Instinct_Pic.gif'
        }
    };
    this.gifImage = this.forms[this.level].gif;

    this.isDead = function() {
        if (this.health <= 0) {
            return true;
        } else {
            return false;
        }
    };
    this.transform = function() {
        if (this.rage >= 50) {
            this.level += 1;
            this.maxHealth += 50;
            this.health += 50;
            this.rage -= 50;
            this.attackLow += 10;
            this.attackHigh += 10;
            this.name = this.forms[this.level].title + ' ' + name; //Name of the person from the form
            this.gifImage = this.forms[this.level].gif;
        }
    };
    this.name = this.forms[this.level].title + ' ' + name; //Name of the person from the form
}

//________________________JQuery Below ___________________________________________________

exports.Gladiator = Gladiator;
exports.Saiyan = Saiyan;
