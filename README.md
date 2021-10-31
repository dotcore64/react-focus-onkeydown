# react-focus-onkeydown

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> React hook for getting focus of a component when a key is pressed anywhere in the page

## Live demo

You can see the simplest demo here: [Live demo](https://codesandbox.io/s/m4qomn34ly)

## Install

```
$ npm install --save react-focus-onkeydown
```

## Examples

Run examples:

```bash
cd examples
npm install
npm start
```

## Usage

```javascript
import { useRef } from 'react';
import useFocusOnKeyDown from 'react-focus-onkeydown';

const () => (
  const ref = useRef(null);
  useFocusOnKeyDown(ref);

  // Typing any key will trigger a focus on the input below
  <input ref={ref} />
)
```

## Parameters

### ref

Type: `ref`, required

`ref` to the target element

### active

Type: `boolean`, default: `true`

Controls whether or not hook is active (i.e., whether or not a keydown will cause the element to focus)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/react-focus-onkeydown/test/master?style=flat-square
[build]: https://github.com/dotcore64/react-focus-onkeydown/actions

[npm-badge]: https://img.shields.io/npm/v/react-focus-onkeydown.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-focus-onkeydown

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/react-focus-onkeydown/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/react-focus-onkeydown

[dependency-status-badge]: https://david-dm.org/dotcore64/react-focus-onkeydown.svg?style=flat-square
[dependency-status]: https://david-dm.org/dotcore64/react-focus-onkeydown

[dev-dependency-status-badge]: https://david-dm.org/dotcore64/react-focus-onkeydown/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/dotcore64/react-focus-onkeydown#info=devDependencies
