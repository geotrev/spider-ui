#!/usr/bin/env node

import fs from "fs"
import path from "path"
import glob from "glob"
import Hashes from "jshashes"

const packages = glob.sync(path.resolve(process.cwd(), "elements/*/"))

const updateIntegrity = (packagePath, targetFile, isDemoFile = false) => {
  const FILE_FORMAT = "utf-8"
  const pathParts = packagePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const targetFilePath = path.resolve(packagePath, targetFile)
  const targetFileContent = fs.readFileSync(targetFilePath, FILE_FORMAT)

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
  const [currentBundleSHA, currentBundleMinSHA] = targetFileContent.match(
    b64Regexp
  )

  if (currentBundleSHA || currentBundleMinSHA) {
    console.log(`
-> Detected content hashes in ${PACKAGE_SUFFIX}/${targetFile}. Attempting update...`)
  } else {
    console.error("-> Couldn't find hashes. Something went wrong. Exiting...")
    return
  }

  const formatSHA = (hash) => `sha256-${hash}`
  const formattedBundleSHA = formatSHA(nextBundleSHA)
  const formattedBundleMinSHA = formatSHA(nextBundleMinSHA)

  /**
   * Don't write if the hashes are the same.
   */

  if (
    (isDemoFile && currentBundleMinSHA === formattedBundleMinSHA) ||
    (currentBundleSHA === formattedBundleSHA &&
      currentBundleMinSHA === formattedBundleMinSHA)
  ) {
    console.info("-> Integrity hasn't changed. Exiting...")
    return
  }

  /**
   * Apply the new hashes to file contents, then write to file.
   */

  let nextFileContent = targetFileContent
  const shouldUpdateBundle =
    !isDemoFile && currentBundleSHA !== formattedBundleSHA
  const shouldUpdateBundleMin = currentBundleMinSHA !== formattedBundleMinSHA

  if (shouldUpdateBundle) {
    nextFileContent = nextFileContent.replace(
      currentBundleSHA,
      formattedBundleSHA
    )
  }

  if (shouldUpdateBundleMin) {
    nextFileContent = nextFileContent.replace(
      currentBundleMinSHA,
      formattedBundleMinSHA
    )
  }

  fs.writeFileSync(targetFilePath, nextFileContent, FILE_FORMAT)
  let resultMessage = `-> Content hashes updated in ${PACKAGE_SUFFIX}/${targetFile}`

  if (shouldUpdateBundle) {
    resultMessage = `${resultMessage}\n    - Bundle: ${formattedBundleSHA}`
  }

  if (shouldUpdateBundleMin) {
    resultMessage = `${resultMessage}\n    - Bundle: ${formattedBundleMinSHA}`
  }

  console.log(resultMessage)
}

packages.forEach((packagePath) => {
  console.log("\n===============================")
  // Update documentation
  updateIntegrity(packagePath, "README.md")
  // Update demo html pages for static asset testing
  updateIntegrity(packagePath, "public/index.html", true)

  console.log("\n-> Done ✨")
})
