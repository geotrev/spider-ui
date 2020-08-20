export const createMouseEvent = (name) => {
  return new MouseEvent(name, {
    bubbles: true,
    relatedTarget: window,
  })
}

export const mouseover = (target) => {
  const event = createMouseEvent("mouseover")
  return target.dispatchEvent(event)
}

export const mouseout = (target) => {
  const event = createMouseEvent("mouseout")
  return target.dispatchEvent(event)
}
