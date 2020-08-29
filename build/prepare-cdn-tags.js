#!/usr/bin/env node

import fs from "fs"
import * as logger from "./logger.js"
import { getFileContent, writeFileContent, getJSON } from "./helpers.js"

logger.begin("Updating CDN Tags")

const metadata = getJSON("build/metadata.json")

// External dependencies

const peers = {}
metadata.forEach((data) => data.external && (peers[data.name] = data))

// const upgradedElement = metadata.filter(
//   (data) => data.name === "upgraded-element"
// )[0]

// const globalEventRegistry = metadata.filter((data) =>
//   data.name.includes("global-event-registry")
// )[0]

// Spider elements
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

  logger.step(`\nUpdating package files for: ${name}`)

  Object.keys(Files).forEach((fileKey) => {
    const fileTarget = Files[fileKey]
    const filePath = `${dir}/${fileTarget}`

    if (fs.existsSync(filePath) !== false) {
      logger.step(`--> Updating ${filePath}`)

      const fileContent = getFileContent(dir, fileTarget)
      const fileScriptTags = fileContent
        .match(Patterns.SCRIPT)
        .filter((tag) => tag.includes("cdn.jsdelivr.net"))

      const nextScriptTags = fileScriptTags.map((tag) => {
        const isMin = tag.includes(".min.js")
        const oldHash = tag.match(Patterns.SRI)[0]
        const nextHash = isMin ? sri.bundleMin : sri.bundle
        const oldVersion = tag.match(Patterns.VERSION)[0]
        const externals = Object.keys(peers).filter((peerName) =>
          tag.includes(peerName)
        )
        const externalName = externals.length ? externals[0] : null

        // If known externals were encountered, update them

        if (externalName) {
          const peer = peers[externalName]
          return tag
            .replace(Patterns.SRI, isMin ? peer.sri.bundleMin : peer.sri.bundle)
            .replace(Patterns.VERSION, `@${peer.version}/`)
        }

        // Otherwise, update the element CDN

        let updaters = []

        if (![sri.bundleMin, sri.bundle].includes(oldHash)) {
          updaters.push((tagString) => tagString.replace(oldHash, nextHash))
        }

        if (version !== oldVersion) {
          updaters.push((tagString) =>
            tagString.replace(oldVersion, `@${version}/`)
          )
        }

        if (updaters.length) {
          return updaters.reduce(
            (updatedTag, updater) => (updatedTag = updater(updatedTag)),
            tag
          )
        }
      })

      let nextFileContent = fileContent
      fileScriptTags.forEach((oldTag, i) => {
        nextFileContent = nextFileContent.replace(oldTag, nextScriptTags[i])
      })
      writeFileContent(dir, fileTarget, nextFileContent)
    } else {
      logger.step(`--> File not found: ${filePath}. Skipping.`)
    }
  }) // end Object.keys
}) // end spiderElements.forEach

logger.finish()
