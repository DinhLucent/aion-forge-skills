#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function removeCacheDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__pycache__") {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Removed ${path.relative(root, fullPath).replaceAll(path.sep, "/")}`);
        continue;
      }
      if (entry.name !== ".git" && entry.name !== "node_modules") {
        removeCacheDirs(fullPath);
      }
    }
  }
}

removeCacheDirs(root);
