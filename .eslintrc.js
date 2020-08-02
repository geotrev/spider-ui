const path = require("path")

const READONLY = "readonly"

const packagesPath = path.resolve(__dirname, "packages")
const utilsPath = path.resolve(__dirname, "utilities")
const modulesPath = path.resolve(__dirname, "node_modules")

module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier", "prettier/babel"],
  globals: {
    Atomics: READONLY,
    SharedArrayBuffer: READONLY,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
        paths: [packagesPath, utilsPath],
        moduleDirectory: [modulesPath],
      },
    },
    "import/ignore": [".(scss)$"],
  },
}
