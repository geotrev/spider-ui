#!/usr/bin/env node

import fs from "fs"
import path from "path"
import glob from "glob"
import * as logger from "./logger.js"
import { getFileContent, writeFileContent, getJSON } from "./helpers.js"

const metadata = getJSON("build/metadata.json")
const upgradedElement = metadata.filter(
  (data) => data.name === "upgraded-element"
)[0]
const spiderElements = metadata.filter(
  (data) => data.name !== "upgraded-element"
)

const TargetFiles = {
  README: "README.md",
  DEMO: "public/index.html",
}

const PATTERNS = {
  SCRIPT: /<script[\s\S]+?<\/script>/g,
  VERSION: /@\d+\.\d+\.\d+(-(alpha|beta|rc)\.\d+)?\//g,
  B64: /sha256-([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}|[A-Za-z0-9+/]{2})=/g,
}

/**
 * Get and update scripts tags in each spider package:
 * - README.md
 * - public/index.html
 */
spiderElements.forEach((pkg) => {})
