import { UpgradedElement, register } from "upgraded-element"
import styles from "./styles.scss"

const Attributes = {
  POSITION: "position",
  MODE: "mode",
  HIDE_ARROW: "hide-arrow",
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
    const arrowIsHidden = this.hasAttribute(Attributes.HIDE_ARROW)
    const positionValue = this.getAttribute(Attributes.POSITION)
    const modeValue = this.getAttribute(Attributes.MODE)

    const position = Object.values(Positions).includes(positionValue)
      ? positionValue
      : Positions.BLOCK_START
    const mode = Object.values(Modes).includes(modeValue)
      ? modeValue
      : Modes.DARK
    const hasArrow = arrowIsHidden ? "" : ClassNames.ARROW
    const isVisible = this.isVisible ? ClassNames.VISIBLE : ClassNames.HIDDEN

    return { position, mode, hasArrow, isVisible }
  }

  constructor() {
    super()
    this.trigger = null
    this.content = null
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  elementDidMount() {
    // set nodes
    this.trigger = this.querySelector("[slot='trigger']")
    this.content = this.querySelector("[slot='content']")

    // set attributes
    this.trigger.setAttribute("aria-describedby", this.elementId)
    this.content.id = this.elementId
    this.content.setAttribute("role", "tooltip")

    this.setOpenListeners()
  }

  elementWillUnmount() {
    this.trigger = null
    this.content = null

    if (this.isVisible) {
      this.removeCloseListeners()
    } else {
      this.removeOpenListeners()
    }
  }

  elementDidUpdate() {
    if (this.isVisible) {
      if (this.isInlineTooltip()) {
        this.alignTooltip("height")
      } else {
        this.alignTooltip("width")
      }

      this.setCloseListeners()
      this.removeOpenListeners()
    } else {
      this.setOpenListeners()
      this.removeCloseListeners()
    }
  }

  setOpenListeners() {
    this.trigger.addEventListener("focus", this.handleOpen)
    this.trigger.addEventListener("mouseover", this.handleOpen)
  }

  removeCloseListeners() {
    this.trigger.removeEventListener("blur", this.handleClose)
    this.trigger.removeEventListener("mouseout", this.handleClose)
    this.trigger.removeEventListener("keydown", this.handleKeydown)
  }

  setCloseListeners() {
    this.trigger.addEventListener("blur", this.handleClose)
    this.trigger.addEventListener("mouseout", this.handleClose)
    this.trigger.addEventListener("keydown", this.handleKeydown)
  }

  removeOpenListeners() {
    this.trigger.removeEventListener("focus", this.handleOpen)
    this.trigger.removeEventListener("mouseover", this.handleOpen)
  }

  handleKeydown(event) {
    if (this.isVisible && event.key === "Escape") {
      this.handleClose()
    }
  }

  handleOpen() {
    this.isVisible = true
  }

  handleClose() {
    this.isVisible = false
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
