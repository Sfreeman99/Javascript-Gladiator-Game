const core = require('./core');

describe('Gladiator Standard', function() {
    test('has a name', function() {
        expect(new core.Gladiator('foo').name).toBe('foo');
    });
    test('has 100 health', function() {
        expect(new core.Gladiator('foo').health).toEqual(100);
    });
    test('has 0 rage at the beginning', function() {
        expect(new core.Gladiator('foo').rage).toEqual(0);
    });
    test("attack high is higher than it's attack low", function() {
        var G = new core.Gladiator('foo');
        expect(G.attackLow).toBeLessThan(G.attackHigh);
    });
});
describe('Gladiator Attack', function() {
    test('Can do damage to another player', function() {
        var P1 = new core.Gladiator('foo');
        var P2 = new core.Gladiator('doo');
        P1.attack(P2);
        expect(P1.rage).toBeGreaterThanOrEqual(0);
        expect(P2.health).toBeGreaterThanOrEqual(50);
        expect(P2.health).toBeLessThanOrEqual(99);
    });
    // test('Can hit critical', function () {
    //     var P1 = new core.Gladiator('foo');
    //     var P2 = new core.Gladiator('doo');
    // });
});
describe('Gladiator Heal', function() {
    test('Should heal health', function() {
        var P1 = new core.Gladiator('foo');
        var P2 = new core.Gladiator('doo');
        P1.attack(P2);
        P2.rage = 15;
        expect(P2.health).toBeLessThan(P2.heal());
    });
});

describe('Gladiator health', function() {
    test('is dead', function() {
        var player = new core.Gladiator();
        player.health = 0;
        expect(player.isDead()).toEqual(true);
    });
    test('is alive', function() {
        var player = new core.Gladiator();
        player.health = 1;
        expect(player.isDead()).toEqual(false);
    });
});
