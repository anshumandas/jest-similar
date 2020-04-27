const _ = require('lodash');

expect.extend({
  toBeSimilar(received, expected) {
    if(_.isNull(expected)) {
      expect(received).toBeNull();
    } else if(_.isArray(expected)) {
      expect(_.isArray(received)).toBe(true);
      expect(received.length).toEqual(expected.length);
      expect(received).toBeSimilar(expect.arrayContaining(expected));
    } else if(_.isPlainObject(expected)) {
      expect(_.isPlainObject(received)).toBe(true);
      expect(_.keys(received).sort()).toEqual(_.keys(expected).sort());
      for (var key in expected) {
        expect(received[key]).toBeSimilar(expected[key]);
      }
    } else {
      expect(received).toEqual(expected);
    }
    return {
        pass: true
    };
  }
});
