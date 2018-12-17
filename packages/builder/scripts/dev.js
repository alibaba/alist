'use strict'

// 设置 ENV
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

// 保证 unhandle process 能抛出异常
process.on('unhandledRejection', err => {
  throw err
})

// 加载环境变量
require('./lib/env')

// init
const exec = require('child_process').exec;
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const {
  choosePort,
  createCompiler,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const paths = require('./lib/paths')
const pkg = require(paths.appPackageJson)
const options = pkg.builder || {}
const getConfig = require('./lib/webpack.config')
const createDevServerConfig = require('./lib/webpackDevServer')
const isInteractive = process.stdout.isTTY
const shouldOpenBrowser = process.env.OPEN_BROWSER !== 'false'

// ip/port
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3333
const HOST = process.env.HOST || '0.0.0.0'

choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      throw new Error('We have not found a port')
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const urls = prepareUrls(protocol, HOST, port)
    const appName = require(paths.appPackageJson).name
    options.dev = true;
    const config = getConfig(options)
    const compiler = createCompiler(webpack, config, appName, urls)
    const serverConfig = createDevServerConfig(urls.lanUrlForConfig, config.output.publicPath)
    const devServer = new WebpackDevServer(compiler, serverConfig)

    devServer.listen(port, HOST, err => {
      
      if (err) {
        return console.error(chalk.red(err))
      }
      if (isInteractive) {
        // clearConsole()
      }
      console.log(chalk.cyan('Starting the development server...\n'))
      console.log(chalk.cyan('URL:'), chalk.white(urls.localUrlForBrowser))

      if (shouldOpenBrowser) {
        openBrowser(urls.localUrlForBrowser)
      }
    })

    ;['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, function () {
        console.log(chalk.yellow('Dev server closed'))
        devServer.close()
        process.exit()
      })
    })
  }).catch(err => {
    if (err && err.message) {
      console.error(chalk.red(err.message))
    }
    process.exit(1)
  })
