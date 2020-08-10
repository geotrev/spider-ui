# Spider UI

Bare minimum interface elements for building web UIs. 🕷 🕸

This is a WIP.

## Contribute

This library is managed using Lerna.

---

Clone and install dependencies:

```sh
$ git clone git@github.com:geotrev/spider-ui.git
$ cd spider-ui
$ npm i -g lerna
$ lerna bootstrap --hoist
```

Build all packages:

```sh
$ npm run build:all
```

Run all tests:

```sh
$ npm test:all
```

Demo a package:

```sh
$ $P=COMPONENT_NAME npm run watch
```

Build a package:

```sh
$ $P=COMPONENT_NAME npm run build
```

Run tests in a single package:

```sh
$ $P=COMPONENT_NAME npm test
```
