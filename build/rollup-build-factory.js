// Base rollup config which is imported by all
// packages to build the published package.

import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"

const autoprefixer = require("autoprefixer")
const MODULE_TYPES = ["esm", "cjs"]

export const rollupBuildConfigFactory = (packagePath) => {
  const getPath = (target) => path.resolve(packagePath, target || "")

  // Get license banner
  const banner = require(getPath("../../bin/banner"))

  // Get the folder name, e.g. "tooltip"
  const pathParts = packagePath.split("/")
  const COMPONENT_NAME = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${COMPONENT_NAME}`

  const outputPlugins = [
    terser({
      output: {
        comments: (_, comment) => {
          const { value, type } = comment
          if (type === "comment2") {
            return /@preserve|@license|@cc_on/i.test(value)
          }
        },
      },
    }),
  ]

  // Input
  const input = getPath("src/index.js")
  const external = ["upgraded-element"]

  // Plugins
  const plugins = [
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-env"] }),
    resolve(),
    commonjs(),
    postcss({
      plugins: [autoprefixer],
      modules: false,
      extract: false,
      inject: false,
      minimize: true,
    }),
  ]

  // Outputs
  const output = MODULE_TYPES.map((format) => ({
    format,
    file: getPath(`lib/index.${format}.js`),
    sourcemap: true,
    banner: banner(__dirname, COMPONENT_NAME),
    name: PACKAGE_NAME,
    plugins: outputPlugins,
  }))

  // return an array of configs for both esm and cjs
  return { input, external, plugins, output }
}
