import { UpgradedElement, register } from "upgraded-element"
import baseStyles from "@spider-ui/sass/index.scss"
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
    return `${baseStyles}${styles}`
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

  render() {
    const positionValue = this.getAttribute("position")
    const position = positionValue ? " " + positionValue : " block-start"
    const isVisible = this.isVisible ? " is-visible" : ""

    return `
      <div class="tooltip${isVisible}${position}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </div>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
