# `@spider-ui/global-event-registry`

This is a utility for tracking and managing global DOM events. If you are working with popover elements like tooltips, modals, dropdowns, and the like, then you might need to know about this package. Read on!

## Problem

In a complex user interface, it's common for UI elements to use global events in order to manage their visible state. Examples of usage include

- A modal element using the escape key to close itself.
- A popover (tooltip, dropdown, etc) which closes either by clicking off of its popover content or pressing the escape key.

So how do you prevent one escape key press from closing a dropdown inside a modal at the same time?

## Solution

To work around competing global events (e.g., multiple elements registering the same type of event with trigger conditions), this utility implements a [global data store](#data-store), comprised of an [event context](#context) and [event registry](#registry), to track these events.

While this tool is used in Spider UI elements, it can easily be used in your own application for keeping global event state in sync.

- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN/Bundle](#cdn-bundle)
- [Methods](#methods)
- [Data Store](#data-store)
  - [Context](#context)
  - [Registry](#registry)

## Usage

The package exports a single named module called `globalEventRegistry`. It has [two methods](#methods), and attaches a [global store object](#data-store) to the window of the page.

Here is a simple example where, if the current [context](#context) is the active one, it will remove itself when the escape key is pressed anywhere on the page.

```js
import { globalEventRegistry } from "@spider-ui/global-event-registry"

// Add a new context
globalEventRegistry.add({
  events: ["keydown"],
  id: "id-123",
  callback: (e) => {
    if (e.key === "Escape") {
      globalEventRegistry.remove("id-123")
    }
  },
})
```

## Install

`@spider-ui/global-event-registry` requires minimal set up with either npm or the distribution code.

### npm

Install the package and its peer dependency:

```sh
$ npm i@spider-ui/global-event-registry
```

Then import the element in your JavaScript:

```js
import { globalEventRegistry } from "@spider-ui/global-event-registry"
```

### Bundle

If you don't want to use npm, you can grab the source from jsdelivr CDN.

```html
<!-- Use the unminified bundle in development -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.3-alpha.1/dist/global-event-registry.js"
  integrity="sha256-3nPev33dmWS+V4MzIghyEL5Pix/ceiHTmkTNYI3U3TI="
  crossorigin="anonymous"
></script>

<!-- Or use the minified/uglified bundle in production -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.3-alpha.1/dist/global-event-registry.min.js"
  integrity="sha256-0lJWkFuGtk6ucUcGXTlRe9wuUv67786DZ824tw7ZFu4="
  crossorigin="anonymous"
></script>
```

Then you're good to go!

### Methods

### Data Store

#### Context

#### Registry
