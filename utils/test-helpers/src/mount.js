let fixtures = []

export const mount = (htmlString) => {
  const temp = document.createElement("template")
  temp.innerHTML = htmlString.trim()

  const fixture = temp.content.firstElementChild
  document.body.appendChild(fixture)
  fixtures.push(fixture)

  return fixture
}

export const unmount = () => {
  if (!fixtures.length) return

  fixtures.forEach((fixture) => document.body.removeChild(fixture))
  fixtures = []
}
