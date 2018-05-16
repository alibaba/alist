'use strict'

const webpack = require('webpack')
const chalk = require('chalk')
const moment = require('moment')

moment.locale('zh-cn')

function compile (basedir, type, opts) {
  opts = opts || {}

  // 如果是 profile, 就开启 profile 选项
  if (type === 'profile') {
    opts.profile = true
  }

  const getConfig = require('./webpack.config')
  const compiler = webpack(getConfig(opts))

  return new Promise((resolve, reject) => {
    try {
      const callback = (err, stats) => {
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          reject(err)
          return
        }

        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          chunkModules: false,
          colors: true, // Shows colors in the console
          children: false,
          builtAt: true,
          modules: false
        }))
        console.log(chalk.cyan('\nBUILD AT:'), chalk.bold.white(moment().format('YYYY-MM-DD HH:mm:ss')))

        if (type !== 'watch') {
          resolve()
        }
      }

      if (type !== 'watch') {
        compiler.run(callback)
      } else {
        compiler.watch({
          aggregateTimeout: 300
        }, callback)
      }
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = compile
