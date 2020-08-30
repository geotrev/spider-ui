import { UpgradedElement, register } from "upgraded-element"
import { ClassNames } from "./constants"

class SpiderModal extends UpgradedElement {
  render() {
    const visible = this.isVisible ? ClassNames.visible : ""

    return `
      <slot name="trigger"></slot>
      <div class='modal ${visible}'>
        <slot name="dialog"></slot>
      </div>
    `
  }
}

register("spider-modal", SpiderModal)
