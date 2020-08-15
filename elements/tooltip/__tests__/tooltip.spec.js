import { mount, unmount, queryRoot } from "@spider-ui/test-helpers"
import "../src"

window.requestAnimationFrame = jest.fn().mockImplementation((fn) => fn())
window.cancelAnimationFrame = jest.fn().mockImplementation((fn) => fn())

describe("@spider-ui/tooltip", () => {
  beforeEach(jest.useFakeTimers)
  afterEach(unmount)

  it("renders content slot as tooltip", () => {
    const fixture = mount(`
      <spider-tooltip>
        <button slot="trigger">Open</button>
        <div slot="content">Test content</div>
      </spider-tooltip>
    `)

    const content = document.querySelector("[slot='content']")
    expect(content.getAttribute("role")).toBe("tooltip")
  })
})
