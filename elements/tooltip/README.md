# `@spider-ui/tooltip`

A tooltip web component.

TODO:

- [ ] Tests, tests, tests
- [ ] Localization (CSS direction)
- [ ] Create non-npm demo + release pipeline

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
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@latest/dist/tooltip.js"
  integrity="sha256-z8imUy7z/lW0MfWtZvRFGWKbaJViIM+9iqic8RNPXSI="
  crossorigin="anonymous"
></script>

<!-- Or use the minified/uglified bundle in production -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@latest/dist/tooltip.min.js"
  integrity="sha256-3gjMkh3ozFWVa5h8wTEKc5EHLwValIe/ltdu6PsSEkI="
  crossorigin="anonymous"
></script>
```

_NOTE: Make sure to include a script link to [`upgraded-element`]() before `tooltip`!_

Then you're good to go!

## Attributes

### `position`

> Configures which side of the trigger to show the tooltip.<br/><br/>Default: `'block-start'`<br/><br/>Accepted Values: `'block-start'` | `'block-end'` | `'inline-start'` | `'inline-end'`

```html
<spider-tooltip position="inline-end">...</spider-tooltip>
```

### `show-arrow`

> Configures the tooltip to show an arrow pointing to the trigger.<br/><br/>Default: `false`.

```html
<spider-tooltip show-arrow>...</spider-tooltip>
```

### `mode`

> Configures the visual theme of the tooltip.<br/><br/>Default: `'dark'`.<br/><br/>Accepted Values: `'dark'` | `'light'`.

```html
<spider-tooltip mode="light">...</spider-tooltip>
```

## Slots

### trigger

The trigger element for the tooltip. This can be any element, but it's recommended to use a focusable element (e.g., a `button`) for better accessibility.

### content

The content of the tooltip. It's recommended to use a basic `div` or `span` as the slotted element.

## Contribute

[Learn how to contribute.](https://github.com/geotrev/spider-ui/blob/master/README.md#contribute)
