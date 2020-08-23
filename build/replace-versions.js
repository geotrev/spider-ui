#!/usr/bin/env node

import {
  getFileContent,
  writeFileContent,
  UPGRADED_ELEMENT_NAME,
  getRootFileContent,
} from "./helpers.js"

const VERSION_PATTERN = /@\d+\.\d+\.\d+(-(alpha|beta|rc)\.\d+)?\//g

/**
 * Updates README.md cdn link version
 */
export const updateReadMeVersions = (basePath, targetFile) => {
  const targetFileContent = getFileContent(basePath, targetFile)
  const { version } = JSON.parse(getFileContent(basePath, "package.json"))
  const [oldVersion, oldVersionMin] = targetFileContent.match(VERSION_PATTERN)
  const nextVersion = `@${version}/`

  /**
   * Detect link versions
   */

  if (oldVersion !== nextVersion || oldVersionMin !== nextVersion) {
    console.log(`
    Newer package version detected. Updating CDN links.`)
  } else {
    console.info(`
    All versions unchanged. Skipping...`)
    return
  }

  const nextFileContent = targetFileContent.replace(
    VERSION_PATTERN,
    nextVersion
  )

  writeFileContent(basePath, targetFile, nextFileContent)

  console.log(`    CDN link versions updated.
      ${oldVersion.slice(1, -1)} -> ${nextVersion}`)
}

/**
 * Updates public/index.html cdn link version
 */
export const updateDemoVersions = (basePath, targetFile) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const targetFileContent = getFileContent(basePath, targetFile)

  // package version
  const { version: nextSpiderVersion } = JSON.parse(
    getFileContent(basePath, "package.json")
  )

  // upgraded-element version
  const { version: nextUpgradedElementVersion } = JSON.parse(
    getRootFileContent(`node_modules/${UPGRADED_ELEMENT_NAME}/package.json`)
  )

  const nextUpgradedElementVersionString = `@${nextUpgradedElementVersion}/`
  const nextSpiderVersionString = `@${nextSpiderVersion}/`

  const [oldUpgradedElementVersion, oldSpiderVersion] = targetFileContent.match(
    VERSION_PATTERN
  )

  /**
   * Detect link versions
   */

  const upgradedElementVersionChanged =
    oldUpgradedElementVersion !== nextUpgradedElementVersionString
  const spiderVersionChanged = oldSpiderVersion !== nextSpiderVersionString

  if (upgradedElementVersionChanged || spiderVersionChanged) {
    console.log(`
    Newer package version detected. Updating CDN links.`)
  } else {
    console.info(`
    All versions unchanged. Skipping...`)
    return
  }

  const noChange = (msg, name) =>
    `${msg}\n      - ${name} version unchanged. Skipped.`
  const didChange = (msg, name, oldV, newV) =>
    `${msg}\n      - ${name}: ${oldV.slice(1, -1)} -> ${newV}`
  let nextFileContent = targetFileContent
  let resultMessage = `    CDN link versions updated.`

  if (upgradedElementVersionChanged) {
    nextFileContent = nextFileContent.replace(
      oldUpgradedElementVersion,
      nextUpgradedElementVersionString
    )

    resultMessage = didChange(
      resultMessage,
      UPGRADED_ELEMENT_NAME,
      oldUpgradedElementVersion,
      nextUpgradedElementVersion
    )
  } else {
    resultMessage = noChange(resultMessage, UPGRADED_ELEMENT_NAME)
  }

  if (spiderVersionChanged) {
    nextFileContent = nextFileContent.replace(
      oldSpiderVersion,
      nextSpiderVersionString
    )

    resultMessage = didChange(
      resultMessage,
      PACKAGE_SUFFIX,
      oldSpiderVersion,
      nextSpiderVersion
    )
  } else {
    resultMessage = noChange(resultMessage, PACKAGE_SUFFIX)
  }

  writeFileContent(basePath, targetFile, nextFileContent)
  console.log(resultMessage)
}
