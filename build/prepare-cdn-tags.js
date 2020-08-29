#!/usr/bin/env node

import fs from "fs"
import * as logger from "./logger.js"
import { getFileContent, writeFileContent, getJSON } from "./helpers.js"

const metadata = getJSON("build/metadata.json")

// Peer dependencies
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

  // Begin updating README.md

  const readmeFile = getFileContent(dir, Files.README)
  const readmeScriptTags = readmeFile.match(Patterns.SCRIPT)

  const nextReadmeTags = readmeScriptTags.map((tag) => {
    const isMin = tag.includes(".min.js")

    return tag
      .replace(Patterns.SRI, isMin ? sri.bundleMin : sri.bundle)
      .replace(Patterns.VERSION, `@${version}/`)
  })

  let nextReadmeFile = readmeFile
  readmeScriptTags.forEach((oldTag, i) => {
    nextReadmeFile = nextReadmeFile.replace(oldTag, nextReadmeTags[i])
  })

  writeFileContent(dir, Files.README, nextReadmeFile)

  // Begin updating public/index.html

  const DEMO_PATH = `${dir}/public/index.html`
  if (fs.existsSync(DEMO_PATH) !== false) {
    const htmlFile = getFileContent(dir, Files.DEMO_HTML)
    const htmlScriptTags = htmlFile
      .match(Patterns.SCRIPT)
      .filter((tag) => tag.includes("cdn.jsdelivr.net"))

    const nextHtmlTags = htmlScriptTags.map((tag) => {
      const isMin = tag.includes(".min.js")
      const isUpgradedElement = tag.includes("upgraded-element")
      const isGlobalEventRegistry = tag.includes("global-event-registry")

      // Update external dependencies if we encounter them:
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

      return tag
        .replace(Patterns.SRI, isMin ? sri.bundleMin : sri.bundle)
        .replace(Patterns.VERSION, `@${version}/`)
    })

    let nextHtmlFile = htmlFile
    htmlScriptTags.forEach((oldTag, i) => {
      nextHtmlFile = nextHtmlFile.replace(oldTag, nextHtmlTags[i])
    })

    writeFileContent(dir, Files.DEMO_HTML, nextHtmlFile)
  }
})
