# Spider UI 🕷 🕸

Bare minimum interface elements for building web UIs. Every element in the library is a custom element with a shadow DOM and an API defined largely by attributes.

What sets Spider UI apart from other web component UI libraries?

- All styles are configurable by consumers through slotted content.
- Accessibility is baked in.
- No other framework prescriptions except `upgraded-element`, the custom element engine that powers each element.

## Contribute

This library is managed using [Lerna](https://github.com/lerna/lerna).

### Setup

Clone and install dependencies:

```sh
$ git clone git@github.com:geotrev/spider-ui.git
$ cd spider-ui
$ npm i # this will also run `lerna bootstrap --hoist`
```

If you plan to do any dependency management, make sure you install `lerna` globally:

```sh
$ npm i -g lerna
```

### Global Scripts

Build all packages for development:

```sh
$ npm run build
```

Build all packages for publishing (minified + uglified):

```sh
$ npm run build:publish
```

Run all tests:

```sh
$ npm test
```

Lint sass and javascript using eslint and stylelint.

```sh
$ npm run lint
```

### Package Scripts

All packages that build and/or test code use the same set of (up to) five scripts.

Run the package in `watch` mode:

```sh
$ npm run watch
```

Build the package for development:

```sh
$ npm run build
```

Build the package for publishing (also runs on `prepublishOnly`):

```sh
$ npm run build:publish
```

Run the package's tests:

```sh
$ npm test
```

Run tests in `watch` mode:

```sh
$ npm run test:watch
```

## Support

It's recommended to use Spider UI web components in a modern browser stack. Out of the box, IE 11 is not supported, although there could be a polyfilled version in the future.

`@spider-ui/tooltip` relies on these JavaScript features:

- Symbols
- Custom Elements
- Shadow DOM

If you need IE and Edge support, you'll need to install and include the webcomponents polyfill and core-js for Symbols:

```sh
$ npm i -D @webcomponents/webcomponentsjs
$ npm i -D core-js
```

In your JS, you can import the Symbol polyfill like so:

```js
import "core-js/features/promise"
```
