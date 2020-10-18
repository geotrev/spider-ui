# Spider UI 🕷 🕸

![CircleCI status (master)](https://badgen.net/circleci/github/geotrev/spider-ui/master)

Build applications with modern interaction patterns in regular ol' HTML. Spider elements enable you to import a single JavaScript file, and use a custom element anywhere. No other JavaScript required.

All elements use [`upgraded-element`](https://github.com/geotrev/upgraded-element) as their base class (which is also the only dependency of the library).

Components planned:

- [x] [Tooltip](packages/tooltip/)
- [ ] Collapse
- [ ] Tabs
- [ ] Toggle
- [ ] Progress Bar
- [ ] Button Group
- [ ] Breadcrumbs

Other components which could be useful in the future, but aren't explicitly planned for at the moment:

- [ ] Modal
- [ ] Popover
- [ ] Toast / Notification
- [ ] Badge
- [ ] Card
- [ ] Carousel
- [ ] Navigation Bar
- [ ] Pagination

**ToC:**

- [Why?](#why)
- [Contribute](#contribute)
- [Setup](#setup)
- [Global Scripts](#global-scripts)
- [Package Scripts](#package-scripts)
- [Support](#support)

## Why?

Spider UI's primary goal is to provide a way to get modern UI patterns with regular HTML.

With shadow roots and custom elements on the scene, we can write our elements (or components) as encapsulated standalone plugins a la bootstrap.

In addition to the above, Spider UI's foremost goals also include:

- Accessible by default
- Configuration through attributes, aka the HTML standard
- Everything is stylable with slots
- Zero JavaScript required (except the bundles and any secondary dependencies)

## Contribute

Contributors, pull requests, and issues welcome. Don't be a stranger. :)

### Setup

Clone and install dependencies:

```sh
$ git clone git@github.com:geotrev/spider-ui.git
$ cd spider-ui
$ npm run bootstrap
```

Since the repo is managed using [Lerna](https://github.com/lerna/lerna), you should also install that globally:

```sh
$ npm i -g lerna
```

### Global Scripts

Build all packages for development:

```sh
$ npm run build
```

Build all packages for publishing (minify + terser):

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

It's recommended to use Spider UI web elements in a modern browser stack. Out of the box, IE 11 is not supported, although there could be a polyfill bundle in the future.

Features that would need to be polyfilled:

- Symbols
- Custom Elements
- Shadow DOM

There's a [robust polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#how-to-use) available for web components. You can use core-js to polyfill Symbols and other generic JavaScript features.
