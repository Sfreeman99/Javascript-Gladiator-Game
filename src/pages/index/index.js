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
// function Images(attacker, defender) {
//     $('#attacker').attr('src', '../../assets/Pictures/Base_Form.gif');
//     $('#defender').attr('src', '../../assets/Pictures/Base_Form.gif');
// }

function image_for(gladiator) {
    if (gladiator.level === 0) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 1) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 2) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 3) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 4) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 5) {
        return gladiator.forms[gladiator.level].gif;
    } else if (gladiator.level === 6) {
        return gladiator.forms[gladiator.level].gif;
    } else {
        return gladiator.forms[6].transformation;
    }
}

function moves(attacker, defender) {
    ProgressBar(attacker, defender);
    if (attacker.rage < 15) {
        $('#heal').addClass('disabled');
    }
    if (attacker.rage < 15) {
        $('#transform').addClass('disabled');
    }
    $('#attack').click(function() {
        attacker.attack(defender);
        GameOver(attacker, defender);
    });
    $('#heal').click(function() {
        attacker.heal();
        GameOver(attacker, defender);
    });
    $('#transform').click(function() {
        attacker.transform();
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
        console.log(attacker);
        console.log(defender);
        turn(attacker, defender);
    }
}

function view(attacker, defender) {
    return [
        "<div class='container'>",
        "<div class='row'>",
        //Attacker gif
        "<div class='col-lg-6'>",
        "<img id='attacker' src='" +
            image_for(attacker) +
            "' width='500px' height='250px'>",
        '</div>',
        //Defender gif
        "<div class='col-lg-6'>",
        "<img id='defender' src='" +
            image_for(defender) +
            "' width='500px' height='250px'>",
        '</div>',
        '</div>',
        "<div class='row'>",
        //Attacker Name
        "<div class='col-lg-6'><h3>Name: " + attacker.name + '</h3></div>',
        //Defender Name
        "<div class='col-lg-6'><h3>Name: " + defender.name + '</h3></div>',
        '</div>',
        //Attacker Health
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
        //Defender Health
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
        // Attacker Rage Bar
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
        // Defender Rage
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
        //Attacker Attack Low
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack Low: ' + attacker.attackLow + '</h4></div>',
        '</div>',
        // Defender Attack Low
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack Low: ' + defender.attackLow + '</h4></div>',
        '</div>',
        "<div class='row'></div>",
        //Attacker Attack High
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack High: ' + attacker.attackHigh + '</h4></div>',
        '</div>',
        // Defender Attack High
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack High: ' + defender.attackHigh + '</h4></div>',
        //Attacker Buttons
        "<div row><div class='col-lg-12' id='moves'>",
        attacker.name +
            " what do you want to do: &nbsp;<button class='btn btn-danger' id='attack'> Attack </button>",
        "<button class='btn btn-danger' id='heal'> Heal </button>",
        "<button class='btn btn-danger' id='transform'> Transform </button>",
        '</div></div>'
    ].join(' ');
}
function main() {
    $('#submit').click(function() {
        const Player1 = new core.Saiyan($('#Player1').val()); // Get Player One Name
        const Player2 = new core.Saiyan($('#Player2').val()); // Get Player Two Name
        turn(Player1, Player2); //Start the Game
    });
}

$(main);
