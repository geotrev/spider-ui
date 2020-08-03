// Base rollup config which is imported by all
// packages to build the published package.

import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"
import resolve from "@rollup/plugin-node-resolve"
import { getBabelOutputPlugin } from "@rollup/plugin-babel"
import postcss from "rollup-plugin-postcss"
import { terser } from "rollup-plugin-terser"

const banner = require("bin/banner")
const sass = require("@csstools/postcss-sass")
const autoprefixer = require("autoprefixer")
const MODULE_TYPES = ["esm", "cjs"]

export default (packagePath) => {
  // Replace the sass file package directive path with the absolute path
  const sassPath = path.resolve(packagePath, "../sass")

  // Get the folder name, e.g. "tooltip"
  const pathParts = packagePath.split("/")
  const COMPONENT_NAME = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${COMPONENT_NAME}`

  // return an array of configs for both esm and cjs
  return MODULE_TYPES.map((type) => ({
    input: path.resolve(packagePath, "src/index.js"),
    output: {
      file: path.resolve(packagePath, `lib/index.${type}.js`),
      format: type,
      sourcemap: true,
      banner: banner(COMPONENT_NAME),
      name: PACKAGE_NAME,
    },
    plugins: [
      alias({ "@spider-ui/sass": sassPath }),
      resolve(),
      commonjs(),
      postcss({
        plugins: [sass, autoprefixer],
        modules: false,
        extract: false,
        inject: false,
        minimize: true,
      }),
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"],
      }),
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
    ],
  }))
}
