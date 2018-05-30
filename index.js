#!/usr/bin/env node

const compressfiles = require('./lib/index.js')
const program = require('commander')

program
  .usage('path [options]')
  .action(function () {
    init()
  })
program
  .version('v' + require('./package.json').version)
  .option('-s, --source', 'Specify a folder which need to be minified.')
  .option('-i, --ignore', 'Specify a folder which want to ignore.')
  .parse(process.argv)

if (program.args.length === 0) {
  program.help()
}

function init () {
  const args = program.args
  if (isEmpty(args[0])) {
    console.log('Specify a file/folder to write the minified code')
    return
  }
  if (isEmpty(args[1])) {
    console.log('Specify a folder which need to be minified.')
    return
  }
  compressfiles(args[0], args[1], args[2])
}

function isEmpty (str) {
  if (typeof str !== 'string' || str.trim() === '') {
    return true
  }
  return false
}
