#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const scriptsDir = path.join(__dirname, '../scripts')
const command = process.argv[2] // Enums: [dev, test, build, profile]
const commands = fs.readdirSync(scriptsDir)
  .filter(name => name.endsWith('.js'))
  .map(name => path.basename(name, '.js'))

if (commands.indexOf(command) < 0) {
  console.log('Usage: nobuilder <%s>', commands.join('|'))
  process.exit()
}

// run script
require(path.join(scriptsDir, command + '.js'))