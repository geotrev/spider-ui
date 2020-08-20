import { mount, unmount, queryRoot, events } from "@spider-ui/test-helpers"
import { Slots, TIMEOUT_DELAY } from "../src/constants"
import "../src"

window.setTimeout = jest.fn().mockImplementation((fn) => fn())
window.clearTimeout = jest.fn().mockImplementation((fn) => fn())

const mountFixture = (tag = "div", slotted = "", config = {}) => {
  let stringifiedConfig = ""
  const attributes = Object.keys(config)

  if (attributes.length) {
    stringifiedConfig = attributes.reduce((options, attribute) => {
      const value = config[attribute]
      const stringifiedValue = typeof value === "undefined" ? "" : `="${value}"`
      return (options += ` ${attribute}${stringifiedValue}`)
    }, "")
  }

  return mount(`
    <${tag}${stringifiedConfig}>
      ${slotted}
    </${tag}>
  `)
}

const tagName = "spider-tooltip"
const basicSlots = `
  <button slot="trigger">Open</button>
  <div slot="content">Test content</div>
`

describe("@spider-ui/tooltip", () => {
  beforeEach(jest.useFakeTimers)
  afterEach(unmount)

  describe("default configuration", () => {
    let fixture
    beforeEach(() => (fixture = mountFixture(tagName, basicSlots)))

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
      const root = queryRoot(fixture, ".tooltip")
      expect(root).toMatchSnapshot()
    })
  })

  describe("configurations", () => {
    const positions = ["block-end", "inline-start", "inline-end"]

    positions.forEach((position) => {
      it(`renders ${position} position`, () => {
        const fixture = mountFixture(tagName, basicSlots, { position })
        const root = queryRoot(fixture, ".tooltip")
        expect(root.classList.contains(position)).toBe(true)
      })
    })

    it("renders in light mode", () => {
      const fixture = mountFixture(tagName, basicSlots, { mode: "light" })
      const root = queryRoot(fixture, ".tooltip")
      expect(root.classList.contains("light")).toBe(true)
    })

    describe("show-arrow", () => {
      const fixture = mountFixture(tagName, basicSlots, {
        "show-arrow": undefined,
      })
      const root = queryRoot(fixture, ".tooltip")
      expect(root.classList.contains("arrow")).toBe(true)
    })
  })

  describe("handleOpen (mouseover/blur)", () => {
    let fixture, trigger, root

    beforeEach(() => {
      fixture = mountFixture(tagName, basicSlots)
      trigger = fixture.querySelector(Slots.TRIGGER)
      root = queryRoot(fixture, ".tooltip")
    })

    it("shows tooltip content on mouseover", () => {
      events.mouseover(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains("visible")).toBe(true)
    })
  })
})
