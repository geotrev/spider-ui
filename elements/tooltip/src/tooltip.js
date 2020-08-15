import { UpgradedElement, register } from "upgraded-element"
import styles from "./styles.scss"

const Attributes = {
  POSITION: "position",
  MODE: "mode",
  SHOW_ARROW: "show-arrow",
}

const Positions = {
  BLOCK_START: "block-start",
  BLOCK_END: "block-end",
  INLINE_START: "inline-start",
  INLINE_END: "inline-end",
}

const Modes = {
  DARK: "dark",
  LIGHT: "light",
}

const ClassNames = {
  ARROW: "arrow",
  VISIBLE: "visible",
  HIDDEN: "hidden",
}

const TIMEOUT_DELAY = 300

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
    this.trigger = this.querySelector("[slot='trigger']")
    this.content = this.querySelector("[slot='content']")

    // set attributes
    this.trigger.setAttribute("aria-describedby", this.elementId)
    this.content.id = this.elementId
    this.content.setAttribute("role", "tooltip")

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

  handleKeydown(event) {
    if (this.isVisible && event.key === "Escape") {
      this.removeTimeout()
      this.isVisible = false
    }
  }

  removeTimeout() {
    if (this.timeout) clearTimeout(this.timeout)
  }

  handleOpen() {
    if (this.isVisible) return

    this.timeout = setTimeout(() => {
      this.removeOpenCancelListeners()
      this.timeout = null
      this.isVisible = true
    }, TIMEOUT_DELAY)

    this.addOpenCancelListeners()
  }

  handleClose() {
    if (!this.isVisible) return

    this.timeout = setTimeout(() => {
      this.removeCloseCancelListeners()
      this.timeout = null
      this.isVisible = false
    }, TIMEOUT_DELAY)

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

    return `
      <div class="tooltip ${isVisible} ${position} ${mode} ${hasArrow}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </div>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
