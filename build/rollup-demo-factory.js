// Base rollup config which is imported by all
// packages to run demos.

import path from "path"
import serve from "rollup-plugin-serve"
import commonjs from "@rollup/plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import resolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"

const sass = require("@csstools/postcss-sass")
const autoprefixer = require("autoprefixer")

export const rollupDemoConfigFactory = (packagePath) => {
  const getPath = (target) => path.resolve(packagePath, target || "")

  const PUBLIC_PATH = getPath("public")

  return {
    input: getPath("src/index.js"),
    output: {
      file: getPath("public/bundle.js"),
      format: "iife",
    },
    plugins: [
      resolve(),
      commonjs(),
      serve({
        open: true,
        contentBase: PUBLIC_PATH,
        historyApiFallback: true,
        host: "localhost",
        port: 3000,
      }),
      livereload({
        watch: PUBLIC_PATH,
      }),
      postcss({
        plugins: [autoprefixer],
        modules: false,
        extract: false,
        inject: false,
        minimize: false,
      }),
    ],
  }
}
