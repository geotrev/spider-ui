import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import scss from "rollup-plugin-scss"
import sass from "sass"
import postcss from "postcss"
import autoprefixer from "autoprefixer"
import path from "path"

export const getPath = (basePath, target) =>
  path.resolve(basePath, target || "")

export const packagePlugins = (packagePath, watchMode) => {
  const scssOptions = {
    processor: () => postcss([autoprefixer]),
    sass,
    output: false,
    outputStyle: "compressed",
    includePaths: [getPath(packagePath, "node_modules/")],
  }

  if (watchMode) {
    scssOptions.watch = [
      getPath(packagePath, "src"),
      getPath(packagePath, "../../utils/sass"),
    ]
  }

  return [
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
    scss(scssOptions),
  ]
}
