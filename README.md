# compressFiles

A small CLI tool for compressing JavaScript files in a target directory with `uglify-js`.

## Overview

`compressFiles` scans a source directory, compresses JavaScript files, and writes the output into a destination directory.

It is useful for simple local build workflows where a lightweight minification script is enough.

## Installation

```bash
npm install compressfiles
```

Or install it globally:

```bash
npm install -g compressfiles
```

## Usage

```bash
compressfiles <sourceDir> <outputDir> [ignoreDir]
```

### Example

```bash
compressfiles ./src ./dist ./src/vendor
```

- `sourceDir` — directory that contains JavaScript files to compress
- `outputDir` — directory where compressed files will be written
- `ignoreDir` — optional directory to exclude

## Tech Stack

- Node.js
- uglify-js
- commander

## Project Structure

- `index.js` — CLI entry
- `src/` — source implementation
- `lib/` — compiled output
- `test/` — test cases

## Notes

This project focuses on a straightforward directory-based compression workflow rather than a full build pipeline.
