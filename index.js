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

function alterString(str) {
  return str.toLowerCase().replace( /[\r\n ]+/gm, "" );
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
      } else if(_.isString(expected)) {
        //compare ignoring case and spaces
        expect(alterString(received)).toEqual(alterString(expected));
      } else {
        expect(received).toEqual(expected);
      }
      return {
          pass: true,
          message: () => ` expected is similar to received
  ${Chalk.yellow("Expected:")} ${Chalk.green(JSON.stringify(expected))}
  ${Chalk.yellow("Received:")} ${Chalk.red(JSON.stringify(received))}
          `
      };
    } catch(ex) {
      return {
          pass: false,
          message: () => ` expected is not similar to received
  ${Chalk.yellow("Expected:")} ${Chalk.green(JSON.stringify(expected))}
  ${Chalk.yellow("Received:")} ${Chalk.red(JSON.stringify(received))}
  ${ex.message}
          `
      };
    }
  }
});
