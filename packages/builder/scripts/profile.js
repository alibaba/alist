'use strict'

// 设置 ENV
// const ENV_TYPE = process.env.NODE_ENV || 'production'
const ENV_TYPE = process.env.NODE_ENV || 'development'
process.env.NODE_ENV = ENV_TYPE
process.env.BABEL_ENV = ENV_TYPE

// 保证 unhandle process 能抛出异常
process.on('unhandledRejection', err => {
  throw err
})

// 加载环境变量
require('./lib/env')

// init
const chalk = require('chalk')
const paths = require('./lib/paths')
const compile = require('./lib/compile')
// const entry = require('./entry');
const { rmdirSync } = require('./utils')
const pkg = require(paths.appPackageJson)
const options = pkg.builder || {};
const entry = options.entry || [];

options.entry = entry.map((entryItem) => {
  return paths.resolveApp(entryItem);
});
options.profile = true;

// rmdirSync(paths.appBuild);
compile(paths.appDir, 'profile', options).catch(err => {
  console.error(chalk.red(err.stack || err))
  process.exit(1)
})
