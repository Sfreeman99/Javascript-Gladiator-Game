const $ = require('jquery');
const core = require('../../lib/core');
const app = $('#app');
var turnBool = true;

function ProgressBar(attacker, defender) {
    if (attacker.health < 50 && attacker.health >= 25) {
        $('#Player1')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-warning');
    }
    if (attacker.health < 25) {
        $('#Player1')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-danger');
    }

    if (defender.health < 50 && defender.health >= 25) {
        $('#Player2')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-warning');
    }
    if (defender.health < 25) {
        $('#Player2')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-danger');
    }
}

function moves(attacker, defender) {
    ProgressBar(attacker, defender);
    if (attacker.rage < 15) {
        $('#heal').addClass('disabled');
    }
    $('#attack').click(function() {
        attacker.attack(defender);
        GameOver(attacker, defender);
    });
    $('#heal').click(function() {
        attacker.heal();
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
        "<div class='progress-bar progress-bar-success' id='Player1' role='progressbar' style='width:" +
            attacker.health +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Health: " +
            attacker.health +
            '</div>',
        '</div>',
        '</div>',
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-success' id='Player2' role='progressbar' style='width:" +
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
