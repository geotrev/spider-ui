// Base rollup config which is imported by all
// packages to build the published package.

import { terser } from "rollup-plugin-terser"
import { banner } from "./banner"
import { packagePlugins, getPath } from "../../build/rollup-config-base"

const MODULE_TYPES = ["es", "cjs"]
const packagePath = process.cwd()

// Get the folder name, e.g. "tooltip"
const pathParts = getPath(packagePath).split("/")
const COMPONENT_NAME = pathParts[pathParts.length - 1]
const PACKAGE_NAME = `@spider-ui/${COMPONENT_NAME}`

let outputPlugins = []

if (process.env.BABEL_ENV === "publish") {
  outputPlugins.push(
    terser({
      output: {
        comments: (_, comment) => {
          const { value, type } = comment
          if (type === "comment2") {
            return /@preserve|@license|@cc_on/i.test(value)
          }
        },
      },
    })
  )
}

// Input
const input = getPath(packagePath, "src/index.js")
const external = ["upgraded-element"]

// Plugins
const plugins = packagePlugins(packagePath)

// Outputs
const output = MODULE_TYPES.map((format) => ({
  format,
  file: getPath(packagePath, `lib/index.${format}.js`),
  sourcemap: true,
  banner: banner(__dirname, COMPONENT_NAME),
  name: PACKAGE_NAME,
  plugins: outputPlugins,
}))

export default { input, external, plugins, output }
