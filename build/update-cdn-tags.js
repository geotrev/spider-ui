#!/usr/bin/env node

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
  DEMO: "public/index.html",
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

  const nextScriptTags = readmeScriptTags.map((tag) => {
    const isMin = tag.includes(".min.js")

    return tag
      .replace(Patterns.SRI, isMin ? sri.bundleMin : sri.bundle)
      .replace(Patterns.VERSION, `@${version}/`)
  })

  let nextReadmeFile = readmeFile
  readmeScriptTags.forEach((tag, i) => {
    nextReadmeFile = nextReadmeFile.replace(tag, nextScriptTags[i])
  })

  writeFileContent(dir, Files.README, nextReadmeFile)

  // Begin updating public/index.html

  // const DEMO_PATH = `${dir}/public/index.html`
  // if (fs.existsSync(DEMO_PATH) !== false) {}
})
