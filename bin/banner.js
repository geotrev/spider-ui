const path = require("path")
const pkg = require(path.resolve(__dirname, "../package.json"))
const year = new Date().getFullYear()

const banner = (name) => `/*!
  * @license MIT (https://github.com/geotrev/spider-ui/blob/master/LICENSE)
  * @spider-ui/${name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  */`

module.exports = banner
