const $ = require('jquery');
const core = require('../../lib/core');
function turn() {
    var turnBool = true;
    if (turnBool === true) {
    }
}
function main() {
    $('#submit').click(function() {
        const Player1 = new core.Gladiator($('#Player1').val());
        const Player2 = new core.Gladiator($('#Player2').val());
        $('#app').html(view(Player1, Player2));
    });
    // $('#app').html(view(Player1, Player2));
}

function view(attacker, defender) {
    return [
        '<div row>',
        "<div class='col-lg-6' id='Player1'><h3>",
        'Gladiator Name: &nbsp;' +
            attacker.name +
            '|| &nbsp;Health: ' +
            attacker.health +
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

$(main);
