#!/usr/bin/env node

import fs from "fs"
import path from "path"
import glob from "glob"
import Hashes from "jshashes"

// Constants
const FILE_FORMAT = "utf-8"
const UPGRADED_ELEMENT_NAME = "upgraded-element"
const UPGRADED_ELEMENT_DIST_PATH = `node_modules/${UPGRADED_ELEMENT_NAME}/dist/${UPGRADED_ELEMENT_NAME}.min.js`
const B64_PATTERN = /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g

// Helpers
const getFileContent = (basePath, filePath) => {
  return fs.readFileSync(path.resolve(basePath, filePath), FILE_FORMAT)
}

const getRootFileContent = (basePath, filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), FILE_FORMAT)
}

const getSHA = (data) => {
  return new Hashes.SHA256().b64(data)
}

const nextBundleSHA = (basePath, name) => {
  return getSHA(getFileContent(basePath, `dist/${name}.js`))
}

const nextBundleMinSHA = (basePath, name) => {
  return getSHA(getFileContent(basePath, `dist/${name}.min.js`))
}

const nextUpgradedElementMinSHA = (basePath) => {
  return getSHA(getRootFileContent(basePath, UPGRADED_ELEMENT_DIST_PATH))
}

/**
 * Updates readme sri hashes
 */
const updateReadMeIntegrity = (basePath, targetFile) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const targetFilePath = path.resolve(basePath, targetFile)
  const targetFileContent = fs.readFileSync(targetFilePath, FILE_FORMAT)

  /**
   * Detect existing hashes.
   */

  const [currentBundleSHA, currentBundleMinSHA] = targetFileContent.match(
    B64_PATTERN
  )

  if (currentBundleSHA && currentBundleMinSHA) {
    console.log(`
-> Detected content hashes in ${PACKAGE_SUFFIX}/${targetFile}. Attempting update...`)
  } else {
    console.error(`
-> Couldn't find hash pairs. Something went wrong. Exiting...`)
    return
  }

  const formatSHA = (hash) => `sha256-${hash}`
  const formattedBundleSHA = formatSHA(nextBundleSHA(basePath, PACKAGE_SUFFIX))
  const formattedBundleMinSHA = formatSHA(
    nextBundleMinSHA(basePath, PACKAGE_SUFFIX)
  )

  /**
   * Don't write if the hashes are the same.
   */

  if (
    currentBundleSHA === formattedBundleSHA &&
    currentBundleMinSHA === formattedBundleMinSHA
  ) {
    console.info("-> Integrity hasn't changed. Exiting...")
    return
  }

  /**
   * Apply the new hashes to file contents, then write to file.
   */

  let nextFileContent = targetFileContent

  nextFileContent = nextFileContent
    .replace(currentBundleSHA, formattedBundleSHA)
    .replace(currentBundleMinSHA, formattedBundleMinSHA)

  fs.writeFileSync(targetFilePath, nextFileContent, FILE_FORMAT)

  console.log(`-> Content hashes updated in ${PACKAGE_SUFFIX}/${targetFile}
    - Bundle: ${formattedBundleSHA}
    - Bundle: ${formattedBundleMinSHA}
  `)
}

/**
 * Updates public/index.html sri hashes
 */
const updateDemoIntegrity = (basePath, targetFile) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${PACKAGE_SUFFIX}`
  const targetFilePath = path.resolve(basePath, targetFile)
  const targetFileContent = fs.readFileSync(targetFilePath, FILE_FORMAT)

  /**
   * Detect existing hashes.
   */

  const [upgradedElementMinSHA, currentBundleMinSHA] = targetFileContent.match(
    B64_PATTERN
  )

  if (upgradedElementMinSHA && currentBundleMinSHA) {
    console.log(`
-> Detected content hashes in ${PACKAGE_SUFFIX}/${targetFile}. Attempting update...`)
  } else {
    console.error(`
-> Couldn't find hashes. Something went wrong. Exiting...`)
    return
  }

  const formatSHA = (hash) => `sha256-${hash}`
  const formattedUpgradedElementMinSHA = formatSHA(
    nextUpgradedElementMinSHA(basePath)
  )
  const formattedBundleMinSHA = formatSHA(
    nextBundleMinSHA(basePath, PACKAGE_SUFFIX)
  )

  /**
   * Don't write if the hashes are the same.
   */

  if (
    upgradedElementMinSHA === formattedUpgradedElementMinSHA &&
    currentBundleMinSHA === formattedBundleMinSHA
  ) {
    console.info("-> Integrity hasn't changed. Exiting...")
    return
  }

  /**
   * Apply the new hashes to file contents, then write to file.
   */

  let nextFileContent = targetFileContent

  const upgradedElementUpdated =
    upgradedElementMinSHA !== formattedUpgradedElementMinSHA
  const bundleMinUpdated = currentBundleMinSHA !== formattedBundleMinSHA

  if (upgradedElementUpdated) {
    nextFileContent = nextFileContent.replace(
      upgradedElementMinSHA,
      formattedUpgradedElementMinSHA
    )
  }

  if (bundleMinUpdated) {
    nextFileContent = nextFileContent.replace(
      currentBundleMinSHA,
      formattedBundleMinSHA
    )
  }

  fs.writeFileSync(targetFilePath, nextFileContent, FILE_FORMAT)

  const noChange = (name, msg) => `${msg}\n    - ${name} unchanged. Skipped.`
  const didChange = (name, msg, hash) => `${msg}\n    - ${name}: ${hash}`
  let resultMessage = `-> Content hashes updated in ${PACKAGE_SUFFIX}/${targetFile}`

  if (upgradedElementUpdated) {
    resultMessage = didChange(
      UPGRADED_ELEMENT_NAME,
      resultMessage,
      formattedUpgradedElementMinSHA
    )
  } else {
    resultMessage = noChange(UPGRADED_ELEMENT_NAME, resultMessage)
  }

  if (bundleMinUpdated) {
    resultMessage = didChange(
      PACKAGE_NAME,
      resultMessage,
      formattedBundleMinSHA
    )
  } else {
    resultMessage = noChange(PACKAGE_NAME, resultMessage)
  }

  console.log(resultMessage)
}

glob.sync(path.resolve(process.cwd(), "elements/*/")).forEach((basePath) => {
  console.log("\n===============================")
  // Update documentation
  updateReadMeIntegrity(basePath, "README.md")
  // Update demo html pages for static asset testing
  updateDemoIntegrity(basePath, "public/index.html")

  console.log("\n-> Done ✨")
})
