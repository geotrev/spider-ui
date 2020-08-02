import { UpgradedElement, register } from "upgraded-element"
import style from "./tooltip"

/**
 * <spider-tooltip position"(inline-start|inline-end|block-start|block-end)">
 *  <button slot="trigger">Try me!</button>
 *  <div slot="content">I'm a little tooltip, short and stout.</div>
 * </spider-tooltip>
 */

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
    return style
  }

  constructor() {
    super()
    this.rootNode = null
    this.trigger = null
    this.content = null
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
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

    // if initialized as visible, show tooltip
    if (this.getAttribute("is-visible") === "true") {
      this.handleShow()
    }
  }

  elementDidUpdate() {
    if (this.isVisible) {
      this.trigger.removeEventListener("focus", this.handleShow)
      this.trigger.removeEventListener("mouseover", this.handleShow)
      this.trigger.addEventListener("blur", this.handleHide)
      this.trigger.addEventListener("mouseout", this.handleHide)
      this.trigger.addEventListener("keydown", this.handleKeydown)
    } else {
      this.trigger.removeEventListener("blur", this.handleHide)
      this.trigger.removeEventListener("mouseout", this.handleHide)
      this.trigger.addEventListener("focus", this.handleShow)
      this.trigger.addEventListener("mouseover", this.handleShow)
      this.trigger.removeEventListener("keydown", this.handleKeydown)
    }
  }

  elementWillUnmount() {
    this.rootNode = null
    this.trigger = null
    this.content = null

    if (this.isVisible) {
      this.trigger.removeEventListener("blur", this.handleHide)
      this.trigger.removeEventListener("mouseout", this.handleHide)
    } else {
      this.trigger.removeEventListener("focus", this.handleShow)
      this.trigger.removeEventListener("mouseover", this.handleShow)
    }
  }

  handleKeydown(event) {
    if (this.isVisible && event.key === "Escape") {
      this.handleHide()
    }
  }

  handleShow() {
    this.isVisible = true
  }

  handleHide() {
    this.isVisible = false
  }

  render() {
    const position = this.getAttribute("position") || "block-start"
    const isVisible = this.isVisible ? "is-visible" : ""
    return `
      <span class="tooltip ${isVisible} ${position}">
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      </span>
    `
  }
}

register("spider-tooltip", SpiderTooltip)
