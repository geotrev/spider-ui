# `@spider-ui/tooltip`

Create an accessible tooltip on an any element. The tooltip will show on focus or hover.

- [Usage](#usage)
- [Install](#install)
  - [NPM](#npm)
  - [CDN/Bundle](#cdn-bundle)
- [Controlling Visibility](#controlling-visibility)
- [Attributes](#attributes)
- [Slots](#slots)

## Usage

To use the element, use the `spider-tooltip` tag, and pass in your slotted elements:

```html
<spider-tooltip>
  <button slot="trigger">Learn More</button>
  <div slot="content">You've already learned too much.</div>
</spider-tooltip>
```

## Install

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

### Bundle

If you don't want to use npm, you can grab the source from jsdelivr CDN.

```html
<!-- Use the unminified bundle in development -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@0.2.3-alpha.1/dist/tooltip.js"
  integrity="sha256-il6/mxP324x6eRKZil0InGGHo8RhXh6kw+eI34BuzyE="
  crossorigin="anonymous"
></script>

<!-- Or use the minified/uglified bundle in production -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@0.2.3-alpha.1/dist/tooltip.min.js"
  integrity="sha256-yVU62ENv3lzAydDJ+b0l9ER+iNzCfQbSkk/HvqfPNfI="
  crossorigin="anonymous"
></script>
```

_NOTE: Make sure to include a script link to [`upgraded-element`]() before `spider-tooltip`!_

Then you're good to go!

## Controlling Visibility

Because slotted elements aren't hidden in the DOM on first render, you may see your tooltip's unstyled content on page load. You can fix around this by adding the following to your app's stylesheet:

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
