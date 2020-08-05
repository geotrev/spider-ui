import { UpgradedElement, register } from "upgraded-element"
import baseStyles from "@spider-ui/sass/index.scss"
import styles from "./styles.scss"

class SpiderTooltip extends UpgradedElement {
  get properties() {
    return {
      isVisible: {
        type: "boolean",
        default: false,
      },
    }
  }

  get styles() {
    return `${baseStyles}${styles}`
  }

  constructor() {
    super()
    this.rootNode = null
    this.trigger = null
    this.content = null
    this.setVisible = this.setVisible.bind(this)
    this.setHidden = this.setHidden.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  elementDidMount() {
    // set nodes
    this.rootNode = this.shadowRoot.querySelector(".tooltip")
    this.trigger = this.querySelector("[slot='trigger']")
    this.content = this.querySelector("[slot='content']")

    // set attributes
    this.trigger.setAttribute("aria-describedby", this.elementId)
    this.content.id = this.elementId
    this.content.setAttribute("role", "tooltip")

    this.setOpenListeners()
  }

  elementDidUpdate() {
    if (this.isVisible) {
      this.setCloseListeners()
    } else {
      this.setOpenListeners()
    }
  }

  elementWillUnmount() {
    this.rootNode = null
    this.trigger = null
    this.content = null

    if (this.isVisible) {
      this.trigger.removeEventListener("blur", this.setHidden)
      this.trigger.removeEventListener("mouseout", this.setHidden)
    } else {
      this.trigger.removeEventListener("focus", this.setVisible)
      this.trigger.removeEventListener("mouseover", this.setVisible)
    }
  }

  setOpenListeners() {
    this.trigger.removeEventListener("blur", this.setHidden)
    this.trigger.removeEventListener("mouseout", this.setHidden)
    this.trigger.addEventListener("focus", this.setVisible)
    this.trigger.addEventListener("mouseover", this.setVisible)
    this.trigger.removeEventListener("keydown", this.handleKeydown)
  }

  setCloseListeners() {
    this.trigger.removeEventListener("focus", this.setVisible)
    this.trigger.removeEventListener("mouseover", this.setVisible)
    this.trigger.addEventListener("blur", this.setHidden)
    this.trigger.addEventListener("mouseout", this.setHidden)
    this.trigger.addEventListener("keydown", this.handleKeydown)
  }

  handleKeydown(event) {
    if (this.isVisible && event.key === "Escape") {
      this.setHidden()
    }
  }

  setVisible() {
    this.isVisible = true
  }

  setHidden() {
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
