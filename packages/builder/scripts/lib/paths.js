'use strict'

const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// config after eject: we're in ./config/
module.exports = {
  resolveApp: resolveApp,
  appDir: appDirectory,
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('dist'),
  appDocs: resolveApp('docs'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveApp('src/index.js'),
  umd: resolveApp('umdConfig.js'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  testSetup: resolveApp('test/setupTests.js')
}
