# `@spider-ui/global-event-registry`

![CircleCI status (master)](https://badgen.net/circleci/github/geotrev/spider-ui/master) ![minified + gzip size](https://badgen.net/bundlephobia/minzip/@spider-ui/global-event-registry) ![npm version](https://badgen.net/npm/v/@spider-ui/global-event-registry) ![dependencies](https://badgen.net/david/dep/geotrev/spider-ui/packages/global-event-registry) ![devDependencies](https://badgen.net/david/dev/geotrev/spider-ui/packages/global-event-registry)

Typically, adding multiple event listeners to an element in the DOM means each handler is called every time the event is triggered. This can be problematic for things "stacking" visually in the DOM, though, because one key press shouldn't always dismiss all layers.

As a result, `globalEventRegistry` was born. It adds a thin layer around `window.addEventListener` and `window.removeEventListener` to control which handler should be called next based on a [stack](https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues#stacks) strategy.

- [Problem](#problem)
- [Solution](#solution)
- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Data Store](#data-store)
  - [Event Stack](#event-stack)
  - [Event Registry](#event-registry)

## Usage

There are two methods you can use: `register` and `unregister`. Additionally, you can peek into the [global data store](#debugging) for debugging purposes.

### register(config)

Registers a new event to the page. All events created this way will set `useCapture`.

Parameters:

- `config` (type: `Object`, required) - The configuration for your event. This is used to track your event in the registry.
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

You can also check the `window.__SPIDER_UI_GLOBAL_EVENT_REGISTRY__.types` to see which event types are active (each will entry will be a key/value pair: the type and number of registered events for that type, respectively).

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
<!-- development -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.7/dist/global-event-registry.js"
  integrity="sha256-InlSDBLEyA4zzz0krmrVGDPvODuIPUD8oDoQGlcZ1uE="
  crossorigin="anonymous"
></script>

<!-- production (minified + uglified) -->
<script
  defer
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.7/dist/global-event-registry.min.js"
  integrity="sha256-sW4QIKz3duPUoyhz1zZGOLDCMunEp30h3KgdsIpuJAY="
  crossorigin="anonymous"
></script>
```

Then you're good to go!
