const _ = require('lodash');
const Chalk = require('chalk');

function compare(a, b) {
  var nameA = JSON.stringify(a);
  var nameB = JSON.stringify(b);
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

expect.extend({
  toBeSimilar(received, expected) {
    try {
      if(_.isNull(expected)) {
        expect(received).toBeNull();
      } else if(_.isArray(expected)) {
        expect(_.isArray(received)).toBe(true);
        try{
          expect(received.length).toEqual(expected.length);
        } catch(e) {
          expect(received.sort(compare)).toEqual(expected.sort(compare));
        }
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
          pass: true,
          message: () => ` expected is similar to received
          Expected: ${Chalk.blue(expected)}
          Received: ${Chalk.red(received)}
          `
      };
    } catch(ex) {
      return {
          pass: false,
          message: () => ex.message
      };
    }
  }
});
