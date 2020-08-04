// Base rollup config which is imported by all
// packages to build the published package.

import path from "path"
import commonjs from "@rollup/plugin-commonjs"
// import alias from "@rollup/plugin-alias"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import postcss from "rollup-plugin-postcss"
// import { terser } from "rollup-plugin-terser"

const sass = require("@csstools/postcss-sass")
const autoprefixer = require("autoprefixer")
const MODULE_TYPES = ["esm", "cjs"]

export const createBuildConfigFactory = (packagePath) => {
  // Get license banner
  const banner = require(path.resolve(packagePath, "../../bin/banner"))

  // Replace the sass file package directive path with the absolute path
  // const sassPath = path.resolve(packagePath, "../sass")

  // Get the folder name, e.g. "tooltip"
  const pathParts = packagePath.split("/")
  const COMPONENT_NAME = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${COMPONENT_NAME}`

  const outputPlugins = [
    // terser({
    //   output: {
    //     comments: (_, comment) => {
    //       const { value, type } = comment
    //       if (type === "comment2") {
    //         return /@preserve|@license|@cc_on/i.test(value)
    //       }
    //     },
    //   },
    // }),
  ]

  // Input
  const input = path.resolve(packagePath, "src/index.js")
  const external = ["upgraded-element"]

  // Plugins
  const plugins = [
    babel({ babelHelpers: "bundled", presets: ["@babel/preset-env"] }),
    // alias({ "@spider-ui/sass": sassPath }),
    resolve(),
    commonjs(),
    postcss({
      plugins: [sass, autoprefixer],
      modules: false,
      extract: false,
      inject: false,
      minimize: true,
    }),
  ]

  // Outputs
  const output = MODULE_TYPES.map((format) => ({
    format,
    file: path.resolve(packagePath, `lib/index.${format}.js`),
    sourcemap: true,
    banner: banner(__dirname, COMPONENT_NAME),
    name: PACKAGE_NAME,
    plugins: outputPlugins,
  }))

  // return an array of configs for both esm and cjs
  return { input, external, plugins, output }
}
