# `@spider-ui/global-event-registry`

This is a utility for tracking and managing global DOM events. If you are working with popover elements like tooltips, modals, dropdowns, and the like, then you might need to know about this package. Read on!

- [Problem](#problem)
- [Solution](#solution)
- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Data Store](#data-store)
  - [Stack](#stack)
  - [Registry](#registry)

## Problem

In a complex user interface, it's common for UI elements to use global events in order to manage some type of visual app state. Examples of usage include using the escape key to close a modal, or clicking off of a context menu, to close them.

So what happens if you have a dropdown open inside of a modal? Pressing escape closes them both, right? That's what this utility can fix. 🎉

## Solution

To better manage global events (e.g., multiple elements registering the same type of event with identical trigger conditions), this utility implements a [global data store](#data-store) and a simple [API](#usage) to manage the events.

While this tool is used in Spider UI elements, it can easily be used in your own application for keeping global state in sync. Read more at the end of this README.

## Usage

There are two methods to interact with, `register` and `unregster`. Additionally, you can peek into the [data store](#data-store) for debugging purposes.

### register(configObject)

Registers a new global event to the page.

Parameters:

- `configObject` (type: `Object`, required) - The configuration for your event. This is used to track your event in the registry.
  - `config.id` (type: `String`, required): A unique identifier for the global event. Used to unregister your event.
  - `config.callback` (type: `Function`, required): Your global event handler. Only triggered if your event is next in the registry stack.
  - `config.events` (type: `Array`, required): Event types that can trigger your global event. E.g., `"click"`, `"keydown"`, etc...

Example:

```js
globalEventRegistry.register({
  events: ["focusout", "click"],
  id: "id-123",
  callback: (event) => {
    /**
     * If `event.type` is `focusout` or `click` AND this entry
     * is next in the stack, this event will trigger
     * */
  },
})
```

### unregister(id)

Parameters:

- `id` (type: `String`, required): The `config.id` of your previously registered global event.

Removes your global event from the page.

The only parameter is the `id` you previously used to register the event with. `unregister` will always remove your event no matter where it is in the stack, but it will check the most recent entry first.

It's recommended to trigger `unregister` as part of your registered callback to ensure you aren't unregistering outside of the global event [stack](#stack) context.

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

## Data Store

As mentioned in the beginning, this utility keeps track of global events with a global data store. There are two main parts:

1. A stack, which describes the order of events (and their data) registered to the page; and
2. A registry, which handles creating and removing global event listeners from the page.

### Stack

The Stack is essentially an array of objects describing the order of registered global events. You can see its data (read-only) from `window.__GLOBAL_EVENT_REGISTRY__`.

Like the data structure, registered entries are handled in a last in, first out approach.

Let's look at a simple example. Let's say there's currently a modal dialog open on the page. The stack would likely resemble this:

```
[
  {
    events: ["keydown"],
    id: "cool-modal",
    callback: Handler,
  },
  {
    events: ["keydown", "click"],
    id: "cool-dropdown",
    callback: Handler,
  },
]
```

Since the dropdown is the last entry in the stack, only its callback can be triggered, even if other entries have the registered the same event type.

Additionally, if other entries in the stack were to have some other event types, such as "focus", they would be ignored since the last entry doesn't include that event type (despite the listener being registered).

### Registry

The Registry is a property whose value is an object, viewable from `window.__GLOBAL_EVENT_REGISTRY__.registry`.

All the Registry will do is keep track of how many events are registered by entries in the Stack.

Using the previous Stack above as an example, the value of the Registry would be:

```
{
  keydown: 2,
  click: 1
}
```

The general flow of the Registry is this:

1. When a new global event is **added**, increment the counter of those events by 1. If the event didn't exist previously, set the counter to 1.
2. When an event is **removed**, decrement its counter by 1. If its counter was already 1, that means we're removing the last entry in the stack with that event type, so delete the event counter's entry.

And that's it.
