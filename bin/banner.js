const path = require("path")

const banner = (packagePath, name) => {
  const pkg = require(path.resolve(packagePath, "package.json"))
  const year = new Date().getFullYear()

  return `/*!
  * @license MIT (https://github.com/geotrev/spider-ui/packages/${name}/blob/master/LICENSE)
  * @spider-ui/${name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  */`
}

module.exports = banner
