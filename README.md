# Spider UI 🕷 🕸

Build applications with modern interaction patterns in regular ol' HTML. Spider elements extend the [HTML standard](https://html.spec.whatwg.org/multipage/) to create predictable and flexible UI elements.

All elements use [`upgraded-element`](https://github.com/geotrev/upgraded-element) as their base class, which is also the only dependency of the library.

TODO:

- [ ] update package version on CDN script links in readme/demo files.

## Contribute

Please feel free to file bugs and pull requests as you encounter problems. Ideally, include the behavior you're seeing, the behavior you expect, and reproduction steps

### Setup

Clone and install dependencies:

```sh
$ git clone git@github.com:geotrev/spider-ui.git
$ cd spider-ui
$ npm i # this will also run `lerna bootstrap --hoist`
```

Since the repo is managed primarily using [Lerna](https://github.com/lerna/lerna), you should also install that globally:

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

It's recommended to use Spider UI web elements in a modern browser stack. Out of the box, IE 11 is not supported, although there could be a polyfilled version in the future.

`@spider-ui/tooltip` relies on these JavaScript features:

- Symbols
- Custom Elements
- Shadow DOM

If you need IE and Edge support, you'll need to [install relevant polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#how-to-use):

```sh
$ npm i @webcomponents/webcomponentsjs core-js
```

To add symbol support, you can import the Symbol polyfill like so at your app's entry point:

```js
import "core-js/features/symbol"
```

If you already use a babel polyfill or equivalent solution, using core-js is unnecessary.

## Why?

Front-end web development is complicated, we can all agree on that.

We've reached the point where after configuring our build environments, tools, and pipelines, we just want to build stuff and minimize the difficulty of interface development:

- Lots of accessibility to consider
- Complications of layering contexts: DOM hoisting and z-index management
- Custom JavaScript to handle the seemingly endless nuances of each individual application

Don't get me wrong: these are important problems that are worth the headache in getting right. The thing is, many interactive patterns we've grown accustomed to aren't implemented in the HTML standard by default, despite having a well-documented track record in the many millions of applications out on the WWW.

Many interactions have not just a dozen ways to be implemented, but there's a handful of UI libraries that make reasoning about the implementation a brand new process every single time.

At the end of the day, wouldn't it be nice to just add one or two `script` tags to your page (or in the npm world, import a file), then just write the basic HTML without the need of `data-*` attributes or custom JS transformers and UI libraries?

These are all some of the core concerns in Spider UI aims to relieve.

What we can agree on is that certain interactive patterns have solidified enough, within a tangible range of variations, that it's about time standard HTML could implement these common use-case, all the while providing:

- Room for style customization
- A broad range of configuration through attributes
- An accessible experience out of the box
- A clear and predictable understanding of layering for patterns like dropdowns, modals, and popovers
