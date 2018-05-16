'use strict'

// 设置 ENV
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

// 保证 unhandle process 能抛出异常
process.on('unhandledRejection', err => {
  throw err
})

// 加载环境变量
require('./lib/env')

const fs = require('fs')
const path = require('path')
const jest = require('jest')
const paths = require('./lib/paths')
const argv = process.argv.slice(3) // skip 'test'

// 开启 watch 模式
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  if (fs.existsSync(path.join(paths.appDir, '.git'))) {
    argv.push('--watch')
  } else {
    argv.push('--watchAll')
  }
}

// @remove-on-eject-begin
// 创建 jest 配置
const createJestConfig = require('./lib/createJestConfig')
argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(
      relativePath => path.resolve(__dirname, relativePath),
      paths.appDir
    )
  )
)
// @remove-on-eject-end

// env=jsdom, 保证可以使用 DOM 方法
argv.push('--env=jsdom')

jest.run(argv)
