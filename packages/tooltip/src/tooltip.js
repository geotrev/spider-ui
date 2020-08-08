import { UpgradedElement, register } from "upgraded-element"
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

  // _alignTooltip(property) {
  //   const triggerSize = this._getSize(this._activeTrigger, property)
  //   const tooltipSize = this._getSize(this._activeTooltipBox, property)
  //   const triggerIsBigger = triggerSize > tooltipSize

  //   const offset = triggerIsBigger
  //     ? (triggerSize - tooltipSize) / 2
  //     : (tooltipSize - triggerSize) / -2

  //   if (property === CssProperties.HEIGHT) {
  //     this._activeTooltipBox.style[CssProperties.TOP] = `${offset}px`
  //   } else {
  //     this._activeTooltipBox.style[CssProperties.LEFT] = `${offset}px`
  //   }
  // }

  // _getSize(element, property) {
  //   return Math.floor(element.getBoundingClientRect()[property])
  // }

  // _hasInlineClass() {
  //   const classList = this._activeTooltipBox.classList

  //   return (
  //     classList.contains(Selectors.DROP_INLINE_START_CLASS) ||
  //     classList.contains(Selectors.DROP_INLINE_END_CLASS)
  //   )
  // }

  render() {
    const positionValue = this.getAttribute("position")
    const modeValue = this.getAttribute("mode")
    const position = positionValue ? " is-" + positionValue : " is-block-start"
    const mode = modeValue ? " is-" + modeValue : " is-light"
    const isVisible = this.isVisible ? " is-visible" : ""

    return `
      <div class="tooltip${isVisible}${position}${mode}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </div>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
