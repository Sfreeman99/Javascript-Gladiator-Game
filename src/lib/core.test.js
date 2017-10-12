const core = require('./core');

describe('Gladiator', function() {
    test('has 100 health', function() {
        expect(new core.Gladiator().health).toEqual(100);
    });
    test('has 0 rage at the beginning', function() {
        expect(new core.Gladiator().rage).toEqual(0);
    });
    test("attack high is higher than it's attack low", function() {
        var G = new core.Gladiator();
        expect(G.attackLow).toBeLessThan(G.attackHigh);
    });
});
describe('Gladiator Attack', function() {
    test('Can do damage to another player', function() {
        var P1 = new core.Gladiator();
        var P2 = new core.Gladiator();
        P1.attack(P2);
        expect(P1.rage).toEqual(15);
        expect(P2.health).toBeGreaterThanOrEqual(75);
        expect(P2.health).toBeLessThanOrEqual(99);
    });
});
