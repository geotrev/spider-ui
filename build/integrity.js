#!/usr/bin/env node

import fs from "fs"
import path from "path"
import glob from "glob"
import Hashes from "jshashes"

const packages = glob.sync(path.resolve(process.cwd(), "elements/*/"))

const updatePackageIntegrity = (packagePath) => {
  const FILE_FORMAT = "utf-8"
  const pathParts = packagePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const readmePath = path.resolve(packagePath, "README.md")
  const readmeFile = fs.readFileSync(readmePath, FILE_FORMAT)

  const getFileContent = (filePath) =>
    fs.readFileSync(path.resolve(packagePath, filePath), FILE_FORMAT)
  const getSHA = (data) => new Hashes.SHA256().b64(data)

  const nextBundleSHA = getSHA(getFileContent(`dist/${PACKAGE_SUFFIX}.js`))
  const nextBundleMinSHA = getSHA(
    getFileContent(`dist/${PACKAGE_SUFFIX}.min.js`)
  )

  /**
   * Detect existing hashes.
   */

  // https://stackoverflow.com/a/31245864
  const b64Regexp = /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g
  const [currentBundleSHA, currentBundleMinSHA] = readmeFile.match(b64Regexp)

  if (currentBundleSHA && currentBundleMinSHA) {
    console.log(`
#===============================#

-> Detected content hashes in elements/${PACKAGE_SUFFIX}/README.md. Attempting update...`)
  } else {
    console.error("-> Couldn't find hashes. Something went wrong. Exiting...")
    process.exit()
  }

  const formatSHA = (hash) => `sha256-${hash}`
  const formattedBundleSHA = formatSHA(nextBundleSHA)
  const formattedBundleMinSHA = formatSHA(nextBundleMinSHA)

  /**
   * Don't write if the hashes are the same.
   */

  if (
    currentBundleSHA === formattedBundleSHA &&
    currentBundleMinSHA === formattedBundleMinSHA
  ) {
    console.info("-> Integrity hasn't changed. Exiting...")
    process.exit()
  }

  /**
   * Apply the new hashes to readme contents, then write to file.
   */

  let nextReadmeFile = readmeFile

  if (currentBundleSHA !== formattedBundleSHA) {
    nextReadmeFile = nextReadmeFile.replace(
      currentBundleSHA,
      formattedBundleSHA
    )
  }

  if (currentBundleMinSHA !== formattedBundleMinSHA) {
    nextReadmeFile = nextReadmeFile.replace(
      currentBundleMinSHA,
      formattedBundleMinSHA
    )
  }

  fs.writeFileSync(readmePath, nextReadmeFile, FILE_FORMAT)
  console.log(`-> Content hashes updated in elements/${PACKAGE_SUFFIX}/README.md
    - Bundle: ${formattedBundleSHA}
    - Bundle (minified): ${formattedBundleMinSHA}
`)
}

packages.forEach(updatePackageIntegrity)
