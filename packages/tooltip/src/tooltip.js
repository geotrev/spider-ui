import { UpgradedElement, register } from "upgraded-element"
import { globalEventRegistry } from "@spider-ui/global-event-registry"
import { createDispatch } from "@spider-ui/dispatch"
import {
  Attributes,
  Positions,
  Modes,
  ClassNames,
  Slots,
  TIMEOUT_DELAY,
  ESCAPE_KEY,
  TOOLTIP_TYPE,
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
    const getValues = (obj) => Object.keys(obj).map((key) => obj[key])
    const showArrow = this.hasAttribute(Attributes.SHOW_ARROW)
    const positionValue = this.getAttribute(Attributes.POSITION)
    const modeValue = this.getAttribute(Attributes.MODE)
    const positionValues = getValues(Positions)
    const modesValues = getValues(Modes)

    const position = positionValues.includes(positionValue)
      ? positionValue
      : Positions.BLOCK_START
    const mode = modesValues.includes(modeValue) ? modeValue : Modes.DARK
    const arrow = showArrow ? ClassNames.ARROW : ""
    const visible = this.isVisible ? ClassNames.VISIBLE : ClassNames.HIDDEN

    return { position, mode, arrow, visible }
  }

  constructor() {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.removeTimeout = this.removeTimeout.bind(this)
  }

  elementDidMount() {
    // set nodes
    const trigger = this.querySelector(Slots.TRIGGER)
    const content = this.querySelector(Slots.CONTENT)

    // set attributes
    trigger.setAttribute(Attributes.ARIA_DESCRIBEDBY, this.elementId)
    content.id = this.elementId
    content.setAttribute(Attributes.ROLE, "tooltip")

    this.addOpenListeners()
    this.addCloseListeners()
  }

  elementWillUnmount() {
    this.handleOpen = null
    this.handleClose = null
    this.handleKeydown = null
    this.removeTimeout = null

    globalEventRegistry.unregister(this.elementId)
  }

  elementDidUpdate() {
    if (this.isVisible) {
      if (this.isInlineTooltip()) {
        this.alignTooltip("height")
      } else {
        this.alignTooltip("width")
      }

      globalEventRegistry.register({
        types: ["keydown"],
        id: this.elementId,
        handler: this.handleKeydown,
      })
    } else {
      globalEventRegistry.unregister(this.elementId)
    }
  }

  setDelay() {
    const delayOn = this.getAttribute(Attributes.DELAY_ON)
    const delayOff = this.getAttribute(Attributes.DELAY_OFF)
    const delay = this.getAttribute(Attributes.DELAY)

    this.delayOn = parseInt(delayOn || delay) || TIMEOUT_DELAY
    this.delayOff = parseInt(delayOff || delay) || TIMEOUT_DELAY
  }

  addOpenListeners() {
    this.addEventListener("focusin", this.handleOpen)
    this.addEventListener("focusin", this.handleOpen)
    this.addEventListener("mouseover", this.handleOpen)
    this.addEventListener("mouseover", this.handleOpen)
  }

  addCloseListeners() {
    this.addEventListener("focusout", this.handleClose)
    this.addEventListener("focusout", this.handleClose)
    this.addEventListener("mouseout", this.handleClose)
    this.addEventListener("mouseout", this.handleClose)
  }

  addOpenCancelListeners() {
    this.addEventListener("mouseout", this.removeTimeout)
    this.addEventListener("focusout", this.removeTimeout)
    this.addEventListener("mouseout", this.removeTimeout)
  }

  addCloseCancelListeners() {
    this.addEventListener("mouseover", this.removeTimeout)
    this.addEventListener("focusin", this.removeTimeout)
    this.addEventListener("mouseover", this.removeTimeout)
  }

  removeOpenCancelListeners() {
    this.removeEventListener("mouseout", this.removeTimeout)
    this.removeEventListener("focusout", this.removeTimeout)
    this.removeEventListener("mouseout", this.removeTimeout)
  }

  removeCloseCancelListeners() {
    this.removeEventListener("mouseover", this.removeTimeout)
    this.removeEventListener("focusin", this.removeTimeout)
    this.removeEventListener("mouseover", this.removeTimeout)
  }

  handleKeydown(event) {
    if (this.isVisible && event.key === ESCAPE_KEY) {
      this.removeTimeout()
      this.removeCloseCancelListeners()
      this.isVisible = false
      this.dispatchEvent(createDispatch(TOOLTIP_TYPE, { visible: false }))
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
    const _this = this

    this.timeout = setTimeout(() => {
      if (!_this.isConnected) return
      _this.removeOpenCancelListeners()
      _this.timeout = null
      _this.isVisible = true
      _this.dispatchEvent(createDispatch(TOOLTIP_TYPE, { visible: true }))
    }, this.delayOn)

    this.addOpenCancelListeners()
  }

  handleClose() {
    if (!this.isVisible) return
    const _this = this

    this.timeout = setTimeout(() => {
      if (!_this.isConnected) return
      _this.removeCloseCancelListeners()
      _this.timeout = null
      _this.isVisible = false
      _this.dispatchEvent(createDispatch(TOOLTIP_TYPE, { visible: false }))
    }, this.delayOff)

    this.addCloseCancelListeners()
  }

  alignTooltip(dimension) {
    const trigger = this.querySelector(Slots.TRIGGER)
    const content = this.querySelector(Slots.CONTENT)
    const triggerSize = this.getSize(trigger, dimension)
    const tooltipSize = this.getSize(content, dimension)
    const triggerIsBigger = triggerSize > tooltipSize

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2

    if (dimension === "height") {
      content.style.top = `${offset}px`
    } else {
      content.style.left = `${offset}px`
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
    const { position, mode, arrow, visible } = this.classNames
    this.setDelay()

    return `
      <div class="tooltip ${visible} ${position} ${mode} ${arrow}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </div>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
