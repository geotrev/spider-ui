const init = Symbol("#init")
const findReverse = Symbol("#findReverse")
const entryExists = Symbol("#entryExists")
const typesReducer = Symbol("#typesReducer")
const isValidEntry = Symbol("#isValidEntry")
const handleEvent = Symbol("#handleEvent")
const STATE_KEY = "__SPIDER_UI_GLOBAL_EVENT_REGISTRY__"

/**
 * This utility is an event bus to track
 */
class GlobalEventRegistry {
  constructor() {
    this[init]()
    this[handleEvent] = this[handleEvent].bind(this)
  }

  // public

  register(entryConfig = {}) {
    if (!this[isValidEntry](entryConfig)) return
    this[typesReducer]("register", entryConfig.types)
    this.entries.push(entryConfig)
  }

  unregister(targetId) {
    if (!this.entries.length) return
    if (typeof targetId !== "string") return

    const activeEntry = this.entries[this.entries.length - 1]

    if (activeEntry.id === targetId) {
      const entry = this.entries.pop()
      this[typesReducer]("unregister", entry.types)
    } else {
      this[findReverse](this.entries, (entry, index) => {
        if (entry.id === targetId) {
          this.entries.splice(index, 1)
          this[typesReducer]("unregister", entry.types)
          return true
        }
      })
    }
  }

  get entries() {
    return window[STATE_KEY]
  }

  get types() {
    return window[STATE_KEY].types
  }

  // private

  [init]() {
    if (STATE_KEY in window) return

    const value = []
    const types = {}
    value.types = types

    // Add it to the window. This will ensure duplicates
    // never create multiple stores.
    Object.defineProperty(window, STATE_KEY, { value })
  }

  [findReverse](array, callback) {
    if (!Array.isArray(array) || !array.length) return
    for (let i = array.length - 1; i >= 0; i--) {
      const result = callback(array[i], i)
      if (result === true) break
    }
  }

  [entryExists](id) {
    let exists = false

    this[findReverse](this.entries, (entry) => {
      if (entry.id !== id) return
      exists = true
      return exists
    })

    return exists
  }

  [typesReducer](reducerType, eventTypes) {
    switch (reducerType) {
      case "register": {
        eventTypes.forEach((type) => {
          const eventCount = this.types[type]
          if (!eventCount) {
            window.addEventListener(type, this[handleEvent], true)
            this.types[type] = 1
          } else {
            this.types[type] = eventCount + 1
          }
        })
        break
      }
      case "unregister": {
        eventTypes.forEach((type) => {
          const eventCount = this.types[type]
          if (eventCount === 1) {
            delete this.types[type]
            window.removeEventListener(type, this[handleEvent], true)
          } else {
            this.types[type] = eventCount - 1
          }
        })
        break
      }
      default: {
        break
      }
    }
  }

  [isValidEntry](entry) {
    return (
      Object.keys(entry).length &&
      Array.isArray(entry.types) &&
      entry.types.length &&
      typeof entry.handler === "function" &&
      typeof entry.id === "string" &&
      !this[entryExists](entry.id)
    )
  }

  [handleEvent](event) {
    if (!this.entries.length || !Object.keys(this.types).length) return
    const activeEntry = this.entries[this.entries.length - 1]

    if (activeEntry.types.indexOf(event.type) > -1) {
      activeEntry.handler(event)
    }
  }
}

const globalEventRegistry = new GlobalEventRegistry()

export { globalEventRegistry }
