let fixture = null

export const mount = (htmlString) => {
  document.body.innerHTML = htmlString
  fixture = document.body.firstChild
  return fixture
}

export const unmount = () => {
  if (!fixture) return
  document.body.removeChild(fixture)
  fixture = null
}
