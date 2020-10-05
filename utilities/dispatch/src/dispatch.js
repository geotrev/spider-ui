export const createDispatch = (type = "event", detail) => {
  return new CustomEvent(`spider:${type}`, {
    detail,
    bubbles: true,
    composed: true,
  })
}
