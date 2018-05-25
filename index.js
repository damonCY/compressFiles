#!/usr/bin/env node
const uglifyFiles = require('./lib/index.js')
const program = require('commander')

program.version('v' + require('./package.json').version)
program.usage('<output> <source> <ignoredir>')
  .alias('p')
  .action(function (output, source, ignoredir) {
    uglifyFiles(output, source, ignoredir);
  })
program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}