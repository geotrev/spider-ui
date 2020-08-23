import {
  mountFixture,
  unmount,
  queryRoot,
  events,
} from "@spider-ui/test-helpers"
import {
  Slots,
  Attributes,
  Positions,
  ClassNames,
  TIMEOUT_DELAY,
  Modes,
} from "../src/constants"
import "../src"

const tagName = "spider-tooltip"
const slotContent = `
  <button slot="trigger">Open</button>
  <div slot="content">Test content</div>
`

describe("@spider-ui/tooltip", () => {
  beforeEach(jest.useFakeTimers)
  afterEach(unmount)

  describe("default configuration", () => {
    let fixture
    beforeEach(() => (fixture = mountFixture(tagName, slotContent)))

    it("renders content slot as tooltip", () => {
      // Given
      const content = fixture.querySelector(Slots.CONTENT)
      // Then
      expect(content.getAttribute(Attributes.ROLE)).toBe("tooltip")
    })

    it("has matching aria-describedby/id between trigger and content", () => {
      // Given
      const trigger = fixture.querySelector(Slots.TRIGGER)
      const content = fixture.querySelector(Slots.CONTENT)
      const ariaValue = trigger.getAttribute(Attributes.ARIA_DESCRIBEDBY)
      // Then
      expect(ariaValue).toEqual(content.id)
    })

    it("renders default state", () => {
      // Given
      const root = queryRoot(fixture, ".tooltip")
      // Then
      expect(root).toMatchSnapshot()
    })
  })

  describe("configurations", () => {
    afterEach(unmount)

    const positions = [
      Positions.BLOCK_END,
      Positions.INLINE_START,
      Positions.INLINE_END,
    ]

    positions.forEach((position) => {
      it(`renders ${position} position`, () => {
        const fixture = mountFixture(tagName, slotContent, { position })
        const root = queryRoot(fixture, ".tooltip")
        expect(root.classList.contains(position)).toBe(true)
      })
    })

    it("renders in light mode", () => {
      const fixture = mountFixture(tagName, slotContent, { mode: Modes.LIGHT })
      const root = queryRoot(fixture, ".tooltip")
      expect(root.classList.contains(Modes.LIGHT)).toBe(true)
    })

    describe("show-arrow", () => {
      const fixture = mountFixture(tagName, slotContent, {
        "show-arrow": undefined,
      })
      const root = queryRoot(fixture, ".tooltip")
      expect(root.classList.contains(ClassNames.ARROW)).toBe(true)
    })
  })

  describe("keyboard", () => {
    afterEach(unmount)

    it("closes on escape", () => {
      const fixture = mountFixture(tagName, slotContent)
      const trigger = fixture.querySelector(Slots.TRIGGER)
      const root = queryRoot(fixture, ".tooltip")
      events.mouseover(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      events.pressEscape()
      expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
    })
  })

  describe("show/hide: trigger interaction", () => {
    afterEach(unmount)
    let fixture, trigger, root

    beforeEach(() => {
      fixture = mountFixture(tagName, slotContent)
      trigger = fixture.querySelector(Slots.TRIGGER)
      root = queryRoot(fixture, ".tooltip")
      events.mouseover(trigger)
    })

    it("shows a tooltip content on trigger mouseover", () => {
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })

    it("cancels showing a tooltip if trigger unhovered", () => {
      events.mouseout(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
    })

    it("hides a visible tooltip on trigger mouseout", () => {
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      events.mouseout(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
    })

    it("cancels hiding a tooltip if trigger rehovered", () => {
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      events.mouseout(trigger)
      events.mouseover(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })
  })

  describe("show/hide: content interaction", () => {
    afterEach(unmount)
    let fixture, trigger, content, root

    beforeEach(() => {
      fixture = mountFixture(tagName, slotContent)
      trigger = fixture.querySelector(Slots.TRIGGER)
      content = fixture.querySelector(Slots.CONTENT)
      root = queryRoot(fixture, ".tooltip")
      events.mouseover(trigger)
    })

    it("keeps tooltip visible on content mouseover", () => {
      events.mouseout(trigger)
      events.mouseover(content)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })

    it("cancels hiding a tooltip if content rehovered", () => {
      events.mouseout(trigger)
      events.mouseover(content)
      events.mouseout(content)
      events.mouseover(content)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })
  })

  describe("show/hide delay", () => {
    afterEach(unmount)

    const DELAY = 200
    const DELAY_ON = 100
    const DELAY_OFF = 50

    describe("[delay]", () => {
      let fixture, root, trigger

      beforeEach(() => {
        fixture = mountFixture(tagName, slotContent, {
          [Attributes.DELAY]: String(DELAY),
        })
        root = queryRoot(fixture, ".tooltip")
        trigger = fixture.querySelector(Slots.TRIGGER)
        events.mouseover(trigger)
        jest.advanceTimersByTime(DELAY)
      })

      it(`shows with custom delay: ${DELAY}ms`, () => {
        expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
      })

      it(`hides with custom delay: ${DELAY}ms`, () => {
        events.mouseout(trigger)
        jest.advanceTimersByTime(DELAY)
        expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
      })
    })

    it(`shows with custom delay-on: ${DELAY_ON}ms`, () => {
      const fixture = mountFixture(tagName, slotContent, {
        [Attributes.DELAY]: String(DELAY),
        [Attributes.DELAY_ON]: String(DELAY_ON),
      })
      const root = queryRoot(fixture, ".tooltip")
      const trigger = fixture.querySelector(Slots.TRIGGER)
      events.mouseover(trigger)
      jest.advanceTimersByTime(DELAY_ON)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })

    it(`hides with custom delay-off: ${DELAY_OFF}ms`, () => {
      const fixture = mountFixture(tagName, slotContent, {
        [Attributes.DELAY]: String(DELAY),
        [Attributes.DELAY_OFF]: String(DELAY_OFF),
      })
      const root = queryRoot(fixture, ".tooltip")
      const trigger = fixture.querySelector(Slots.TRIGGER)
      events.mouseover(trigger)
      jest.advanceTimersByTime(DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
      events.mouseout(trigger)
      jest.advanceTimersByTime(DELAY_OFF)
      expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
    })

    it("falls back to default delay-on if not given", () => {
      const fixture = mountFixture(tagName, slotContent, {
        [Attributes.DELAY_OFF]: String(DELAY_OFF),
      })
      const root = queryRoot(fixture, ".tooltip")
      const trigger = fixture.querySelector(Slots.TRIGGER)
      events.mouseover(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
    })

    it("falls back to default delay-off if not given", () => {
      const fixture = mountFixture(tagName, slotContent, {
        [Attributes.DELAY_ON]: String(DELAY_ON),
      })
      const root = queryRoot(fixture, ".tooltip")
      const trigger = fixture.querySelector(Slots.TRIGGER)
      events.mouseover(trigger)
      jest.advanceTimersByTime(DELAY_ON)
      expect(root.classList.contains(ClassNames.VISIBLE)).toBe(true)
      events.mouseout(trigger)
      jest.advanceTimersByTime(TIMEOUT_DELAY)
      expect(root.classList.contains(ClassNames.HIDDEN)).toBe(true)
    })
  })
})
