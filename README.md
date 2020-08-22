# Spider UI 🕷 🕸

Bare minimum interface elements for building web UIs. Every element in the library is a custom element with a shadow DOM and an API defined largely by attributes.

What sets Spider UI apart from other web component UI libraries?

- All styles are configurable by consumers through slotted content. As few styles as possible are added to an element's shadow root.
- Accessibility is baked in.

Spider UI elements use [`upgraded-element`](https://github.com/geotrev/upgraded-element) as their base class, which is also the only dependency of the library.

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

Build the package for publishing (also runs on `prepublishOnly`, this step updates integrity hashes in each `element/*` package):

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

Additionally, it's recommended to use the `:defined` CSS pseudo-selector to ensure there are no flashes of unstyled content from your element before they've been registered to `window.customElements`. This isn't supported in IE 11, either.

If you need IE and Edge support, you'll need to [install relevant polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#how-to-use):

```sh
$ npm i @webcomponents/webcomponentsjs core-js
```

To add symbol support, you can import the Symbol polyfill like so at your app's entry point:

```js
import "core-js/features/symbol"
```

If you already use a babel polyfill or equivalent solution, using core-js is unnecessary.
