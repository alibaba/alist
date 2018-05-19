'use strict'

// 设置 ENV
const ENV_TYPE = process.env.NODE_ENV || 'production'
// const ENV_TYPE = process.env.NODE_ENV || 'development'
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
const entry = require('./entry');
const { rmdirSync } = require('./utils')
const pkg = require(paths.appPackageJson)
const options = pkg.builder || {}

rmdirSync(paths.appBuild);
