#!/usr/bin/env node

import uglifyFiles from './lib/index.js'
import program from 'commander'

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