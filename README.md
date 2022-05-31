# react-focus-onkeydown

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]

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

const () => {
  const ref = useRef(null);
  useFocusOnKeyDown(ref);

  // Typing any key will trigger a focus on the input below
  return <input ref={ref} />;
}
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
