# `@spider-ui/tooltip`

![minified + gzip size](https://badgen.net/bundlephobia/minzip/@spider-ui/tooltip) ![npm version](https://badgen.net/npm/v/@spider-ui/tooltip) ![dependencies](https://badgen.net/david/dep/geotrev/spider-ui/packages/tooltip) ![devDependencies](https://badgen.net/david/dev/geotrev/spider-ui/packages/tooltip)

Create an accessible tooltip on an any element. The tooltip will show on focus or hover.

- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN/Bundle](#cdn-bundle)
- [Controlling Visibility](#controlling-visibility)
- [Attributes](#attributes)
- [Slots](#slots)

## Usage

Use the element like so:

```html
<spider-tooltip>
  <button slot="trigger">Learn More</button>
  <div slot="content">You've already learned too much.</div>
</spider-tooltip>
```

Read more about its [attributes](#attributes) and [slots](#slots) below.

## Install

`@spider-ui/tooltip` requires minimal set up with either npm or the distribution code.

### NPM

Install the package and its peer dependencies:

```sh
$ npm i @spider-ui/tooltip @spider-ui/global-event-registry upgraded-element
```

Then import the element in your JavaScript:

```js
import "@spider-ui/tooltip"
```

### Bundle

If you don't want to use npm, you can grab the source from jsdelivr CDN. Make sure the peer dependents are added before the element script:

```html
<!-- Utility Script -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/upgraded-element@0.4.3/dist/upgraded-element.min.js"
  integrity="sha256-M+QI2BA3OVos8+cu/I6VpedoCT2nH7Ik0B2C/r2Yf5c="
  crossorigin="anonymous"
></script>

<!-- Utility script -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/global-event-registry@0.2.7/dist/global-event-registry.min.js"
  integrity="sha256-sW4QIKz3duPUoyhz1zZGOLDCMunEp30h3KgdsIpuJAY="
  crossorigin="anonymous"
></script>

<!-- The element script -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@0.2.7/dist/tooltip.min.js"
  integrity="sha256-tV1z5exT+o2BkfsYdhUInd8bzkVghuuYaRK/7iqqwaY="
  crossorigin="anonymous"
></script>
```

Then you're good to go!

You can optionally replace the `.min.js` extension of the element script with `.js` to use the unminified/uglified variant for better debugging.

## Controlling Visibility

Because slotted elements aren't hidden in the DOM on first render, you may see your element's unstyled content on page load. You can prevent this by adding the following to your app's stylesheet:

```css
spider-tooltip:not(:defined) {
  display: none;
}
```

Unfortunately, however, this won't work in IE 11.

## Attributes

### `position`

> Configures which side of the trigger to show the tooltip.<br/><br/>Default: `"block-start"`<br/><br/>Accepted Values: `"block-start"` | `"block-end"` | `"inline-start"` | `"inline-end"`

```html
<spider-tooltip position="inline-end">...</spider-tooltip>
```

### `show-arrow`

> Configures the tooltip to show an arrow pointing to the trigger.

```html
<spider-tooltip show-arrow>...</spider-tooltip>
```

### `mode`

> Configures the base visual theme of the tooltip.<br/><br/>Default: `"dark"`.<br/>Accepted Values: `"dark"` | `"light"`

```html
<spider-tooltip mode="light">...</spider-tooltip>
```

### `delay-on`

> Configures a custom show delay duration (in milliseconds) for the tooltip.

```html
<spider-tooltip delay-on="500">...</spider-tooltip>
```

### `delay-off`

> Configures a custom hide delay duration (in milliseconds) for the tooltip.

```html
<spider-tooltip delay-off="500">...</spider-tooltip>
```

### `delay`

> Configures both the delay-on and delay-off delay durations of the tooltip. Use `delay-on` and `delay-off` to override the show and hide delay durations, respectively.<br/><br/>Default: `"300"`

```html
<spider-tooltip delay="500">...</spider-tooltip>
```

## Slots

### trigger

The trigger element for the tooltip. This can be any element, but it's recommended to be a focusable element (e.g., a `button`) for better accessibility.

### content

The content of the tooltip. It's recommended to use a basic `div` or `span` as the slotted element.
