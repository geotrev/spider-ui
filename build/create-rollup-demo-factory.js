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

export const createDemoConfigFactory = (packagePath) => {
  const PUBLIC_PATH = path.resolve(packagePath, "public")

  return {
    input: path.resolve(packagePath, "src/components/index.js"),
    output: {
      file: path.resolve(packagePath, "public/bundle.js"),
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
        plugins: [sass, autoprefixer],
        modules: false,
        extract: false,
        inject: false,
        minimize: true,
      }),
    ],
  }
}
