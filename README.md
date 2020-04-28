## Problem
Jest is an amazing test runner and has some awesome assertion APIs built in by default.
However I was not able to find a simple solution for testing deep equality while ignoring order.
Even (jest-extended)[https://github.com/jest-community/jest-extended] did not have an easy solution.

## Solution
This simple jest extension to test deep equality while ignoring order of object properties and array elements

## Installation

With npm:
```sh
npm install --save-dev jest-similar
```

With yarn:
```sh
yarn add -D jest-similar
```

## Setup

### Jest >v24

Add `jest-similar` to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

``` json
"jest": {
  "setupFilesAfterEnv": ["jest-similar"]
}
```

### Jest <v23

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-similar"
}
```

If you are already using another test framework, like [jest-chain](https://github.com/mattphillips/jest-chain), then you should create a test setup file and `require` each of the frameworks you are using.

For example:

```js
// ./testSetup.js
require('jest-similar');
```

Then in your Jest config:

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

### Typescript

If your editor does not recognise the custom `jest-similar` matchers, add a `global.d.ts` file to your project with:

```ts
import 'jest-similar';
```

## API

#### .toBeSimilar()

For usage see test.js

## LICENSE

[MIT](/LICENSE)
