const $ = require('jquery');
const core = require('../../lib/core');
const app = $('#app');
var turnBool = true;

function ProgressBar(attacker, defender) {
    const attackerHealth = Math.floor(
        attacker.health / attacker.maxHealth * 100
    );
    const defenderHealth = Math.floor(
        defender.health / defender.maxHealth * 100
    );
    console.log('P1: ' + attackerHealth);
    console.log('P2: ' + defenderHealth);
    if (attackerHealth < 50 && attackerHealth >= 25) {
        $('#Player1')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-warning');
    }
    if (attackerHealth < 25) {
        $('#Player1')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-danger');
    }

    if (defenderHealth < 50 && defenderHealth >= 25) {
        $('#Player2')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-warning');
    }
    if (defenderHealth < 25) {
        $('#Player2')
            .removeClass('progress-bar-success')
            .addClass('progress-bar-danger');
    }
}

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

function moves(Gladiator1, Gladiator2) {
    // ProgressBar(Gladiator1, Gladiator2);
    if (turnBool === true && Gladiator1.rage < 30) {
        $('#heal').addClass('disabled');
    }
    if (turnBool === true && Gladiator1.rage < 50) {
        $('#transform').addClass('disabled');
    }
    if (turnBool === false && Gladiator2.rage < 30) {
        $('#heal').addClass('disabled');
    }
    if (turnBool === false && Gladiator2.rage < 50) {
        $('#transform').addClass('disabled');
    }
    $('#attack').click(function() {
        if (turnBool === true) {
            turnBool = false;
            Gladiator1.attack(Gladiator2);
            GameOver(Gladiator1, Gladiator2);
        } else {
            turnBool = true;
            Gladiator2.attack(Gladiator1);
            GameOver(Gladiator1, Gladiator2);
        }
    });
    $('#heal').click(function() {
        if (turnBool === true) {
            turnBool = false;
            Gladiator1.heal();
            GameOver(Gladiator1, Gladiator2);
        } else {
            turnBool = true;
            Gladiator2.heal();
            GameOver(Gladiator1, Gladiator2);
        }
    });
    $('#transform').click(function() {
        if (turnBool === true) {
            turnBool = false;
            Gladiator1.transform();
            GameOver(Gladiator1, Gladiator2);
        } else {
            turnBool = true;
            Gladiator2.transform();
            GameOver(Gladiator1, Gladiator2);
        }
    });
}
function turn(Gladiator1, Gladiator2) {
    if (turnBool === true) {
        app.html(view(Gladiator1, Gladiator2) + buttons(Gladiator1));
        ProgressBar(Gladiator1, Gladiator2);
        moves(Gladiator1, Gladiator2);
    } else {
        app.html(view(Gladiator1, Gladiator2) + buttons(Gladiator2));
        ProgressBar(Gladiator1, Gladiator2);
        moves(Gladiator1, Gladiator2);
    }
}

function GameOver(Gladiator1, Gladiator2) {
    if (Gladiator2.isDead() === true) {
        var finishMove = [
            '<h3> Finishing Move </h3>',
            "<img src='../../assets/ending/end_game.gif' width='75%' height='75%'> "
        ];
        var end = [
            "<div class='row'>",
            "<h1 style='color: Green; text-align: center'> Winner: " +
                Gladiator1.name +
                ' </h1>',
            '</div>',
            "<div class='row'>",
            "<h1 style='color: red; text-align: center'> Loser: " +
                Gladiator2.name +
                ' </h1>',
            '</div>'
        ];
        app.html(finishMove.join(' '));
        setTimeout(function() {
            app.html(end.join(' '));
        }, 3500);
    }
    if (Gladiator1.isDead() === true) {
        var finishMove = [
            '<h3> Finishing Move </h3>',
            "<img src='../../assets/ending/end_game.gif' width='75%' height='75%'> "
        ];
        var end = [
            "<div class='row'>",
            "<h1 style='color: Green; text-align: center'> Winner: " +
                Gladiator2.name +
                ' </h1>',
            '</div>',
            "<div class='row'>",
            "<h1 style='color: red; text-align: center'> Loser: " +
                Gladiator1.name +
                ' </h1>',
            '</div>'
        ];
        app.html(finishMove.join(' '));
        setTimeout(function() {
            app.html(end.join(' '));
        }, 3500);
    }
    if (Gladiator1.isDead() === false && Gladiator2.isDead() === false) {
        turn(Gladiator1, Gladiator2);
    }
}
function buttons(attacker) {
    return [
        "<div row><div class='col-lg-12' id='moves'>",
        attacker.name +
            " what do you want to do: &nbsp;<button class='btn btn-danger' id='attack'> Attack </button>",
        "<button class='btn btn-danger' id='heal'> Heal </button>",
        "<button class='btn btn-danger' id='transform'> Transform </button>",
        '</div></div>'
    ].join('');
}
function view(Gladiator1, Gladiator2) {
    return [
        "<div class='container'>",
        "<div class='row'>",
        //Gladiator1 gif
        "<div class='col-lg-6'>",
        "<img id='Gladiator1' src='" +
            image_for(Gladiator1) +
            "' width='500px' height='250px'>",
        '</div>',
        //Gladiator2 gif
        "<div class='col-lg-6'>",
        "<img id='Gladiator2' src='" +
            image_for(Gladiator2) +
            "' width='500px' height='250px'>",
        '</div>',
        '</div>',
        "<div class='row'>",
        //Gladiator1 Name
        "<div class='col-lg-6'><h3>Name: " + Gladiator1.name + '</h3></div>',
        //Gladiator2 Name
        "<div class='col-lg-6'><h3>Name: " + Gladiator2.name + '</h3></div>',
        '</div>',
        //Gladiator1 Health
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-success' id='Player1' role='progressbar' style='width:" +
            Gladiator1.health / Gladiator1.maxHealth * 100 +
            "%' aria-valuenow='" +
            Gladiator1.health / Gladiator1.maxHealth * 100 +
            "' aria-valuemin='0' aria-valuemax='500'> Health: " +
            Math.floor(Gladiator1.health / Gladiator1.maxHealth * 100) +
            '%' +
            '</div>',
        '</div>',
        '</div>',
        //Gladiator2 Health
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-success' id='Player2' role='progressbar' style='width:" +
            Gladiator2.health / Gladiator2.maxHealth * 100 +
            "%' aria-valuenow='" +
            Gladiator2.health / Gladiator2.maxHealth * 100 +
            "' aria-valuemin='0' aria-valuemax='500'> Health: " +
            Math.floor(Gladiator2.health / Gladiator2.maxHealth * 100) +
            '%' +
            '</div>',
        '</div>',
        '</div>',
        '</div>',
        // Gladiator1 Rage Bar
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-danger' role='progressbar' style='width:" +
            Gladiator1.rage +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Rage: " +
            Gladiator1.rage +
            '</div>',
        '</div>',
        '</div>',
        // Gladiator2 Rage
        "<div class='col-lg-6'>",
        "<div class='progress'>",
        "<div class='progress-bar progress-bar-danger' role='progressbar' style='width:" +
            Gladiator2.rage +
            "%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'> Rage: " +
            Gladiator2.rage +
            '</div>',
        '</div>',
        '</div>',
        '</div>',
        //Gladiator1 Attack Low
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack Low: ' + Gladiator1.attackLow + '</h4></div>',
        '</div>',
        // Gladiator2 Attack Low
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack Low: ' + Gladiator2.attackLow + '</h4></div>',
        '</div>',
        "<div class='row'></div>",
        //Gladiator1 Attack High
        "<div class='row'>",
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4>Attack High: ' + Gladiator1.attackHigh + '</h4></div>',
        '</div>',
        // Gladiator2 Attack High
        "<div class='col-lg-6'>",
        "<div class='well'>",
        '<h4> Attack High: ' + Gladiator2.attackHigh + '</h4></div>',
        ,
        //Gladiator1 Buttons
        '</div></div>'
    ].join(' ');
}
function main() {
    $('#submit').click(function() {
        const Player1 = new core.Saiyan($('#Player1').val()); // Get Player One Name
        const Player2 = new core.Saiyan($('#Player2').val()); // Get Player Two Name
        // const History = [];
        turn(Player1, Player2); //Start the Game
    });
}

$(main);
