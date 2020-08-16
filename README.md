# Spider UI 🕷 🕸

Bare minimum interface elements for building web UIs. Every element in the library is a custom element with a shadow DOM and an API defined largely by attributes.

What sets Spider UI apart from other web component UI libraries?

- Styles are exposed through slots for easy customization.
- Accessibility is baked in.
- No other framework prescriptions except `upgraded-element`, the custom element engine that powers each element.

## Contribute

This library is managed using Lerna.

### Setup

Clone and install dependencies:

```sh
$ git clone git@github.com:geotrev/spider-ui.git
$ cd spider-ui
$ npm i # this will also run `lerna bootstrap --hoist`
```

If you plan to do dependency management, make sure you install `lerna` globally:

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

### Package Scripts

All packages that build and test code for use throughout the library use the same set of (up to) four scripts.

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
