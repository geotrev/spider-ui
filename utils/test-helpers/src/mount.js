import { stubElementId } from "./stub-element-id"

let fixture = null

export const mount = (htmlString) => {
  const body = document.querySelector("body")
  body.innerHTML = htmlString
  fixture = body.querySelector(":scope > *")
  stubElementId(fixture)
  return fixture
}

export const unmount = () => {
  if (!fixture) return

  const body = document.querySelector("body")
  body.removeChild(fixture)
  fixture = null
}
