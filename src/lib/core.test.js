const core = require('./core');

describe('foo', function() {
    test('should return 5', function() {
        expect(other.foo()).toEqual(5);
    });
});
describe('Gladiator', function() {
    test('has 100 health', function() {
        expect(new core.Gladiator().health).toEqual(100);
    });
    test('has 0 rage at the beginning', function() {
        expect(new core.Gladiator().rage).toEqual(0);
    });
    test('random attack power of 25 or below', function() {
        expect(new core.Gladiator().attack).toBeLessThanOrEqual(25);
    });
});
