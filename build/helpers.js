#!/usr/bin/env node

import path from "path"
import fs from "fs"

export const FILE_FORMAT = "utf-8"
export const UPGRADED_ELEMENT_NAME = "upgraded-element"

export const getFileContent = (basePath, filePath) => {
  const targetPath = path.resolve(basePath, filePath)
  return fs.readFileSync(targetPath, FILE_FORMAT)
}

export const getRootFileContent = (filePath) => {
  const targetPath = path.resolve(process.cwd(), filePath)
  return fs.readFileSync(targetPath, FILE_FORMAT)
}

export const writeFileContent = (basePath, filePath, content) => {
  return fs.writeFileSync(
    path.resolve(basePath, filePath),
    content,
    FILE_FORMAT
  )
}
