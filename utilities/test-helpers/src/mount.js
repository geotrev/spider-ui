let fixtures = []

export const mountStringifiedHTML = (htmlString) => {
  const temp = document.createElement("template")
  temp.innerHTML = htmlString.trim()

  const fixture = temp.content.firstElementChild
  fixture.dispatchEvent = jest.fn()
  document.body.appendChild(fixture)
  fixtures.push(fixture)

  return fixture
}

export const unmount = () => {
  if (!fixtures.length) return

  fixtures.forEach((fixture) => document.body.removeChild(fixture))
  fixtures = []
}

export const mountFixture = (tag = "div", slotted = "", config = {}) => {
  let stringifiedConfig = ""
  const attributes = Object.keys(config)

  if (attributes.length) {
    stringifiedConfig = attributes.reduce((options, attribute) => {
      const value = config[attribute]
      const stringifiedValue = typeof value === "undefined" ? "" : `="${value}"`
      return (options += ` ${attribute}${stringifiedValue}`)
    }, "")
  }

  return mountStringifiedHTML(`
    <${tag}${stringifiedConfig}>
      ${slotted}
    </${tag}>
  `)
}
