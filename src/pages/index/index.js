const $ = require('jquery');
const core = require('../../lib/core');
const app = $('#app');
var turnBool = true;
function moves(attacker, defender) {
    $('#attack').click(function() {
        attacker.attack(defender);
        turn(attacker, defender);
        GameOver(attacker, defender);
    });
}
function turn(Gladiator1, Gladiator2) {
    if (turnBool === true) {
        app.html(view(Gladiator1, Gladiator2));
        moves(Gladiator1, Gladiator2);
        turnBool = false;
    }
    if (turnBool === false) {
        app.html(view(Gladiator2, Gladiator1));
        moves(Gladiator2, Gladiator1);
        turnBool = true;
    }
}

function GameOver(attacker, defender) {
    if (defender.isDead() === true) {
        var end = [
            "<div class='row'>",
            "<h1 style='color: Green; text-align: center'> Winner: " +
                attacker.name +
                ' </h1>',
            '</div>',
            "<div class='row'>",
            "<h1 style='color: red; text-align: center'> Loser: " +
                defender.name +
                ' </h1>',
            '</div>'
        ];
        app.html(end.join(' '));
    } else {
        turn(attacker, defender);
    }
}

function view(attacker, defender) {
    return [
        '<div row>',
        "<div class='col-lg-6' id='Player1'><h3>",
        'Gladiator Name: &nbsp;' +
            attacker.name +
            '|| &nbsp;Health: ' +
            attacker.health +
            '|| &nbsp;Rage: ' +
            attacker.rage +
            '|| &nbsp; Attack Low: ' +
            attacker.attackLow +
            '|| &nbsp; Attack High: ' +
            attacker.attackHigh +
            '</h3></div>',
        "<div class='col-lg-6' id='Player2'><h3>",
        'Gladiator Name: &nbsp;' +
            defender.name +
            '|| &nbsp;Health: ' +
            defender.health +
            '|| &nbsp;Rage: ' +
            defender.rage +
            '|| &nbsp; Attack Low: ' +
            defender.attackLow +
            '|| &nbsp; Attack High: ' +
            defender.attackHigh +
            '</h3></div>',
        "<div row><div class='col-lg-12' id='moves'>",
        attacker.name +
            " what do you want to do: &nbsp;<button class='btn btn-danger' id='attack'> Attack </button>",
        "<button class='btn btn-danger' id='heal'> Heal </button>"
    ].join(' ');
}
function main() {
    $('#submit').click(function() {
        const Player1 = new core.Gladiator($('#Player1').val());
        const Player2 = new core.Gladiator($('#Player2').val());
        turn(Player1, Player2);
    });
    // $('#app').html(view(Player1, Player2));
}

$(main);
