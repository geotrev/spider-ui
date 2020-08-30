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

export const createEvent = (type) => {
  return new Event(type, { bubbles: true })
}

export const pressEscape = (target) => {
  const event = createKeyboardEvent("keydown", "Escape")
  return target ? target.dispatchEvent(event) : document.dispatchEvent(event)
}

export const mouseover = (target) => {
  return target.dispatchEvent(createMouseEvent("mouseover"))
}

export const mouseout = (target) => {
  return target.dispatchEvent(createMouseEvent("mouseout"))
}

export const focusin = (target) => {
  return target.dispatchEvent(createEvent("focusin"))
}

export const focusout = (target) => {
  return target.dispatchEvent(createEvent("focusout"))
}
