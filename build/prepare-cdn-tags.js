#!/usr/bin/env node

import fs from "fs"
import * as logger from "./logger.js"
import { getFileContent, writeFileContent, getJSON } from "./helpers.js"

logger.begin("Updating CDN Tags")

const metadata = getJSON("build/metadata.json")

// Peer dependencies

// const peers = {}
// metadata.filter((data) => data.external ? peers[data.name] = data)

const upgradedElement = metadata.filter(
  (data) => data.name === "upgraded-element"
)[0]

const globalEventRegistry = metadata.filter((data) =>
  data.name.includes("global-event-registry")
)[0]

// Everything else
const spiderElements = metadata.filter(
  (data) => data.name !== "upgraded-element"
)

// Enums
const Files = {
  README: "README.md",
  DEMO_HTML: "public/index.html",
}

const Patterns = {
  SCRIPT: /<script[\s\S]+?<\/script>/g,
  VERSION: /@\d+\.\d+\.\d+(-(alpha|beta|rc)\.\d+)?\//g,
  SRI: /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g,
}

/**
 * Get and update scripts tags in each spider package:
 * - README.md
 * - public/index.html
 */
spiderElements.forEach((pkg) => {
  const { name, dir, sri, version } = pkg

  /**
   * README.md
   */

  logger.step(`Updating file: ${name}/${Files.README}`)

  const readmeFile = getFileContent(dir, Files.README)
  const readmeScriptTags = readmeFile
    .match(Patterns.SCRIPT)
    .filter((tag) => tag.includes("cdn.jsdelivr.net"))
  const nextReadmeTags = readmeScriptTags.map((tag) => {
    const isMin = tag.includes(".min.js")
    const oldHash = tag.match(Patterns.SRI)[0]
    const nextHash = isMin ? sri.bundleMin : sri.bundle
    const oldVersion = tag.match(Patterns.VERSION)[0]
    let updaters = []

    if ([sri.bundleMin, sri.bundle].includes(oldHash)) {
      logger.step("--> SRIs unchanged, skipping...")
    } else {
      updaters.push((tagString) => tagString.replace(oldHash, nextHash))
      logger.step(`--> SRI hash changed, updated.`)
    }

    if (version === oldVersion) {
      logger.step("--> Version unchanged, skipping...")
    } else {
      updaters.push((tagString) =>
        tagString.replace(oldVersion, `@${version}/`)
      )
      logger.step(`--> Version changed, updated.`)
    }

    if (updaters.length) {
      return updaters.reduce(
        (updatedTag, updater) => (updatedTag = updater(updatedTag)),
        tag
      )
    }
  })

  let nextReadmeFile = readmeFile
  readmeScriptTags.forEach((oldTag, i) => {
    nextReadmeFile = nextReadmeFile.replace(oldTag, nextReadmeTags[i])
  })
  writeFileContent(dir, Files.README, nextReadmeFile)

  /**
   * public/index.html
   */

  const DEMO_PATH = `${dir}/public/index.html`
  if (fs.existsSync(DEMO_PATH) !== false) {
    logger.step(`Updating file: ${name}/${Files.DEMO_HTML}`)

    const htmlFile = getFileContent(dir, Files.DEMO_HTML)
    const htmlScriptTags = htmlFile
      .match(Patterns.SCRIPT)
      .filter((tag) => tag.includes("cdn.jsdelivr.net"))

    const nextHtmlTags = htmlScriptTags.map((tag) => {
      const isMin = tag.includes(".min.js")
      const oldHash = tag.match(Patterns.SRI)[0]
      const nextHash = isMin ? sri.bundleMin : sri.bundle
      const oldVersion = tag.match(Patterns.VERSION)[0]
      const isUpgradedElement = tag.includes("upgraded-element")
      const isGlobalEventRegistry = tag.includes("global-event-registry")
      let updaters = []

      if (isUpgradedElement || isGlobalEventRegistry) {
        logger.step(
          `--> Updating external dependency: ${
            isUpgradedElement
              ? "upgraded-element"
              : "@spider-ui/global-event-registry"
          }`
        )
      }

      if ([sri.bundleMin, sri.bundle].includes(oldHash)) {
        logger.step("--> SRIs unchanged, skipping...")
      } else {
        updaters.push((tagString) => tagString.replace(oldHash, nextHash))
        logger.step(`--> SRI hash changed, updated.`)
      }

      if (version === oldVersion) {
        logger.step("--> Version unchanged, skipping...")
      } else {
        updaters.push((tagString) => tagString.replace(oldVersion, version))
        logger.step(`--> Version changed, updated.`)
      }

      // Update known external dependencies if we encounter them:

      if (isUpgradedElement) {
        return tag
          .replace(
            Patterns.SRI,
            isMin ? upgradedElement.sri.bundleMin : upgradedElement.sri.bundle
          )
          .replace(Patterns.VERSION, `@${upgradedElement.version}/`)
      }

      if (isGlobalEventRegistry) {
        return tag
          .replace(
            Patterns.SRI,
            isMin
              ? globalEventRegistry.sri.bundleMin
              : globalEventRegistry.sri.bundle
          )
          .replace(Patterns.VERSION, `@${globalEventRegistry.version}/`)
      }

      // Otherwise, update the star of the show:

      if (updaters.length) {
        return updaters.reduce(
          (updatedTag, updater) => (updatedTag = updater(updatedTag)),
          tag
        )
      }
    })

    let nextHtmlFile = htmlFile
    htmlScriptTags.forEach((oldTag, i) => {
      nextHtmlFile = nextHtmlFile.replace(oldTag, nextHtmlTags[i])
    })
    writeFileContent(dir, Files.DEMO_HTML, nextHtmlFile)
  }
})

logger.finish()
