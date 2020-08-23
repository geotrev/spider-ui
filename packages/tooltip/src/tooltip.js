import { UpgradedElement, register } from "upgraded-element"
import {
  Attributes,
  Positions,
  Modes,
  ClassNames,
  Slots,
  TIMEOUT_DELAY,
  ESCAPE_KEY,
} from "./constants"
import styles from "./styles.scss"

class SpiderTooltip extends UpgradedElement {
  static get properties() {
    return {
      isVisible: {
        type: "boolean",
        default: false,
      },
    }
  }

  static get styles() {
    return styles
  }

  get classNames() {
    const showArrow = this.hasAttribute(Attributes.SHOW_ARROW)
    const positionValue = this.getAttribute(Attributes.POSITION)
    const modeValue = this.getAttribute(Attributes.MODE)

    const position = Object.values(Positions).includes(positionValue)
      ? positionValue
      : Positions.BLOCK_START
    const mode = Object.values(Modes).includes(modeValue)
      ? modeValue
      : Modes.DARK
    const hasArrow = showArrow ? ClassNames.ARROW : ""
    const isVisible = this.isVisible ? ClassNames.VISIBLE : ClassNames.HIDDEN

    return { position, mode, hasArrow, isVisible }
  }

  constructor() {
    super()
    this.trigger = null
    this.content = null
    this.timeout = null
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.removeTimeout = this.removeTimeout.bind(this)
  }

  elementDidMount() {
    // set nodes
    this.trigger = this.querySelector(Slots.TRIGGER)
    this.content = this.querySelector(Slots.CONTENT)

    // set attributes
    this.trigger.setAttribute(Attributes.ARIA_DESCRIBEDBY, this.elementId)
    this.content.id = this.elementId
    this.content.setAttribute(Attributes.ROLE, "tooltip")

    this.addOpenListeners()
    this.addCloseListeners()
  }

  elementWillUnmount() {
    this.trigger = null
    this.content = null
    this.timeout = null
    this.handleOpen = null
    this.handleClose = null
    this.handleKeydown = null
    this.removeTimeout = null
  }

  elementDidUpdate() {
    if (this.isVisible) {
      if (this.isInlineTooltip()) {
        this.alignTooltip("height")
      } else {
        this.alignTooltip("width")
      }
    }
  }

  setDelay() {
    const delayOn = this.getAttribute(Attributes.DELAY_ON)
    const delayOff = this.getAttribute(Attributes.DELAY_OFF)
    const delay = this.getAttribute(Attributes.DELAY)

    this.delayOn = parseInt(delayOn || delay) || TIMEOUT_DELAY
    this.delayOff = parseInt(delayOff || delay) || TIMEOUT_DELAY
  }

  listen(type, target, handler) {
    target.addEventListener(type, handler)
  }

  sleep(type, target, handler) {
    target.removeEventListener(type, handler)
  }

  addOpenListeners() {
    this.listen("focus", this.trigger, this.handleOpen)
    this.listen("focus", this.content, this.handleOpen)
    this.listen("mouseover", this.trigger, this.handleOpen)
    this.listen("mouseover", this.content, this.handleOpen)
  }

  addCloseListeners() {
    this.listen("blur", this.trigger, this.handleClose)
    this.listen("blur", this.content, this.handleClose)
    this.listen("mouseout", this.trigger, this.handleClose)
    this.listen("mouseout", this.content, this.handleClose)

    // This should use globalEventRegistry
    this.listen("keydown", window, this.handleKeydown)
  }

  addOpenCancelListeners() {
    this.listen("mouseout", this.trigger, this.removeTimeout)
    this.listen("blur", this.trigger, this.removeTimeout)
    this.listen("mouseout", this.content, this.removeTimeout)
  }

  addCloseCancelListeners() {
    this.listen("mouseover", this.trigger, this.removeTimeout)
    this.listen("focus", this.trigger, this.removeTimeout)
    this.listen("mouseover", this.content, this.removeTimeout)
  }

  removeOpenCancelListeners() {
    this.sleep("mouseout", this.trigger, this.removeTimeout)
    this.sleep("blur", this.trigger, this.removeTimeout)
    this.sleep("mouseout", this.content, this.removeTimeout)
  }

  removeCloseCancelListeners() {
    this.sleep("mouseover", this.trigger, this.removeTimeout)
    this.sleep("focus", this.trigger, this.removeTimeout)
    this.sleep("mouseover", this.content, this.removeTimeout)
  }

  handleKeydown(event) {
    // This should be used by globalEventRegistry
    if (this.isVisible && event.key === ESCAPE_KEY) {
      this.removeTimeout()
      this.isVisible = false
    }
  }

  removeTimeout() {
    if (!this.isConnected) return
    if (!this.timeout) return
    clearTimeout(this.timeout)
    this.timeout = null
  }

  handleOpen() {
    if (this.isVisible) return
    const context = this

    this.timeout = setTimeout(() => {
      if (!context.isConnected) return
      this.removeOpenCancelListeners()
      this.timeout = null
      this.isVisible = true
    }, this.delayOn)

    this.addOpenCancelListeners()
  }

  handleClose() {
    if (!this.isVisible) return
    const context = this

    this.timeout = setTimeout(() => {
      if (!context.isConnected) return
      this.removeCloseCancelListeners()
      this.timeout = null
      this.isVisible = false
    }, this.delayOff)

    this.addCloseCancelListeners()
  }

  alignTooltip(dimension) {
    const triggerSize = this.getSize(this.trigger, dimension)
    const tooltipSize = this.getSize(this.content, dimension)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (dimension === "height") {
      this.content.style.top = `${offset}px`
    } else {
      this.content.style.left = `${offset}px`
    }
  }

  getSize(element, property) {
    return Math.floor(element.getBoundingClientRect()[property])
  }

  isInlineTooltip() {
    const position = this.getAttribute(Attributes.POSITION)
    return [Positions.INLINE_START, Positions.INLINE_END].includes(position)
  }

  render() {
    const { position, mode, hasArrow, isVisible } = this.classNames
    this.setDelay()

    return `
      <div class="tooltip ${isVisible} ${position} ${mode} ${hasArrow}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </div>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
