// Base rollup config which is imported by all
// packages to run demos.

import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import { packagePlugins, getPath } from "../../build/rollup-config-base"

const packagePath = process.cwd()
const PUBLIC_PATH = getPath(packagePath, "public")

export default {
  input: getPath(packagePath, "src/index.js"),
  output: {
    file: getPath(packagePath, "public/bundle.js"),
    format: "iife",
  },
  plugins: [
    ...packagePlugins(packagePath, true),
    serve({
      open: true,
      contentBase: PUBLIC_PATH,
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: PUBLIC_PATH }),
  ],
}
