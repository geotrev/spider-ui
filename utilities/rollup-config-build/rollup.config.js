// Base rollup config which is imported by all
// packages to build the published package.

import { terser } from "rollup-plugin-terser"
import { createBanner } from "./create-banner"
import { packagePlugins, getPath } from "../../build/rollup-config-base"

const FORMAT_ES = "es"
const FORMAT_CJS = "cjs"
const FORMAT_UMD = "umd"
const packagePath = process.cwd()

// Get the folder name, e.g. `tooltip`
const pathParts = getPath(packagePath).split("/")
const ELEMENT_NAME = pathParts[pathParts.length - 1]

// Configures the global namespace, e.g. `window['spider-global-event-registry']`
const name = `spider-${ELEMENT_NAME}`

// Input
const input = getPath(packagePath, "src/index.js")
const external = ["upgraded-element", "@spider-ui/global-event-registry"]

// Plugins
const plugins = packagePlugins(packagePath)
const terserConfig = terser({
  output: {
    comments: (_, comment) => {
      const { value, type } = comment
      if (type === "comment2") {
        return /@preserve|@license|@cc_on/i.test(value)
      }
    },
  },
})

// Shared output
const baseOutput = (format) => ({
  format,
  banner: createBanner(packagePath, ELEMENT_NAME),
  name,
  sourcemap: true,
})

// Module outputs
const moduleOutputs = [FORMAT_ES, FORMAT_CJS].map((format) => ({
  ...baseOutput(format),
  file: getPath(packagePath, `lib/${ELEMENT_NAME}.${format}.js`),
  plugins: process.env.BABEL_ENV === "publish" ? [terserConfig] : undefined,
}))

let output = [...moduleOutputs]

// Only create dist outputs for modules in `packages/*`
if (packagePath.includes("packages/")) {
  const distOutputFiles = [
    `dist/${ELEMENT_NAME}.js`,
    `dist/${ELEMENT_NAME}.min.js`,
  ]

  const distOutputs = distOutputFiles.map((filePath) => ({
    ...baseOutput(FORMAT_UMD),
    file: getPath(packagePath, filePath),
    globals: {
      "upgraded-element": "UpgradedElement",
      "@spider-ui/global-event-registry": "spider-global-event-registry",
    },
    plugins: filePath.includes("min.js") ? [terserConfig] : undefined,
  }))

  output = [...output, ...distOutputs]
}

export default { input, external, plugins, output }
