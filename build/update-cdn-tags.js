#!/usr/bin/env node

import fs from "fs"
import path from "path"
import glob from "glob"

import {
  updateReadMeIntegrity,
  updateDemoIntegrity,
} from "./replace-integrity.js"
import { updateReadMeVersions, updateDemoVersions } from "./replace-versions.js"

const TargetFiles = {
  README: "README.md",
  DEMO: "public/index.html",
}

glob.sync(path.resolve(process.cwd(), "packages/*/")).forEach((basePath) => {
  const pathParts = basePath.split("/")
  const PACKAGE_SUFFIX = pathParts[pathParts.length - 1]
  const PACKAGE_NAME = `@spider-ui/${PACKAGE_SUFFIX}`

  console.log("\n************************************************************")
  console.log(`--> Updating ${PACKAGE_NAME}`)
  console.log("************************************************************")

  console.log(`\n--> ${TargetFiles.README}`)

  updateReadMeIntegrity(basePath, TargetFiles.README)
  updateReadMeVersions(basePath, TargetFiles.README)

  console.log(`\n--> ${TargetFiles.DEMO}`)

  if (fs.existsSync(path.resolve(basePath, TargetFiles.DEMO)) !== false) {
    updateDemoIntegrity(basePath, TargetFiles.DEMO)
    updateDemoVersions(basePath, TargetFiles.DEMO)
  } else {
    console.log(`\n    ${TargetFiles.DEMO} doesn't exist. Skipping...`)
  }

  console.log("\n-> Done ✨")
})
