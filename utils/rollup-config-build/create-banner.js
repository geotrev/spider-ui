export const createBanner = async (packagePath, name) => {
  const { default: pkg } = await import(`${packagePath}/package.json`)
  const year = new Date().getFullYear()

  return `/*!
  * @license MIT (https://github.com/geotrev/spider-ui/blob/master/LICENSE)
  * @spider-ui/${name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  */`
}
