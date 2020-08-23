# `<spider-tooltip></spider-tooltip>`

A tooltip web component.

## Usage

`@spider-ui/tooltip` requires minimal set up with either npm or the distribution code.

### npm

Install the package and its peer dependency:

```sh
$ npm i @spider-ui/tooltip upgraded-element
```

Then import the element in your JavaScript:

```js
import "@spider-ui/tooltip"
```

Then use it:

```html
<spider-tooltip>
  <button slot="trigger">Learn More</button>
  <div slot="content">You've already learned too much.</div>
</spider-tooltip>
```

### Bundle

If you don't want to use npm, you can grab the source from jsdelivr CDN.

```html
<!-- Use the unminified bundle in development -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@0.2.1/dist/tooltip.js"
  integrity="sha256-808dLgCMN6W2nAlGIHvQsRl3te9/a5n5zIy/ocK7tiE="
  crossorigin="anonymous"
></script>

<!-- Or use the minified/uglified bundle in production -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@0.2.1/dist/tooltip.min.js"
  integrity="sha256-YWEyl1icf2rpBrsaRUhd6y+A6UJU2cNx/oLSmrfwTts="
  crossorigin="anonymous"
></script>
```

_NOTE: Make sure to include a script link to [`upgraded-element`]() before `spider-tooltip`!_

Then you're good to go!

### Visibility Check

Because slotted elements aren't hidden in the DOM on first render, you may see a flash of unstyled content when using this component. You can work around this by adding the following to your app's stylesheet:

```css
spider-tooltip:not(:defined) {
  display: none;
}
```

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

> Configures the base visual theme of the tooltip.<br/><br/>Default: `"dark"`.<br/><br/>Accepted Values: `"dark"` | `"light"`.

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

> Configures both the delay-on and delay-off delay durations of the tooltip. Use `delay-on` and `delay-off` to override the show and hide delay durations, respectively.<br/><br/>Default: `"300"`.

```html
<spider-tooltip delay="500">...</spider-tooltip>
```

## Slots

### trigger

The trigger element for the tooltip. This can be any element, but it's recommended to be a focusable element (e.g., a `button`) for better accessibility.

### content

The content of the tooltip. It's recommended to use a basic `div` or `span` as the slotted element.

## Contribute

[Learn how to contribute.](https://github.com/geotrev/spider-ui/blob/master/README.md#contribute)
