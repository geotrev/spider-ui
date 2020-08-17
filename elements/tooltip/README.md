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

NOTE: Make sure to link to `upgraded-element` before `tooltip`.

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/upgraded-element@latest/dist/bundle.js"
  integrity="sha256-y1Z1T22l5/p1GyoeuJxpVprUr9N3C9Rphdpsr/4ICsU="
  crossorigin="anonymous"
></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@spider-ui/tooltip@latest/dist/bundle.min.js"
  integrity="sha256-UVuUZIH7wM185SfSeFD83TyJuaqsCktX2HVCnSIsvy8="
  crossorigin="anonymous"
></script>
```

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
