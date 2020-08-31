# `@spider-ui/global-event-registry`

`globalEventRegistry` adds a thin layer around `window.addEventListener` and `window.removeEventListener` that controls which handler should be called next based on a [stack strategy](https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues#stacks).

If you are working with popover elements like tooltips, modals, dropdowns, and the like, then you might need to know about this package. Read on!

- [Problem](#problem)
- [Solution](#solution)
- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Data Store](#data-store)
  - [Event Stack](#event-stack)
  - [Event Registry](#event-registry)

## Problem

In a complex user interface, it's common for UI elements to use global events in order to manage some type of visual app state. Examples of usage include using the escape key to close a modal, or clicking off of a context menu, to close them.

So what happens if you have a dropdown open inside of a modal? Pressing escape closes them both, right? That's what this utility can fix. 🎉

## Solution

The simplest way to discern between global events is to implement a basic event bus that relies on some form of global state to check which event handler is allowed to be called. The most direct data structure to think of is a Stack, which has a last in, first out approach.

For example, if I set three handlers that can be triggered, with varying conditions (some the same as another), I can use a single listener that checks which callback entry was entered last, call it, and simply pass along the event object.

That's exactly what this utility does!

## Usage

There are two methods to interact with, `register` and `unregister`. Additionally, you can peek into the [global data store](#debugging) for debugging purposes.

### register(configObject)

Registers a new event to the page. All events created this way will set `useCapture`.

Parameters:

- `configObject` (type: `Object`, required) - The configuration for your event. This is used to track your event in the registry.
  - `config.types` (type: `Array`, required): Event types that can trigger your given handler. E.g., `"click"`, `"keydown"`, etc...
  - `config.id` (type: `String`, required): A unique identifier for the global event. Used to unregister your event.
  - `config.handler` (type: `Function`, required): The event handler. Only triggered if your event is next in the registry stack.

Example:

```js
globalEventRegistry.register({
  types: ["focusout", "click"],
  id: "something-neat-123",
  handler: (event) => {
    /**
     * If `event.type` is `focusout` or `click` AND this entry
     * is next in the stack, this event will trigger
     * */
  },
})
```

### unregister(id)

Removes your registered event from the page.

Parameters:

- `id` (type: `String`, required): The `config.id` of your previously registered event.

The only parameter is the `id` you previously used to register your event. `unregister` will always remove your event no matter where it is in the stack, but it will check the most recent entry first.

Extending from the previous example, we'll add a simple conditional in the `handler`:

```js
globalEventRegistry.register({
  types: ["focusout", "click"],
  id: "something-neat-123",
  handler: (event) => {
    if (event.key === "Escape") {
      globalEventRegistry.unregister("something-neat-123")
    }
  },
})
```

It's generally best to call `unregister` in your handler to ensure you're removing from the stack at the correct time.

### Debugging

The stack of registered events can be accessed using `window.__SPIDER_UI_GLOBAL_EVENT_REGISTRY__`.

Your events are represented by the same object you used to `register` with.

You can also check the `types` property on the stack to see which event types are active

## Install

`@spider-ui/global-event-registry` requires minimal set up with either npm or from a CDN.

### NPM

Install the package and its peer dependency:

```sh
$ npm i @spider-ui/global-event-registry
```

Then import the element in your JavaScript:

```js
import { globalEventRegistry } from "@spider-ui/global-event-registry"
```

### CDN

If you don't want to use npm, you can grab the source from jsdelivr CDN (or any CDN which distributes NPM package code, such as nopkg).

```html
<!-- Use the unminified bundle in development -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.5/dist/global-event-registry.js"
  integrity="sha256-Vxh2iNMf6A5b25uuK4Bk8MlJa1tffME8Tj3NBlqc6YA="
  crossorigin="anonymous"
></script>

<!-- Or use the minified/uglified bundle in production -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.5/dist/global-event-registry.min.js"
  integrity="sha256-B2kclYuCujvm8L12W0NP58MzFNXazYJJSxIkqDww4Yc="
  crossorigin="anonymous"
></script>
```

Then you're good to go!
