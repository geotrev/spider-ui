# `@spider-ui/tooltip`

A simple tooltip component.

TODO:

- [x] Add mouseover/mouseout delay to tooltip content.
- [ ] Add custom stylesheet support.
- [ ] Tests, tests, tests

## Usage

`@spider-ui/tooltip` requires minimal set up.

Import the element in your JavaScript:

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

## Attributes

### `position`

> Configures from which side of the trigger to show the tooltip.<br/><br/>Default: `'block-start'`<br/><br/>Accepted Values: `'block-start'` | `'block-end'` | `'inline-start'` | `'inline-end'`

```html
<spider-tooltip position="inline-end">...</spider-tooltip>
```

### `hide-arrow`

> Configures the tooltip to hide its arrow pointing to the trigger.<br/><br/>Default: `null`.

```html
<spider-tooltip hide-arrow>...</spider-tooltip>
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

## Support

It's recommended to use Spider UI web components in a modern browser stack matrix. Out of the box, IE 11 is not supported.

There will likely be a polyfilled version in the future.

`@spider-ui/tooltip` relies on these JavaScript features:

- Symbols
- Custom Elements
- Shadow DOM

## Contribute

[Learn how to contribute.](https://github.com/geotrev/spider-ui/blob/master/README.md#contribute)
