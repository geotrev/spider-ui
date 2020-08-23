const initContext = Symbol("#initContext")
const forEachReverse = Symbol("#forEachReverse")
const contextExists = Symbol("#contextExists")
const eventsReducer = Symbol("#eventsReducer")
const isValidContext = Symbol("#isValidContext")
const handleEvent = Symbol("#handleEvent")

/**
 * This utility is an event bus to track
 */
class GlobalEventRegistry {
  constructor() {
    this[initContext]()
    this[handleEvent] = this[handleEvent].bind(this)
  }

  // public

  register(context = {}) {
    if (!this[isValidContext](context)) return
    this[eventsReducer]("register", context.events)
    this.context.push(context)
  }

  unregister(targetId) {
    if (!this.context.length) return
    if (typeof targetId !== "string") return

    const activeContext = this.context[this.context.length - 1]

    if (activeContext.id === targetId) {
      const context = this.context.pop()
      this[eventsReducer]("unregister", context.events)
    } else {
      this[forEachReverse](this.context, (context, index) => {
        if (context.id === targetId) {
          this.context.splice(index, 1)
          this[eventsReducer]("unregister", context.events)
          return false
        }
      })
    }
  }

  get context() {
    return window.__GLOBAL_EVENT_REGISTRY__
  }

  get registry() {
    return window.__GLOBAL_EVENT_REGISTRY__.registry
  }

  // private

  [initContext]() {
    if (typeof this.context === "undefined") return

    const context = []
    const registry = {}
    context.registry = registry

    // Add it to the window. This will ensure duplicates
    // never create multiple stores.
    Object.defineProperty(window, "__GLOBAL_EVENT_REGISTRY__", {
      value: context,
    })
  }

  [forEachReverse](array, callback) {
    if (!Array.isArray(array) || !array.length) return
    for (let index = array.length - 1; index >= 0; index--) {
      const result = callback(array[index], index)
      if (result === true) break
    }
  }

  [contextExists](id) {
    let exists = false

    this[forEachReverse](this.context, (context) => {
      if (context.id !== id) return
      return true
    })

    return exists
  }

  [eventsReducer](type, events) {
    switch (type) {
      case "register": {
        events.forEach((eventType) => {
          const eventCount = this.registry[eventType]
          if (!eventCount) {
            window.addEventListener(eventType, this[handleEvent], true)
            this.registry[eventType] = 1
          } else {
            this.registry[eventType] = eventCount + 1
          }
        })
        break
      }
      case "unregister": {
        events.forEach((eventType) => {
          const eventCount = this.registry[eventType]
          if (eventCount === 1) {
            delete this.registry[eventType]
            window.removeEventListener(eventType, this[handleEvent], true)
          } else {
            this.registry[eventType] = eventCount - 1
          }
        })
        break
      }
      default: {
        break
      }
    }
  }

  [isValidContext](context) {
    return (
      Object.keys(context).length &&
      Array.isArray(context.events) &&
      context.events.length &&
      typeof context.callback === "function" &&
      typeof context.id === "string" &&
      !this[contextExists](context.id)
    )
  }

  [handleEvent](event) {
    if (!this.context.length || !this.registry) return
    const activeContext = this.context[this.context.length - 1]

    if (activeContext.events.includes(event.type)) {
      activeContext.callback(event)
    }
  }
}

const globalEventRegistry = new GlobalEventRegistry()

export { globalEventRegistry }
