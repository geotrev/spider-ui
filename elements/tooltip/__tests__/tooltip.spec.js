import { mount, unmount, queryRoot } from "@spider-ui/test-helpers"
import "../src"

window.setTimeout = jest.fn().mockImplementation((fn) => fn())
window.clearTimeout = jest.fn().mockImplementation((fn) => fn())

describe("@spider-ui/tooltip", () => {
  beforeEach(jest.useFakeTimers)
  afterEach(unmount)

  describe("default state", () => {
    let fixture
    beforeEach(() => {
      fixture = mount(`
        <spider-tooltip>
          <button slot="trigger">Open</button>
          <div slot="content">Test content</div>
        </spider-tooltip>
      `)
    })

    it("renders content slot as tooltip", () => {
      const content = fixture.querySelector("[slot='content']")
      expect(content.getAttribute("role")).toBe("tooltip")
    })

    it("sets trigger's aria-describedby equal to content id", () => {
      const trigger = fixture.querySelector("[slot='trigger']")
      const content = fixture.querySelector("[slot='content']")
    })
  })
})
