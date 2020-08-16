import { mount, unmount, queryRoot } from "@spider-ui/test-helpers"
import { Slots } from "../src/constants"
import "../src"

window.setTimeout = jest.fn().mockImplementation((fn) => fn())
window.clearTimeout = jest.fn().mockImplementation((fn) => fn())

describe("@spider-ui/tooltip", () => {
  beforeEach(jest.useFakeTimers)
  afterEach(unmount)

  describe("default configuration", () => {
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
      // Given
      const content = fixture.querySelector(Slots.CONTENT)
      // Then
      expect(content.getAttribute("role")).toBe("tooltip")
    })

    it("has matching aria-describedby/id between trigger and content", () => {
      // Given
      const trigger = fixture.querySelector(Slots.TRIGGER)
      const content = fixture.querySelector(Slots.CONTENT)
      const ariaValue = trigger.getAttribute("aria-describedby")
      // Then
      expect(ariaValue).toEqual(content.id)
    })

    it("renders default state", () => {
      const shadowContainer = queryRoot(fixture, ".tooltip")
      expect(shadowContainer).toMatchSnapshot()
    })
  })
})
