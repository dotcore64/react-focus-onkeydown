# react-focus-onkeydown

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> React higher order component for getting focus of a component when a key is pressed anywhere in the page

## Live demo

You can see the simplest demo here: [Live demo](https://perrin4869.github.io/react-focus-onkeydown)

## Install

```
$ npm install --save react-focus-onkeydown
```

## Examples

Run examples:

```javascript
cd examples
npm install
npm start
```

## Usage

```javascript
import React, { propTypes } from 'react';
import focusOnKeyDown from 'react-focus-onkeydown';

const EnhancedInput = focusOnKeyDown("input");
const () => (
  // Typing any key will trigger aa focus on the input below
  <EnhancedInput />
)
```

## Props

### focusOnKeyDown

Type: `boolean`, default: `true`

Activates or deactivates focus feature

## TODO

* Improve examples

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/react-focus-onkeydown/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/react-focus-onkeydown

[npm-badge]: https://img.shields.io/npm/v/react-focus-onkeydown.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-focus-onkeydown

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/react-focus-onkeydown/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/react-focus-onkeydown

[dependency-status-badge]: https://david-dm.org/perrin4869/react-focus-onkeydown.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/react-focus-onkeydown

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/react-focus-onkeydown/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/react-focus-onkeydown#info=devDependencies
