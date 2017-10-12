function Gladiator() {
    this.health = 100;
    this.rage = 0;
    this.attack = Math.floor(Math.random() * 25);
}

function main() {
    new Gladiator();
}
//________________________JQuery Below ___________________________________________________

$(main);
