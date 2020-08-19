// Base rollup config which is imported by all
// packages to build the published package.

import { terser } from "rollup-plugin-terser"
import { createBanner } from "./create-banner"
import { packagePlugins, getPath } from "../../build/rollup-config-base"

const FORMAT_ES = "es"
const FORMAT_CJS = "cjs"
const FORMAT_UMD = "umd"
const packagePath = process.cwd()

// Get the folder name, e.g. "tooltip"
const pathParts = getPath(packagePath).split("/")
const COMPONENT_NAME = pathParts[pathParts.length - 1]
const name = `@spider-ui/${COMPONENT_NAME}`

// Input
const input = getPath(packagePath, "src/index.js")
const external = ["upgraded-element"]

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
  banner: createBanner(packagePath, COMPONENT_NAME),
  name,
  sourcemap: true,
})

// Module outputs
const moduleOutputs = [FORMAT_ES, FORMAT_CJS].map((format) => ({
  ...baseOutput(format),
  file: getPath(packagePath, `lib/${COMPONENT_NAME}.${format}.js`),
  plugins: process.env.BABEL_ENV === "publish" ? [terserConfig] : undefined,
}))

// Dist outputs
const distOutputFiles = [
  `dist/${COMPONENT_NAME}.js`,
  `dist/${COMPONENT_NAME}.min.js`,
]
const distOutputs = distOutputFiles.map((filePath) => ({
  ...baseOutput(FORMAT_UMD),
  file: getPath(packagePath, filePath),
  globals: { "upgraded-element": "UpgradedElement" },
  plugins: filePath.includes("min.js") ? [terserConfig] : undefined,
}))

const output = [...moduleOutputs, ...distOutputs]
export default { input, external, plugins, output }
