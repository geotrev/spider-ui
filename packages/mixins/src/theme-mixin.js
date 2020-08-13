import { sanitize } from "@spider-ui/utilities"

export const ThemeMixin = (Base) => {
  return class extends Base {
    constructor() {
      super()
    }

    renderTheme() {
      const theme = this.getAttribute("theme")

      if (typeof theme === "string") {
        return `<style>${sanitize(theme)}</style>`
      }

      return ""
    }
  }
}
