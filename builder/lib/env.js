'use strict'

// const fs = require('fs')
const path = require('path')
const paths = require('./paths')

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// 处理 NODE_PATH
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(paths.appDocs, folder))
  .join(path.delimiter)

// 获取 NODE_ENV 和 REACT_APP_* 等环境变量, 用于通过 DefinePlugin 注入至应用中
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment (publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key]
      return env
    }, {
      NODE_ENV: process.env.NODE_ENV || 'development'
    })
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {})
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment
