export const createMouseEvent = (type) => {
  return new MouseEvent(type, {
    bubbles: true,
    relatedTarget: window,
  })
}

export const createKeyboardEvent = (type, key, shiftKey = false) => {
  return new KeyboardEvent(type, {
    key,
    shiftKey,
    bubbles: true,
  })
}

export const pressEscape = (target) => {
  const event = createKeyboardEvent("keydown", "Escape")
  return target ? target.dispatchEvent(event) : document.dispatchEvent(event)
}

export const mouseover = (target) => {
  const event = createMouseEvent("mouseover")
  return target.dispatchEvent(event)
}

export const mouseout = (target) => {
  const event = createMouseEvent("mouseout")
  return target.dispatchEvent(event)
}
