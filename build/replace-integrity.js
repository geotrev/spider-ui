#!/usr/bin/env node

import path from "path"
import Hashes from "jshashes"
import {
  UPGRADED_ELEMENT_NAME,
  getRootFileContent,
  getFileContent,
  writeFileContent,
} from "./helpers.js"

// Constants

const UPGRADED_ELEMENT_DIST_PATH = `node_modules/${UPGRADED_ELEMENT_NAME}/dist/${UPGRADED_ELEMENT_NAME}.min.js`
const B64_PATTERN = /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g

// Helpers

const getSHA = (data) => {
  return new Hashes.SHA256().b64(data)
}

const nextBundleSHA = (basePath, name) => {
  return getSHA(getFileContent(basePath, `dist/${name}.js`))
}

const nextBundleMinSHA = (basePath, name) => {
  return getSHA(getFileContent(basePath, `dist/${name}.min.js`))
}

const nextUpgradedElementMinSHA = () => {
  return getSHA(getRootFileContent(UPGRADED_ELEMENT_DIST_PATH))
}

/**
 * Updates readme sri hashes
 */
export const updateReadMeIntegrity = (basePath, targetFile) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const targetFilePath = path.resolve(basePath, targetFile)
  const targetFileContent = getFileContent(basePath, targetFile)

  /**
   * Detect existing hashes.
   */

  const [currentBundleSHA, currentBundleMinSHA] = targetFileContent.match(
    B64_PATTERN
  )

  if (currentBundleSHA && currentBundleMinSHA) {
    console.log(`\n    Detected content hashes. Attempting update...`)
  } else {
    console.error(
      `\n    Couldn't find hash pairs. Something went wrong. Skipping...`
    )
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
    console.info("    Integrity hasn't changed. Skipping...")
    return
  }

  /**
   * Apply the new hashes to file contents, then write to file.
   */

  let nextFileContent = targetFileContent

  nextFileContent = nextFileContent
    .replace(currentBundleSHA, formattedBundleSHA)
    .replace(currentBundleMinSHA, formattedBundleMinSHA)

  writeFileContent(basePath, targetFilePath, nextFileContent)

  console.log(`    Content hashes updated.
      - Bundle: ${formattedBundleSHA}
      - Bundle: ${formattedBundleMinSHA}`)
}

/**
 * Updates public/index.html sri hashes
 */
export const updateDemoIntegrity = (basePath, targetFile) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${PACKAGE_SUFFIX}`
  const targetFileContent = getFileContent(basePath, targetFile)

  /**
   * Detect existing hashes.
   */

  const [upgradedElementMinSHA, currentBundleMinSHA] = targetFileContent.match(
    B64_PATTERN
  )

  if (upgradedElementMinSHA && currentBundleMinSHA) {
    console.log(`\n    Detected content hashes. Attempting update...`)
  } else {
    console.error(
      `\n    Couldn't find hashes. Something went wrong. Skipping...`
    )
    return
  }

  const formatSHA = (hash) => `sha256-${hash}`
  const formattedUpgradedElementMinSHA = formatSHA(nextUpgradedElementMinSHA())
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
    console.info("    Integrity hasn't changed. Skipping...")
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

  writeFileContent(basePath, targetFile, nextFileContent)

  const noChange = (name, msg) => `${msg}\n      - ${name} unchanged. Skipped.`
  const didChange = (name, msg, hash) => `${msg}\n      - ${name}: ${hash}`
  let resultMessage = `    Content hashes updated`

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
