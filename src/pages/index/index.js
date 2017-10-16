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
        //Both fighters Names
        "<div class='container'>",
        "<div class='row'>",
        "<div class='col-lg-6'><h3>Name: " + attacker.name + '</h3></div>',
        "<div class='col-lg-6'><h3>Name: " + defender.name + '</h3></div>',
        '</div>',
        //Both fighters health bars
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-success' role='progressbar' style='width:" +
            attacker.health +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Health: " +
            attacker.health +
            '</div>',
        '</div>',
        '</div>',
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-success' role='progressbar' style='width:" +
            defender.health +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Health: " +
            defender.health +
            '</div>',
        '</div>',
        '</div>',
        '</div>',
        // both fighters rage bars
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-danger' role='progressbar' style='width:" +
            attacker.rage +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Rage: " +
            attacker.rage +
            '</div>',
        '</div>',
        '</div>',
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-danger' role='progressbar' style='width:" +
            defender.rage +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Rage: " +
            defender.rage +
            '</div>',
        '</div>',
        '</div>',
        '</div>',
        //Attack Low
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack Low: ' + attacker.attackLow + '</h4></div>',
        '</div>',
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack Low: ' + defender.attackLow + '</h4></div>',
        '</div>',
        "<div class='row'></div>",
        //Attack High
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack High: ' + attacker.attackHigh + '</h4></div>',
        '</div>',
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack High: ' + defender.attackHigh + '</h4></div>',
        //
        "<div row><div class='col-lg-12' id='moves'>",
        attacker.name +
            " what do you want to do: &nbsp;<button class='btn btn-danger' id='attack'> Attack </button>",
        "<button class='btn btn-danger' id='heal'> Heal </button>",
        '</div></div>'
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
